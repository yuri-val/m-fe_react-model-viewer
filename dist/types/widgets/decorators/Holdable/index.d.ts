/// <reference types="node" />
import { Component } from 'react';
interface IProps {
    startTimeout?: number;
    onPressStart?: () => void;
    longPressEnd?: () => void;
    pressCallbackTimeout?: number;
    onPress?: () => void;
    finite?: boolean;
    className?: string;
    children: JSX.Element;
}
interface IState {
    isPressed: boolean;
}
export declare class Holdable extends Component<IProps, IState> {
    static defaultProps: Partial<IProps>;
    state: IState;
    longPressTimeout: NodeJS.Timeout;
    pressInterval: NodeJS.Timeout;
    onMouseDown: () => void;
    onMouseOut: () => void;
    clearTimeout: () => void;
    isCurrentlyPressed: () => boolean;
    onPressStart: () => void;
    longPressEnd: () => void;
    render(): JSX.Element;
}
export {};
