import { D3ModelViewerCustomOptions, D3ModelViewerLayoutOptions, D3ModelViewerProps, D3ModelViewerRenderOptions } from './D3ModelViewerProps';
export interface D3ModelViewerState extends Partial<D3ModelViewerCustomOptions>, Partial<D3ModelViewerLayoutOptions>, Partial<D3ModelViewerRenderOptions> {
    /** 摄像头位置 */
    camPos?: {
        x: number;
        y: number;
        z: number;
    };
    /** 模型文件是否加载完毕 */
    hasModelFileLoaded?: boolean;
    /** 是否展示属性面板 */
    isAttrPanelVisible?: boolean;
    /** 是否展示设置面板 */
    isSettingsPanelVisible?: boolean;
    /** 是否展示渲染参数 */
    isRenderOptionsPanelVisible?: boolean;
    /** 是否显示截图选择器 */
    isSnapshotPreviewVisible?: boolean;
    /** 是否显示操作面板 */
    isOperPanelVisible?: boolean;
    /** 是否显示文件导出面板 */
    isFileExporterPanelVisible?: boolean;
    /** 颜色选择器，兼容 WebGLViewer 的情况 */
    isColorPickerVisible?: boolean;
    /** 保存的截图信息 */
    snapshotDataUrl?: string;
}
export declare const getInitialStateFromProps: (props: Partial<D3ModelViewerProps>) => D3ModelViewerState;
