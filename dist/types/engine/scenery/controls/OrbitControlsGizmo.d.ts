import { OrbitControls } from './OrbitControls';
declare class OrbitControlsGizmo {
    domElement: HTMLElement | Document;
    lock: boolean;
    lockX: boolean;
    lockY: boolean;
    update: () => void;
    dispose: () => void;
    constructor(orbitControls: OrbitControls, options: any);
}
export { OrbitControlsGizmo };
