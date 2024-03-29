import * as THREE from 'three';
export declare class RenderableModel {
    scene: THREE.Scene;
    /** 如果是 OBJ 或者 3MF 等，则表示 Group */
    group: THREE.Group;
    /** 如果是单个模型，仅包含单个 Mesh */
    mesh: THREE.Mesh;
    constructor(scene: THREE.Scene);
}
