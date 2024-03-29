"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMesh = exports.loadMeshWithRetry = exports.isSupportOcctLoader = exports.isSupportThreejsLoader = void 0;
const tslib_1 = require("tslib");
const THREE = (0, tslib_1.__importStar)(require("three"));
const GLTFExporter_1 = require("three/examples/jsm/exporters/GLTFExporter");
const _3MFLoader_js_1 = require("three/examples/jsm/loaders/3MFLoader.js");
const DRACOLoader_1 = require("three/examples/jsm/loaders/DRACOLoader");
const GLTFLoader_1 = require("three/examples/jsm/loaders/GLTFLoader");
const OBJLoader_1 = require("three/examples/jsm/loaders/OBJLoader");
const PLYLoader_1 = require("three/examples/jsm/loaders/PLYLoader");
const STLLoader_1 = require("three/examples/jsm/loaders/STLLoader");
const stores_1 = require("../../../stores");
const OcctLoader_1 = require("./OcctLoader");
/** 是否支持浏览器端解析 */
const isSupportThreejsLoader = (type) => type === 'glb' ||
    type === 'gltf' ||
    type === 'gitf' ||
    type === 'ply' ||
    type === 'stl' ||
    type === 'obj';
exports.isSupportThreejsLoader = isSupportThreejsLoader;
const isSupportOcctLoader = (type) => type === 'stp' ||
    type === 'step' ||
    type === 'iges' ||
    type === 'igs' ||
    type === 'x_t';
exports.isSupportOcctLoader = isSupportOcctLoader;
function createURL(json) {
    const str = JSON.stringify(json);
    const blob = new Blob([str], { type: 'text/plain' });
    return URL.createObjectURL(blob);
}
/** 支持重试的加载 */
async function loadMeshWithRetry(src, type, { originSrc, toGltf = true, props, } = {}) {
    try {
        const resp = await loadMesh(src, type, { toGltf, props });
        return resp;
    }
    catch (_) {
        console.error('>>>mesh_loader>>>loadMeshWithRetry>>>error:', _);
        if (originSrc && typeof originSrc === 'string') {
            // 尝试重新加载
            return loadMesh(originSrc, type, { toGltf, props });
        }
        else {
            throw _;
        }
    }
}
exports.loadMeshWithRetry = loadMeshWithRetry;
/** 将其他类型的文件，转化为 GLTF 类型 */
async function loadMesh(src, type, { toGltf = true, props, } = {}) {
    const material = new THREE.MeshStandardMaterial();
    return await new Promise(async (resolve, reject) => {
        const srcUrl = src instanceof File ? URL.createObjectURL(src) : src;
        try {
            if ((0, exports.isSupportOcctLoader)(type) && src instanceof File) {
                const occtLoader = OcctLoader_1.OcctLoader.getInstance();
                const mesh = await occtLoader.load(src, props);
                resolve({ mesh, srcUrl });
            }
            else if (type === 'glb' || type === 'gltf' || type === 'gitf') {
                const loader = new GLTFLoader_1.GLTFLoader();
                const dracoLoader = new DRACOLoader_1.DRACOLoader();
                dracoLoader.setDecoderPath('draco/');
                loader.setDRACOLoader(dracoLoader);
                loader.load(srcUrl, data => {
                    resolve({
                        gltf: srcUrl,
                        srcUrl,
                        mesh: data.scene.children[0],
                    });
                });
            }
            else if (type === 'obj') {
                const loader = new OBJLoader_1.OBJLoader();
                loader.load(srcUrl, group => {
                    if (toGltf) {
                        const exporter = new GLTFExporter_1.GLTFExporter();
                        exporter.parse(group, gltf => {
                            // 将 obj 转化为 mesh
                            group.traverse(child => {
                                if (child instanceof THREE.Mesh) {
                                    child.material.transparent = true;
                                    const mesh = new THREE.Mesh(child.geometry, child.material);
                                    resolve({ gltf: createURL(gltf), mesh, srcUrl });
                                }
                            });
                        }, {});
                    }
                    else {
                        // 不包含 gltf 则直接返回
                        group.traverse(child => {
                            if (child instanceof THREE.Mesh) {
                                child.material.transparent = true;
                                const mesh = new THREE.Mesh(child.geometry, child.material);
                                resolve({ mesh, srcUrl });
                            }
                        });
                    }
                }, () => { }, err => {
                    reject(err);
                });
            }
            else if (type === 'ply') {
                const loader = new PLYLoader_1.PLYLoader();
                loader.load(srcUrl, geometry => {
                    const mesh = new THREE.Mesh(geometry, material);
                    const exporter = new GLTFExporter_1.GLTFExporter();
                    exporter.parse(mesh, gltf => {
                        resolve({ gltf: createURL(gltf), mesh, srcUrl });
                    }, {});
                }, () => { }, err => {
                    reject(err);
                });
            }
            else if (type === 'stl') {
                const loader = new STLLoader_1.STLLoader();
                loader.load(srcUrl, geometry => {
                    const mesh = new THREE.Mesh(geometry, material);
                    if (toGltf) {
                        const exporter = new GLTFExporter_1.GLTFExporter();
                        exporter.parse(mesh, gltf => {
                            resolve({ gltf: createURL(gltf), mesh, srcUrl });
                        }, {});
                    }
                    else {
                        resolve({ mesh, srcUrl });
                    }
                }, () => { }, err => {
                    reject(err);
                });
            }
            else if (type === '3mf') {
                const loader = new _3MFLoader_js_1.ThreeMFLoader();
                loader.load(srcUrl, group => {
                    group.traverse(child => {
                        if (child instanceof THREE.Mesh) {
                            child.material.transparent = true;
                            const mesh = new THREE.Mesh(child.geometry, child.material);
                            resolve({ mesh, srcUrl });
                        }
                    });
                }, () => { }, err => {
                    reject(err);
                });
            }
            else {
                stores_1.useViewerStateStore.setState({
                    loaderEvent: 'The format of the model does not support parsing!',
                });
                reject('The format of the model does not support parsing!');
            }
        }
        catch (_) {
            console.error('>>>loadMesh>>>error:', _);
            reject(_);
        }
    });
}
exports.loadMesh = loadMesh;
//# sourceMappingURL=mesh-loader.js.map