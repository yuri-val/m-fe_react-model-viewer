import * as THREE from 'three';
import { D3ModelSrc, D3ModelType, D3ModelViewerProps } from '../../../types/D3ModelViewerProps';
/** 是否支持浏览器端解析 */
export declare const isSupportThreejsLoader: (type: D3ModelType) => boolean;
export declare const isSupportOcctLoader: (type: D3ModelType) => boolean;
/** 支持重试的加载 */
export declare function loadMeshWithRetry(src: D3ModelSrc, type: D3ModelType, { originSrc, toGltf, props, }?: {
    originSrc?: string;
    toGltf?: boolean;
    props?: D3ModelViewerProps;
}): Promise<{
    gltf?: string;
    mesh?: THREE.Mesh;
    group?: THREE.Group;
    srcUrl: string;
}>;
/** 将其他类型的文件，转化为 GLTF 类型 */
export declare function loadMesh(src: D3ModelSrc, type: D3ModelType, { toGltf, props, }?: {
    toGltf?: boolean;
    props?: D3ModelViewerProps;
}): Promise<{
    srcUrl: string;
    mesh?: THREE.Mesh;
    gltf?: string;
    group?: THREE.Group;
}>;
