import * as THREE from 'three';
export declare function adjustGeometry(geometry: THREE.BufferGeometry, material: THREE.Material): {
    mesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material>;
    xDims: number;
    yDims: number;
    zDims: number;
};
