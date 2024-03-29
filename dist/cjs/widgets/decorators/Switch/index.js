"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const tslib_1 = require("tslib");
require("./index.css");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const Switch = ({ id, checked, onChange, onColor = 'rgba(255,153,0,1)', }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("input", { checked: checked, onChange: onChange, className: "react-switch-checkbox", id: `react-switch-new-${id}`, type: "checkbox" }),
        react_1.default.createElement("label", { className: "react-switch-label", htmlFor: `react-switch-new-${id}` },
            react_1.default.createElement("span", { className: `react-switch-button`, style: { background: checked && onColor } }))));
};
exports.Switch = Switch;
//# sourceMappingURL=index.js.map