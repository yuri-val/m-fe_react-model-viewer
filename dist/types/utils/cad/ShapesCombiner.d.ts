import * as THREE from 'three';
export interface OccFace {
    face_index: number;
    normal_coord: number[];
    number_of_triangles: number;
    tri_indexes: number[];
    uv_coord: number[];
    vertex_coord: number[];
}
export interface OccEdge {
}
/** 形状组合器 */
export declare class ShapesCombiner {
    private faceList;
    private edgeList;
    mainObject: THREE.Group;
    constructor(faceList: OccFace[], edgeList: OccEdge[]);
    combineFaceAsMesh(): THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;
}
