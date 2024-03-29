import { D3ModelCompressType, D3ModelSrc, D3ModelType, D3ModelViewerProps } from '../../../types';
/** 根据模型名称推导出可能的类型 */
export declare function getModelType(fileName: string, model: D3ModelSrc): D3ModelType;
/** 根据模型名称推导出可能的压缩类型 */
export declare function getModelCompressType(fileName: string, model: D3ModelSrc): D3ModelCompressType;
/** 将模型统一转化为文件对象 */
export declare function getFileObjFromModelSrc(props: Partial<D3ModelViewerProps>): Promise<File>;
