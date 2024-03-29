import { __rest } from "tslib";
export const getInitialStateFromProps = (props) => {
    const { customOptions, layoutOptions, renderOptions } = props, restProps = __rest(props, ["customOptions", "layoutOptions", "renderOptions"]);
    const state = Object.assign(Object.assign(Object.assign(Object.assign({}, restProps), customOptions), layoutOptions), renderOptions);
    return state;
};
//# sourceMappingURL=D3ModelViewerState.js.map