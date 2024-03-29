import './index.css';
import * as React from 'react';
import * as THREE from 'three';
import { D3ModelCompressType, D3ModelSrc, D3ModelType, D3ModelViewerProps, ModelAttr } from '../../types';
export interface GoogleModelViewerProps extends D3ModelViewerProps {
}
interface GoogleModelViewerState {
    type: D3ModelType;
    compressType: D3ModelCompressType;
    gltfSrc?: D3ModelSrc;
    mesh?: THREE.Mesh;
    topology?: ModelAttr;
    modelFile?: File;
    cameraX?: number;
    cameraY?: number;
    cameraZ?: number;
}
export declare class GoogleModelViewer extends React.Component<GoogleModelViewerProps, GoogleModelViewerState> {
    get mixedProps(): D3ModelViewerProps;
    id: string;
    $ref: any;
    state: GoogleModelViewerState;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: GoogleModelViewerProps): void;
    /** 这里根据传入的文件类型，进行不同的文件转化 */
    loadModel(props: GoogleModelViewerProps): Promise<void>;
    onLoad: () => Promise<void>;
    handleCompress: () => Promise<void>;
    render(): JSX.Element;
}
export {};
