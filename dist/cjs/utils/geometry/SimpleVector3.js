"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleVector3 = void 0;
/** 3d Vectors */
class SimpleVector3 {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x, y, z) {
        this.x = Number(x);
        this.y = Number(y);
        this.z = Number(z);
    }
    /**
     * Create a copy of the Vector
     * @returns {SimpleVector3}
     */
    clone() {
        return new SimpleVector3(this.x, this.y, this.z);
    }
    /**
     * Add Vectors this and v
     * @param {SimpleVector3} v
     * @returns {SimpleVector3}
     */
    add(v) {
        this.x = this.x + v.x;
        this.y = this.y + v.y;
        this.z = this.z + v.z;
        return this;
    }
    /**
     * Subtract Vectors this and v
     * @param {SimpleVector3} v
     * @returns {SimpleVector3}
     */
    sub(v) {
        this.x = this.x - v.x;
        this.y = this.y - v.y;
        this.z = this.z - v.z;
        return this;
    }
    /**
     * Calculate the dot product of this and v.
     * from https://www.cs.uaf.edu/2013/spring/cs493/lecture/01_24_vectors.html
     * @param {SimpleVector3} v
     * @returns {SimpleVector3}
     */
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    /**
     * Calculate the cross product of this and v.
     * from https://www.cs.uaf.edu/2013/spring/cs493/lecture/01_24_vectors.html
     * @param {SimpleVector3} v
     * @returns {SimpleVector3}
     */
    cross(v) {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;
        return this;
    }
    //
    /**
     * Calculate Vector length
     * @returns {number}
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
}
exports.SimpleVector3 = SimpleVector3;
//# sourceMappingURL=SimpleVector3.js.map