"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialStateFromProps = void 0;
const tslib_1 = require("tslib");
const getInitialStateFromProps = (props) => {
    const { customOptions, layoutOptions, renderOptions } = props, restProps = (0, tslib_1.__rest)(props, ["customOptions", "layoutOptions", "renderOptions"]);
    const state = Object.assign(Object.assign(Object.assign(Object.assign({}, restProps), customOptions), layoutOptions), renderOptions);
    return state;
};
exports.getInitialStateFromProps = getInitialStateFromProps;
//# sourceMappingURL=D3ModelViewerState.js.map