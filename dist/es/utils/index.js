export * from './cad';
export * from './core';
export * from './geometry';
export * from './io';
// 转化为固定格式的数字
export function toFixedNumber(num, fractionDigits = 2) {
    return parseFloat(Number(num).toFixed(fractionDigits));
}
//# sourceMappingURL=index.js.map