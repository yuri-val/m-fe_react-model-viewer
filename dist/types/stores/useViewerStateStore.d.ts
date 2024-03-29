import React from 'react';
import { ThreeRenderer } from '../engine';
import { D3ModelViewerState } from '../types';
export interface ViewerStateStore extends D3ModelViewerState {
    threeRenderer?: ThreeRenderer;
    loaderEvent?: string;
    setPartialState?: (partialState: Partial<ViewerStateStore>) => void;
    resetPanelVisible?: () => void;
}
export declare const useViewerStateStore: import("zustand").UseStore<ViewerStateStore>;
export declare const withViewerStateStore: <T>(BaseComponent: React.ComponentType<T>) => (props: T) => JSX.Element;
