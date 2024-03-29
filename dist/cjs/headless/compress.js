"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressD3Model = void 0;
const utils_1 = require("../utils");
async function compressD3Model(props, _targetCompressType) {
    const compressType = props.compressType || (0, utils_1.getModelCompressType)(props.fileName, props.src);
    const modelFile = await (0, utils_1.getFileObjFromModelSrc)(Object.assign(Object.assign({}, props), { compressType }));
    // 异步进行压缩操作
    const ab = await (0, utils_1.deflate)(modelFile);
    return ab;
}
exports.compressD3Model = compressD3Model;
//# sourceMappingURL=compress.js.map