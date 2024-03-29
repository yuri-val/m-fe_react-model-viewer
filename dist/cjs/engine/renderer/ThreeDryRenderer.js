"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreeDryRenderer = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const isNumber_1 = (0, tslib_1.__importDefault)(require("lodash/isNumber"));
const max_1 = (0, tslib_1.__importDefault)(require("lodash/max"));
const THREE = (0, tslib_1.__importStar)(require("three"));
const types_1 = require("../../types");
const utils_1 = require("../../utils");
const core_1 = require("../core");
const fudge = 1.0;
class ThreeDryRenderer {
    getThreeJsWebGLRenderer(_props, { height, width }) {
        const props = (0, types_1.mergeD3ModelViewerProps)({ currentProps: _props });
        const renderer = new THREE.WebGLRenderer({
            // 增加下面两个属性，可以抗锯齿
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true,
        });
        const devicePixelRatio = window.devicePixelRatio || 1;
        renderer.setClearColor(new THREE.Color(props.renderOptions.backgroundColor), 1);
        renderer.setPixelRatio(devicePixelRatio);
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.cullFace = THREE.CullFaceBack;
        renderer.clippingPlanes = Object.freeze([]); // GUI sets it to globalPlanes
        renderer.localClippingEnabled = true;
        return renderer;
    }
    async render(_props) {
        try {
            const props = (0, types_1.mergeD3ModelViewerProps)({ currentProps: _props });
            const type = props.type || (0, utils_1.getModelType)(props.fileName, props.src);
            const compressType = props.compressType || (0, utils_1.getModelCompressType)(props.fileName, props.src);
            const modelFile = await (0, utils_1.getFileObjFromModelSrc)(Object.assign(Object.assign({}, props), { compressType }));
            // 进行模型实际加载，注意，不需要转化为
            const { mesh: { geometry }, } = await (0, utils_1.loadMesh)(modelFile || props.src, type, {
                toGltf: false,
            });
            // 执行回收操作
            const scene = new THREE.Scene();
            const group = new THREE.Group();
            scene.add(group);
            const height = (0, isNumber_1.default)(props.layoutOptions.height)
                ? props.layoutOptions.height
                : 600;
            const width = (0, isNumber_1.default)(props.layoutOptions.width)
                ? props.layoutOptions.width
                : 600;
            const renderer = this.getThreeJsWebGLRenderer((0, types_1.mergeD3ModelViewerProps)({
                currentProps: {
                    renderOptions: { backgroundColor: 'rgb(255,255,255)' },
                },
                originProps: props,
            }), { height, width });
            renderer.domElement.style.opacity = '0';
            document.body.appendChild(renderer.domElement);
            const material = (0, core_1.cookMeshMaterial)(false, props.renderOptions.modelColor);
            const { mesh, xDims, yDims, zDims } = (0, core_1.adjustGeometry)(geometry, material);
            group.add(mesh);
            scene.updateMatrixWorld();
            (0, core_1.setupLights)(mesh, scene);
            const camera = new THREE.PerspectiveCamera(45, width / height, 1, 99999);
            camera.add(new THREE.PointLight(0xcccccc, 2));
            geometry.computeBoundingSphere();
            const g = mesh.geometry.boundingSphere.radius;
            const dist = g * 3;
            // fudge factor so you can see the boundaries
            camera.position.set(props.renderOptions.cameraX, props.renderOptions.cameraY, props.renderOptions.cameraZ || dist * fudge);
            let maxDimension = (0, max_1.default)([xDims, yDims, zDims]);
            maxDimension = Math.ceil(~~(maxDimension * 1.1) / 10) * 50;
            if (props.renderOptions.withPlane) {
                const plane = new THREE.GridHelper(maxDimension, 50);
                // reset center point
                const box = new THREE.Box3().setFromObject(plane);
                box.getCenter(plane.position);
                plane.position.multiplyScalar(-1);
                // plane.position.y = geometry.boundingSphere.center.y * -1;
                plane.position.y = yDims * -1;
                group.add(plane);
            }
            let animationId;
            const animate = (_time) => {
                animationId = requestAnimationFrame(time => {
                    animate(time);
                });
                renderer.render(scene, camera);
            };
            requestAnimationFrame(t => {
                animate(t);
            });
            return {
                modelFile,
                mesh,
                camera,
                renderer,
                onDestroy: () => {
                    try {
                        cancelAnimationFrame(animationId);
                        renderer.dispose();
                        renderer.forceContextLoss();
                        const parent = renderer.domElement.parentElement ||
                            renderer.domElement.parentNode;
                        if (parent) {
                            parent.removeChild(renderer.domElement);
                        }
                        else {
                            renderer.domElement.remove();
                        }
                    }
                    catch (_) {
                        console.error('>>>webgl-viewer>>>headless>>>render>>>onDestroy>>>error:', _);
                    }
                },
            };
        }
        catch (error) {
            console.error('>>>webgl-viewer>>>headless>>>render>>>error: ', error);
            if (_props.onError) {
                _props.onError(error);
            }
        }
    }
}
exports.ThreeDryRenderer = ThreeDryRenderer;
//# sourceMappingURL=ThreeDryRenderer.js.map