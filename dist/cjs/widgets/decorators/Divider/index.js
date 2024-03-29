"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Divider = void 0;
const tslib_1 = require("tslib");
require("./index.css");
const classnames_1 = (0, tslib_1.__importDefault)(require("classnames"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const Divider = ({ className, style }) => {
    return (react_1.default.createElement("div", { id: "Divider", className: (0, classnames_1.default)(className, 'rmv-divider'), style: style }));
};
exports.Divider = Divider;
exports.Divider.displayName = 'Divider';
//# sourceMappingURL=index.js.map