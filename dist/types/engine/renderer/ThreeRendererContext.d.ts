import * as THREE from 'three';
import { D3ModelViewerProps, D3ModelViewerTheme, ModelAttr } from '../../types';
import { OrbitControls } from '../scenery/controls/OrbitControls';
import { OrbitControlsGizmo } from '../scenery/controls/OrbitControlsGizmo';
export declare class ThreeRendererContext {
    viewerProps: D3ModelViewerProps;
    modelFile?: File;
    mesh?: THREE.Mesh;
    wireframeMesh?: THREE.Mesh;
    theme?: D3ModelViewerTheme;
    topology?: ModelAttr;
    withClipping?: boolean;
    scene: THREE.Scene;
    defaultGroup: THREE.Group;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    orbitControls: OrbitControls;
    controlsGizmo: OrbitControlsGizmo;
    boundingBox: THREE.BoxHelper;
    xSprite: any;
    ySprite: any;
    zSprite: any;
    plane: THREE.GridHelper;
    axisHelper: THREE.AxesHelper;
    xDims: number;
    yDims: number;
    zDims: number;
    camPos: THREE.Vector3;
    constructor(viewerProps: D3ModelViewerProps);
}
