"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupLights = void 0;
const tslib_1 = require("tslib");
const THREE = (0, tslib_1.__importStar)(require("three"));
/** 设置灯光 */
function setupLights(mesh, scene) {
    const maxGeo = mesh.geometry.boundingBox.max;
    const minGeo = mesh.geometry.boundingBox.min;
    const target = new THREE.Object3D();
    target.position.set(0, 0, 0);
    const LightPosList = [
        {
            x: maxGeo.x * 2,
            y: maxGeo.y * 2,
            z: maxGeo.z * 2,
        },
        {
            x: minGeo.x * 2,
            y: minGeo.y * 2,
            z: minGeo.z * 2,
        },
    ];
    LightPosList.forEach(pos => {
        const light = new THREE.SpotLight(0xffffff);
        light.castShadow = true;
        light.angle = 180;
        light.position.set(pos.x, pos.y, pos.z);
        light.target = target;
        scene.add(light);
    });
}
exports.setupLights = setupLights;
//# sourceMappingURL=index.js.map