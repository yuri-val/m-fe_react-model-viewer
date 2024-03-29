"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adjustGeometry = void 0;
const tslib_1 = require("tslib");
const THREE = (0, tslib_1.__importStar)(require("three"));
function adjustGeometry(geometry, material) {
    geometry.computeBoundingSphere();
    geometry.center();
    geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    const mesh = new THREE.Mesh(geometry, material);
    geometry.computeBoundingBox();
    const xDims = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    const yDims = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    const zDims = geometry.boundingBox.max.z - geometry.boundingBox.min.z;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.material = material;
    // reset center point
    const box = new THREE.Box3().setFromObject(mesh);
    box.getCenter(mesh.position);
    mesh.position.multiplyScalar(-1);
    return { mesh, xDims, yDims, zDims };
}
exports.adjustGeometry = adjustGeometry;
//# sourceMappingURL=index.js.map