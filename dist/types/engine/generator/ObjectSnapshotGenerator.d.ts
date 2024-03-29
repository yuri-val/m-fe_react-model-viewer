import { Box3, Object3D, PerspectiveCamera, WebGLRenderer } from 'three';
export declare class ObjectSnapshotGenerator {
    protected obj: Object3D;
    protected camera: PerspectiveCamera;
    protected renderer: WebGLRenderer;
    protected onDataUrl: (dataUrl: string) => void;
    box: Box3;
    size: {
        w: number;
        h: number;
    };
    pos: {
        x: number;
        y: number;
    };
    constructor(obj: Object3D, camera: PerspectiveCamera, renderer: WebGLRenderer, onDataUrl: (dataUrl: string) => void);
    distance: () => number;
    getSizeInPixel: (distance: number) => {
        w: number;
        h: number;
    };
    getPositionInPixel: () => {
        x: number;
        y: number;
    };
    getImage: () => void;
}
