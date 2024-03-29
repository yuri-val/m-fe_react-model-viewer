"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withViewerStateStore = exports.useViewerStateStore = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const zustand_1 = (0, tslib_1.__importDefault)(require("zustand"));
exports.useViewerStateStore = (0, zustand_1.default)(set => ({
    setPartialState: (partialState) => set(state => (Object.assign(Object.assign({}, state), partialState))),
    resetPanelVisible: () => set(() => ({
        isAttrPanelVisible: false,
        isRenderOptionsPanelVisible: false,
        isSettingsPanelVisible: false,
        isOperPanelVisible: false,
        isFileExporterPanelVisible: false,
    })),
}));
const withViewerStateStore = (BaseComponent) => (props) => {
    const store = (0, exports.useViewerStateStore)();
    return react_1.default.createElement(BaseComponent, Object.assign({}, props, { viewerStateStore: store }));
};
exports.withViewerStateStore = withViewerStateStore;
//# sourceMappingURL=useViewerStateStore.js.map