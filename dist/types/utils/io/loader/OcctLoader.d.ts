import { D3ModelViewerProps } from '../../../types';
declare global {
    interface Window {
        cadWorker: Worker;
        cadWorkerBasePath: string;
        messageHandlers: Record<string, (...args: any[]) => any>;
        occtLoader: OcctLoader;
    }
}
export declare class OcctLoader {
    mesh?: THREE.Mesh;
    isWorkerReady?: boolean;
    static getInstance(): OcctLoader;
    constructor();
    initWorker(): Promise<void>;
    load(file: File, props: D3ModelViewerProps): Promise<THREE.Mesh>;
    waitForWorkerReady(): Promise<void>;
}
