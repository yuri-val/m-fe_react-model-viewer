import './index.css';
import React from 'react';
import { ThreeRenderer } from '../../engine';
import { ViewerStateStore } from '../../stores';
import { D3ModelViewerProps } from '../../types';
interface IProps extends D3ModelViewerProps {
    viewerStateStore?: ViewerStateStore;
}
interface IState {
}
export declare class ThreeViewerComp extends React.Component<IProps, IState> {
    static displayName: string;
    get mixedProps(): IProps;
    getDom: () => HTMLElement;
    get threeRenderer(): ThreeRenderer;
    id: string;
    $ref: React.RefObject<HTMLDivElement>;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IProps): void;
    componentWillUnmount(): void;
    initRenderer(props?: IProps): void;
    renderWebGL(): JSX.Element;
    renderAttr(): JSX.Element;
    render(): JSX.Element;
}
export declare const ThreeViewer: (props: IProps) => JSX.Element;
export {};
