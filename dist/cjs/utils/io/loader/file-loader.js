"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileObjFromModelSrc = exports.getModelCompressType = exports.getModelType = void 0;
const utils_1 = require("@m-fe/utils");
const types_1 = require("../../../types");
const compressor_1 = require("../compressor");
/** 根据模型名称推导出可能的类型 */
function getModelType(fileName, model) {
    const name = (model instanceof File ? model.name : model) || fileName || '';
    for (const d3ModelType of types_1.D3ModelTypes) {
        // 统一设置为小写，这里不使用 endsWith 是因为结尾可能为 zlib
        if (`${name}`.toLocaleLowerCase().indexOf('.' + d3ModelType) > -1) {
            return d3ModelType;
        }
    }
    return 'stl';
}
exports.getModelType = getModelType;
/** 根据模型名称推导出可能的压缩类型 */
function getModelCompressType(fileName, model) {
    const name = (model instanceof File ? model.name : model) || fileName || '';
    if ((name || '').indexOf('.zlib') > -1) {
        return 'zlib';
    }
    if ((name || '').indexOf('.zip') > -1) {
        return 'zip';
    }
    return 'none';
}
exports.getModelCompressType = getModelCompressType;
/** 将模型统一转化为文件对象 */
async function getFileObjFromModelSrc(props) {
    const fileName = props.fileName;
    // 判断是否为 ZIP 文件
    if (props.compressType !== 'none') {
        let zippedFile;
        if (props.src instanceof File) {
            zippedFile = props.src;
        }
        else {
            // 将 Blob 转化为文件
            const blob = await (await fetch(props.src, {
                cache: 'force-cache',
                mode: 'cors',
            })).blob();
            zippedFile = (0, utils_1.blobToFile)(blob, fileName);
        }
        // 解压缩文件
        let modelArray;
        if (props.compressType === 'zlib') {
            modelArray = await (0, compressor_1.inflate)(zippedFile);
        }
        if (props.compressType === 'zip') {
            modelArray = await (0, compressor_1.unzip)(zippedFile);
        }
        return (0, utils_1.arrayBufferToFile)(modelArray.buffer, 'application/stl', props.fileName);
    }
    else {
        // 否则作为正常处理
        if (props.src instanceof File) {
            return props.src;
        }
        else {
            try {
                // 将 Blob 转化为文件
                const blob = await (await fetch(props.src, {
                    cache: 'force-cache',
                    mode: 'cors',
                })).blob();
                return (0, utils_1.blobToFile)(blob, fileName);
            }
            catch (e) {
                return null;
            }
        }
    }
}
exports.getFileObjFromModelSrc = getFileObjFromModelSrc;
//# sourceMappingURL=file-loader.js.map