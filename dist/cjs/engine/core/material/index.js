"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookMeshMaterial = void 0;
const tslib_1 = require("tslib");
const THREE = (0, tslib_1.__importStar)(require("three"));
/** 获得材料 */
function cookMeshMaterial(withClipping, color) {
    const localPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.5);
    return new THREE.MeshPhongMaterial({
        color,
        specular: 0x111111,
        shininess: 20,
        // side: THREE.DoubleSide,
        // ***** Clipping setup (material): *****
        clippingPlanes: withClipping ? [localPlane] : [],
        clipShadows: true,
    });
}
exports.cookMeshMaterial = cookMeshMaterial;
//# sourceMappingURL=index.js.map