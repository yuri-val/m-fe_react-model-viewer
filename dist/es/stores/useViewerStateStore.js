import React from 'react';
import create from 'zustand';
export const useViewerStateStore = create(set => ({
    setPartialState: (partialState) => set(state => (Object.assign(Object.assign({}, state), partialState))),
    resetPanelVisible: () => set(() => ({
        isAttrPanelVisible: false,
        isRenderOptionsPanelVisible: false,
        isSettingsPanelVisible: false,
        isOperPanelVisible: false,
        isFileExporterPanelVisible: false,
    })),
}));
export const withViewerStateStore = (BaseComponent) => (props) => {
    const store = useViewerStateStore();
    return React.createElement(BaseComponent, Object.assign({}, props, { viewerStateStore: store }));
};
//# sourceMappingURL=useViewerStateStore.js.map