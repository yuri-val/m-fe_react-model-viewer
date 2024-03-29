import * as THREE from 'three';
export interface StlExporterOptions {
    binary?: boolean;
}
export declare class StlExporter {
    parse(mesh: THREE.Mesh, options?: StlExporterOptions): DataView | string;
}
