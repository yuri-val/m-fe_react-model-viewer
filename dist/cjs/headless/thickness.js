"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcWallThicknessByViolence = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const utils_1 = require("@m-fe/utils");
const THREE = (0, tslib_1.__importStar)(require("three"));
/** 暴力搜索计算壁厚 */
function calcWallThicknessByViolence(mesh) {
    let minDist = Number.MAX_VALUE;
    const raycaster = new THREE.Raycaster();
    let intersects = [];
    const pos = mesh.geometry
        .attributes.position;
    const ori = new THREE.Vector3();
    const dir = new THREE.Vector3();
    const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), tri = new THREE.Triangle();
    const faces = pos.count / 3;
    const faceIndexList = Array.from({ length: faces }).map((_, i) => i);
    for (const i of faceIndexList) {
        a.fromBufferAttribute(pos, i * 3 + 0);
        b.fromBufferAttribute(pos, i * 3 + 1);
        c.fromBufferAttribute(pos, i * 3 + 2);
        tri.set(a, b, c);
        tri.getMidpoint(ori);
        tri.getNormal(dir);
        raycaster.set(ori, dir.negate());
        intersects = raycaster.intersectObject(mesh);
        const thisWallThickness = (0, utils_1.get)(intersects, intersects => intersects[intersects.length > 1 ? 1 : 0].distance, Number.MAX_VALUE);
        if (thisWallThickness === 0) {
            continue;
        }
        minDist = Math.min(minDist, thisWallThickness);
    }
    return minDist;
}
exports.calcWallThicknessByViolence = calcWallThicknessByViolence;
//# sourceMappingURL=thickness.js.map