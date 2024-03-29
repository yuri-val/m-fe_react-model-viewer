/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import { deflate, getFileObjFromModelSrc, getModelCompressType, } from '../utils';
export async function compressD3Model(props, _targetCompressType) {
    const compressType = props.compressType || getModelCompressType(props.fileName, props.src);
    const modelFile = await getFileObjFromModelSrc(Object.assign(Object.assign({}, props), { compressType }));
    // 异步进行压缩操作
    const ab = await deflate(modelFile);
    return ab;
}
//# sourceMappingURL=compress.js.map