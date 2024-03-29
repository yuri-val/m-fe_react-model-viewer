import * as THREE from 'three';
import { ModelAttr } from '../../../types';
export declare function calcD3Size(box: THREE.Box3): {
    sizeX: number;
    sizeY: number;
    sizeZ: number;
};
/** 计算某个 Mesh 的拓扑信息 */
export declare function calcTopology(mesh: THREE.Mesh): Promise<ModelAttr>;
/** 旋转 */
export declare function rotateAroundWorldAxis(mesh: THREE.Mesh, axis: THREE.Vector3, radians: number): void;
