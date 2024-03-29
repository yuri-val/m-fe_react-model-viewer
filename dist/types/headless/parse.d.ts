import { D3ModelViewerProps, ModelAttr } from '../types';
/** 解析模型并且进行一系列计算 */
export declare function parseD3Model(_props: Partial<D3ModelViewerProps>, { withSnapshot, withWallThickness, withCompress, }: {
    withSnapshot: boolean;
    withWallThickness?: boolean;
    withCompress?: boolean;
}): Promise<{
    topology: ModelAttr;
    wallThickness: number;
    snapshot?: string;
    compressedArrayBuffer?: ArrayBuffer;
}>;
