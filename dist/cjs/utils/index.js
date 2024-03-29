"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFixedNumber = void 0;
const tslib_1 = require("tslib");
(0, tslib_1.__exportStar)(require("./cad"), exports);
(0, tslib_1.__exportStar)(require("./core"), exports);
(0, tslib_1.__exportStar)(require("./geometry"), exports);
(0, tslib_1.__exportStar)(require("./io"), exports);
// 转化为固定格式的数字
function toFixedNumber(num, fractionDigits = 2) {
    return parseFloat(Number(num).toFixed(fractionDigits));
}
exports.toFixedNumber = toFixedNumber;
//# sourceMappingURL=index.js.map