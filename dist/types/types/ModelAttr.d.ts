/** 文件的属性 */
export declare class ModelAttr {
    triangleCnt: number;
    vertexCnt: number;
    edgeCnt: number;
    sizeX: number;
    sizeY: number;
    sizeZ: number;
    volume: number;
    area: number;
    thick: number;
    shellCnt: number;
    flipped: number;
    boundary: number;
    nonManifol: number;
    constructor(attr?: Partial<ModelAttr>);
}
