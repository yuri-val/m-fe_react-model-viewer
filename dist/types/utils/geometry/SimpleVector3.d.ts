/** 3d Vectors */
export declare class SimpleVector3 {
    x: number;
    y: number;
    z: number;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x: number, y: number, z: number);
    /**
     * Create a copy of the Vector
     * @returns {SimpleVector3}
     */
    clone(): SimpleVector3;
    /**
     * Add Vectors this and v
     * @param {SimpleVector3} v
     * @returns {SimpleVector3}
     */
    add(v: SimpleVector3): this;
    /**
     * Subtract Vectors this and v
     * @param {SimpleVector3} v
     * @returns {SimpleVector3}
     */
    sub(v: SimpleVector3): this;
    /**
     * Calculate the dot product of this and v.
     * from https://www.cs.uaf.edu/2013/spring/cs493/lecture/01_24_vectors.html
     * @param {SimpleVector3} v
     * @returns {SimpleVector3}
     */
    dot(v: SimpleVector3): number;
    /**
     * Calculate the cross product of this and v.
     * from https://www.cs.uaf.edu/2013/spring/cs493/lecture/01_24_vectors.html
     * @param {SimpleVector3} v
     * @returns {SimpleVector3}
     */
    cross(v: SimpleVector3): this;
    /**
     * Calculate Vector length
     * @returns {number}
     */
    length(): number;
}
