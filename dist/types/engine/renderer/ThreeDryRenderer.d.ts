import * as THREE from 'three';
import { D3ModelViewerProps } from '../../types';
export declare class ThreeDryRenderer {
    getThreeJsWebGLRenderer(_props: Partial<D3ModelViewerProps>, { height, width }: {
        height: number;
        width: number;
    }): THREE.WebGLRenderer;
    render(_props: Partial<D3ModelViewerProps>): Promise<{
        modelFile: File;
        mesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material>;
        camera: THREE.PerspectiveCamera;
        renderer: THREE.WebGLRenderer;
        onDestroy: () => void;
    }>;
}
