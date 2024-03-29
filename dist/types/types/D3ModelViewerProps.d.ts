import { ThreeRenderer } from '../engine';
import { ModelAttr } from './ModelAttr';
export declare type D3ModelSrc = File | string;
export declare const D3ModelTypes: readonly ["stl", "obj", "stp", "step", "3dm", "3ds", "3mf", "cob", "blender", "dxf", "ply", "x3d", "gitf", "gltf", "glb", "igs", "iges", "fbx", "3dxml", "catpart", "x_t", "x_b"];
export declare type D3ModelType = typeof D3ModelTypes[number];
export declare type D3ModelCompressType = 'none' | 'zlib' | 'zip' | 'zip-dir';
export declare type D3ModelViewerTheme = 'fresh' | 'default';
export declare type D3ModelViewerLayoutType = 'pc' | 'tablet' | 'mobile';
export interface D3ModelViewerCustomOptions {
    customModelAttr?: ModelAttr;
    externalAttr?: Record<string, string>;
    unit?: string;
}
export declare const D3ModelViewerWidgets: readonly ["languageSelector", "attrPanel", "captureImage", "joystick", "colorPicker"];
export declare type D3ModelViewerWidgetType = typeof D3ModelViewerWidgets[number];
export interface D3ModelViewerLayoutOptions {
    layoutType?: D3ModelViewerLayoutType;
    width?: number | string;
    height?: number | string;
    widgets?: D3ModelViewerWidgetType[];
}
export interface D3ModelViewerRenderOptions {
    theme?: D3ModelViewerTheme;
    modelColor?: string;
    backgroundColor?: string;
    shadowIntensity?: number;
    /** 是否展示 Mesh */
    withMesh?: boolean;
    /** 是否展示线框图 */
    withWireframe?: boolean;
    /** 是否展示底平面 */
    withPlane?: boolean;
    /** 是否展示标尺线 */
    withBoundingBox?: boolean;
    /** 是否展示球体 */
    withSphere?: boolean;
    /** 是否包含渲染图 */
    withMaterialedMesh?: boolean;
    /** 是否剖切 */
    withClipping?: boolean;
    /** 是否显示三维 x-y-z 指示线 */
    withAxisHelper?: boolean;
    /** 包含摄像头控制器 */
    withCameraControls?: boolean;
    autoplay?: boolean;
    autoRotate?: boolean;
    /** 是否自动截图 */
    autoCapture?: boolean;
    cameraX?: number;
    cameraY?: number;
    cameraZ?: number;
}
export interface D3ModelViewerSourceProps {
    /** 传入的源文件类型 */
    src?: D3ModelSrc;
    fileName?: string;
    type?: D3ModelType;
    compressType?: D3ModelCompressType;
    mesh?: THREE.Mesh;
    group?: THREE.Group;
}
export interface D3ModelViewerProps extends D3ModelViewerSourceProps {
    className?: string;
    style?: Record<string, string | number>;
    customOptions?: D3ModelViewerCustomOptions;
    layoutOptions?: D3ModelViewerLayoutOptions;
    renderOptions?: D3ModelViewerRenderOptions;
    onTopology?: (modelAttr: ModelAttr) => void;
    onSnapshot?: (blobOrDataUrl: Blob | string) => void;
    onCompress?: (compressedArrayBuffer: ArrayBuffer) => void;
    onLoad?: (renderer: ThreeRenderer) => void;
    onError?: (err: Error) => void;
}
export declare const defaultModelViewerProps: Partial<D3ModelViewerProps>;
/** 合并 Props */
export declare const mergeD3ModelViewerProps: ({ currentProps, originProps, }: {
    currentProps: Partial<D3ModelViewerProps>;
    originProps?: Partial<D3ModelViewerProps>;
}) => D3ModelViewerProps;
