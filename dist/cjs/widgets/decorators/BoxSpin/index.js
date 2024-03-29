"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxSpin = void 0;
const tslib_1 = require("tslib");
require("./index.css");
const classnames_1 = (0, tslib_1.__importDefault)(require("classnames"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const BoxSpin = ({ className, style }) => {
    return (react_1.default.createElement("div", { id: "BoxSpin", className: (0, classnames_1.default)(className, 'cssload-box-loading'), style: style }));
};
exports.BoxSpin = BoxSpin;
exports.BoxSpin.displayName = 'BoxSpin';
//# sourceMappingURL=index.js.map