"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcctLoader = void 0;
const tslib_1 = require("tslib");
const U = (0, tslib_1.__importStar)(require("@m-fe/utils"));
const stores_1 = require("../../../stores");
const cad_1 = require("../../cad");
class OcctLoader {
    constructor() {
        this.initWorker();
    }
    static getInstance() {
        if (window.occtLoader) {
            return window.occtLoader;
        }
        window.occtLoader = new OcctLoader();
        return window.occtLoader;
    }
    async initWorker() {
        if (window.Worker) {
            stores_1.useViewerStateStore.setState({
                loaderEvent: 'Loading cad worker',
            });
            window.cadWorker = new Worker((window.cadWorkerBasePath || '/cad-worker') + '/cad-worker.js');
            if (!window.messageHandlers) {
                window.messageHandlers = {};
            }
            window.messageHandlers['combineAndRenderShapes'] = ([faceList, edgeList,]) => {
                const shapeCombiner = new cad_1.ShapesCombiner(faceList, edgeList);
                this.mesh = shapeCombiner.combineFaceAsMesh();
            };
            window.messageHandlers['log'] = (payload) => {
                console.log(payload);
            };
            window.messageHandlers['error'] = (payload) => {
                console.error(payload);
            };
            window.messageHandlers['startupCallback'] = () => {
                console.log('>>>OcctLoader>>>componentDidMount>>>initWorker>>>successfully');
                stores_1.useViewerStateStore.setState({ loaderEvent: 'Cad worker has loaded' });
                this.isWorkerReady = true;
            };
            window.cadWorker.onmessage = function (e) {
                if (e.data.type in window.messageHandlers) {
                    const response = window.messageHandlers[e.data.type](e.data.payload);
                    if (response) {
                        window.cadWorker.postMessage({
                            type: e.data.type,
                            payload: response,
                        });
                    }
                }
            };
        }
    }
    async load(file, props) {
        console.log('>>>OcctLoader>>>load>>>props: ', props);
        await this.waitForWorkerReady();
        console.log('>>>OcctLoader>>>load>>>worker ready');
        return new Promise(async (resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = ((_, ev) => {
                console.error('>>>OcctLoader>>>load>>>reader>>>error:', ev);
                if (props.onError) {
                    props.onError(new Error('Invalid cad file text'));
                }
            });
            reader.onload = async () => {
                const cadFileText = reader.result;
                console.log('>>>OcctLoader>>>load:', file, '>>>cadFileText:', cadFileText);
                stores_1.useViewerStateStore.setState({
                    loaderEvent: 'Start parse the cad file',
                });
                window.cadWorker.postMessage({
                    type: 'loadCadFiles',
                    payload: [{ text: cadFileText, fileName: props.fileName }],
                });
                this.mesh = undefined;
                // 等待解析完毕
                for (let i = 0; i < 100; i++) {
                    await U.sleep(2.5 * 1000);
                    if (this.mesh) {
                        resolve(this.mesh);
                        return;
                    }
                }
                reject(new Error('Parse cad file timeout'));
            };
            await reader.readAsText(file);
        });
    }
    async waitForWorkerReady() {
        for (let i = 0; i < 100; i++) {
            if (this.isWorkerReady) {
                return;
            }
            await U.sleep(2.5 * 1000);
        }
        console.error('>>>OcctLoader>>>waitForWorkerReady>>>error:', 'worker timeout');
        throw new Error("Can't load OCCT CAD file");
    }
}
exports.OcctLoader = OcctLoader;
//# sourceMappingURL=OcctLoader.js.map