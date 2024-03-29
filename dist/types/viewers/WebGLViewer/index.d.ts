import './index.css';
import React from 'react';
import { ThreeRenderer } from '../../engine';
import { ViewerStateStore } from '../../stores';
import { D3ModelViewerProps } from '../../types';
declare global {
    const __DEV__: boolean;
}
interface IProps extends D3ModelViewerProps {
    viewerStateStore?: ViewerStateStore;
}
interface IState {
}
export declare class WebGLViewerComp extends React.Component<IProps, IState> {
    static displayName: string;
    get mixedProps(): IProps;
    getDom: () => HTMLElement;
    get threeRenderer(): ThreeRenderer;
    id: string;
    $ref: React.RefObject<HTMLDivElement>;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IProps): void;
    componentWillUnmount(): void;
    componentDidCatch(error: Error): void;
    initRenderer(props?: IProps): void;
    renderWebGL(): JSX.Element;
    renderAttr(): JSX.Element;
    renderLoose(): JSX.Element;
    render(): JSX.Element;
}
export declare const WebGLViewer: (props: IProps) => JSX.Element;
export {};
