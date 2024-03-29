"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unzip = exports.deflateByZip = exports.deflate = exports.inflate = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("@m-fe/utils");
const jszip_1 = (0, tslib_1.__importDefault)(require("jszip"));
const pako_1 = (0, tslib_1.__importDefault)(require("pako"));
const workerize_1 = (0, tslib_1.__importDefault)(require("workerize"));
const js_zip_1 = require("./js-zip");
const pako_2 = require("./pako");
/** 模型压缩 */
const workerScript = `
  ${pako_2.pakoSourceCode}

  export function deflateInWorker(intArray){
    return pako.deflate(intArray)
  }

  export function inflateInWorker(intArray){
    return pako.inflate(intArray)
  }
`;
/** 执行解压操作 */
async function inflate(modelFile) {
    let buffer = await (0, utils_1.readFileAsArrayBufferAsync)(modelFile);
    let intArray = new Uint8Array(buffer);
    let depressedFile;
    try {
        if (window.Worker) {
            const worker = (0, workerize_1.default)(workerScript);
            depressedFile = await worker.inflateInWorker(intArray);
        }
        else {
            depressedFile = pako_1.default.inflate(intArray);
        }
    }
    catch (_) {
        console.error(_);
        depressedFile = pako_1.default.inflate(intArray);
    }
    // 强制释放内存
    buffer = null;
    intArray = null;
    return depressedFile;
}
exports.inflate = inflate;
/**
 * zlib 文件压缩
 * @param modelFile
 * @returns
 */
async function deflate(modelFile) {
    let buffer = await (0, utils_1.readFileAsArrayBufferAsync)(modelFile);
    let intArray = new Uint8Array(buffer);
    let deflatedFile;
    try {
        if (window.Worker) {
            const worker = (0, workerize_1.default)(workerScript);
            deflatedFile = await worker.deflateInWorker(intArray);
            pako_1.default.inflate(deflatedFile);
        }
        else {
            deflatedFile = pako_1.default.deflate(intArray);
        }
    }
    catch (_) {
        console.error(_);
        deflatedFile = pako_1.default.deflate(intArray);
    }
    // 强制释放内存
    buffer = null;
    intArray = null;
    return deflatedFile;
}
exports.deflate = deflate;
/** zip 模型压缩 */
const jsZipWorkerScript = `
  ${js_zip_1.zipSourceCode}

  export function zippedWorker(filename, intArray){
    const zip = new JSZip();
    zip.file(filename, intArray);
    return zip.generateAsync({
        type: 'uint8array',
        // 压缩算法
        compression: 'DEFLATE',
        compressionOptions: {
          // 压缩级别
          level: 9,
        },
      });
  }

  export function unzipWorker(intArray){
    return JSZip.loadAsync(intArray).then(zip => {
      const filename = Object.keys(zip.files)[0];
      return zip.file(filename).async('uint8array');
    });
  }
`;
/**
 * zip 文件压缩
 * @param modelFile
 * @returns
 */
async function deflateByZip(modelFile) {
    // 读取文件内容
    let buffer = await (0, utils_1.readFileAsArrayBufferAsync)(modelFile);
    let intArray = new Uint8Array(buffer);
    const zip = new jszip_1.default();
    zip.file(modelFile.name, intArray);
    // 执行压缩操作
    let zippedFile;
    try {
        if (window.Worker) {
            const worker = (0, workerize_1.default)(jsZipWorkerScript);
            zippedFile = await worker.zippedWorker(modelFile.name, intArray);
        }
        else {
            zippedFile = await zip.generateAsync({
                type: 'uint8array',
                // 压缩算法
                compression: 'DEFLATE',
                compressionOptions: {
                    // 压缩级别
                    level: 9,
                },
            });
        }
    }
    catch (_) {
        console.error(_);
        zippedFile = await zip.generateAsync({
            type: 'uint8array',
            // 压缩算法
            compression: 'DEFLATE',
            compressionOptions: {
                // 压缩级别
                level: 9,
            },
        });
    }
    // 强制释放内存
    buffer = null;
    intArray = null;
    return zippedFile;
}
exports.deflateByZip = deflateByZip;
/**
 * zip 文件解压
 * @param modelFile
 * @returns
 */
async function unzip(modelFile) {
    let buffer = await (0, utils_1.readFileAsArrayBufferAsync)(modelFile);
    let intArray = new Uint8Array(buffer);
    // 执行解压操作
    let unzipFile;
    try {
        if (window.Worker) {
            const worker = (0, workerize_1.default)(jsZipWorkerScript);
            unzipFile = await worker.unzipWorker(intArray);
        }
        else {
            unzipFile = await jszip_1.default.loadAsync(intArray).then(zip => {
                const filename = Object.keys(zip.files)[0];
                return zip.file(filename).async('uint8array');
            });
        }
    }
    catch (_) {
        console.error(_);
        unzipFile = await jszip_1.default.loadAsync(intArray).then(zip => {
            const filename = Object.keys(zip.files)[0];
            return zip.file(filename).async('uint8array');
        });
    }
    // 强制释放内存
    buffer = null;
    intArray = null;
    return unzipFile;
}
exports.unzip = unzip;
//# sourceMappingURL=zlib.js.map