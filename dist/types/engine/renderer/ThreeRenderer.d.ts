import * as THREE from 'three';
import { D3ModelViewerProps, D3ModelViewerState, D3ModelViewerTheme } from '../../types';
import { ThreeDryRenderer } from './ThreeDryRenderer';
import { ThreeRendererContext } from './ThreeRendererContext';
export declare class ThreeRenderer extends ThreeDryRenderer {
    viewerProps: D3ModelViewerProps;
    id: string;
    animationId: number;
    context: ThreeRendererContext;
    onContextChange: (partialViewerState: Partial<D3ModelViewerState>) => void;
    getViewerState: () => D3ModelViewerState;
    getDom: () => HTMLElement;
    get $dom(): HTMLElement;
    constructor(viewerProps: D3ModelViewerProps, { getDom, getViewerState, onContextChange, }: {
        getDom: () => HTMLElement;
        getViewerState: () => D3ModelViewerState;
        onContextChange: (partialViewerState: Partial<D3ModelViewerState>) => void;
    });
    init(props?: Partial<D3ModelViewerProps>): Promise<void>;
    /** 清除实体 */
    destroy(): void;
    /** 这里根据传入的文件类型，进行不同的文件转化 */
    loadModel(): Promise<void>;
    captureSnapshot: () => Promise<string>;
    changeMaterial: (material: THREE.Material) => void;
    changeModelColor: (modelColor: string) => void;
    changeBackgroundColor: (backgroundColor: string) => void;
    changeTheme(theme: D3ModelViewerTheme): void;
    /** 移除着色图 */
    removeMaterialedMesh(): void;
    /** 添加着色图 */
    setupMaterialedMesh(): void;
    /** 移除包围盒 */
    removeBoundingBox(): void;
    setupBoundingBox(): void;
    removeWireFrame(): void;
    setupWireframe(): void;
    removeAxisHelper(): void;
    setupAxisHelper(): void;
    removePlane(): void;
    setupPlane(): void;
    moveUp(): void;
    moveDown(): void;
    moveLeft(): void;
    moveRight(): void;
    /** 重置相机 */
    resetCamera(): void;
    /** 渲染某个 Mesh */
    private renderMesh;
    /** 初始化场景 */
    private setupScene;
    /** 初始化渲染器 */
    private setupRenderer;
    /** 初始化控制器 */
    private setupEquipments;
    private setupCamera;
    private renderScene;
    private setupDecorators;
    /** 动画 */
    private animate;
    /** 加载完成事件 */
    onLoad: () => Promise<void>;
    /** 处理压缩 */
    private handleCompress;
}
