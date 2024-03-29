"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseD3Model = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const utils_1 = require("@m-fe/utils");
const engine_1 = require("../engine");
const types_1 = require("../types");
const utils_2 = require("../utils");
const thickness_1 = require("./thickness");
/** 解析模型并且进行一系列计算 */
async function parseD3Model(_props, { withSnapshot = false, withWallThickness = false, withCompress = false, }) {
    let wallThickness = 0;
    let topology;
    let snapshot;
    let compressedArrayBuffer;
    return new Promise(async (resolve, reject) => {
        try {
            const dryRenderer = new engine_1.ThreeDryRenderer();
            const { mesh, camera, renderer, modelFile, onDestroy } = await dryRenderer.render((0, types_1.mergeD3ModelViewerProps)({
                currentProps: _props,
                originProps: (0, types_1.mergeD3ModelViewerProps)({
                    currentProps: {
                        renderOptions: {
                            withPlane: false,
                            modelColor: 'rgb(34, 98, 246)',
                        },
                    },
                }),
            }));
            /** 回调归结函数 */
            const onFinish = () => {
                if (!topology) {
                    return;
                }
                if (withSnapshot && !snapshot) {
                    return;
                }
                if (withCompress && !compressedArrayBuffer) {
                    return;
                }
                resolve({ wallThickness, topology, snapshot, compressedArrayBuffer });
                onDestroy();
            };
            // 异步进行压缩操作
            (0, utils_2.deflate)(modelFile).then(ab => {
                compressedArrayBuffer = ab;
                onFinish();
            });
            // 等待 1 秒
            await (0, utils_1.sleep)(1 * 1000);
            topology = await (0, engine_1.calcTopology)(mesh);
            if (withWallThickness) {
                try {
                    wallThickness = (0, thickness_1.calcWallThicknessByViolence)(mesh);
                }
                catch (_) {
                    console.error('>>>parseD3Model>>>getWallThickness>>>', _);
                }
            }
            if (withSnapshot) {
                // 执行截图
                await new engine_1.ObjectSnapshotGenerator(mesh, camera, renderer, (dataUrl) => {
                    // 执行清除操作
                    snapshot = dataUrl;
                    onFinish();
                });
            }
            onFinish();
        }
        catch (_) {
            console.error('>>>facade>>>parseD3Model>>>error:', _);
            reject(_);
        }
    });
}
exports.parseD3Model = parseD3Model;
//# sourceMappingURL=parse.js.map