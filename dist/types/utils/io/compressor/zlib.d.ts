/** 执行解压操作 */
export declare function inflate(modelFile: File): Promise<any>;
/**
 * zlib 文件压缩
 * @param modelFile
 * @returns
 */
export declare function deflate(modelFile: File): Promise<any>;
/**
 * zip 文件压缩
 * @param modelFile
 * @returns
 */
export declare function deflateByZip(modelFile: File): Promise<any>;
/**
 * zip 文件解压
 * @param modelFile
 * @returns
 */
export declare function unzip(modelFile: File): Promise<any>;
