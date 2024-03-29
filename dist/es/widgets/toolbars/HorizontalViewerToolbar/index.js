import './index.css';
import { CameraOutlined, ControlOutlined, ExportOutlined, FolderOpenOutlined, InfoCircleOutlined, SettingOutlined, ToolOutlined, } from '@ant-design/icons';
import Menu from 'antd/lib/menu';
import message from 'antd/lib/message';
import Tooltip from 'antd/lib/tooltip';
import cn from 'classnames';
import Dropdown from 'rc-dropdown';
import React from 'react';
import { useViewerStateStore } from '../../../stores';
import { i18nFormat } from '../../../utils';
import { PaleteeSvg } from '../../svgs/PaletteSvg';
import { TreeSvg } from '../../svgs/TreeSvg';
import { FileImporter } from './importer';
export const HorizontalViewerToolbar = ({ className, style, threeRenderer, }) => {
    const viewerStateStore = useViewerStateStore();
    const renderItem = (icon, label, { key, onClick = () => { } } = {}) => {
        const disabled = label === i18nFormat('打开') || label === i18nFormat('设置')
            ? false
            : !viewerStateStore.hasModelFileLoaded;
        return (React.createElement("div", { className: cn({
                'rmv-viewer-toolbar-item': true,
                'rmv-viewer-toolbar-item--disabled': disabled,
                'rmv-viewer-toolbar-item--selected': !!viewerStateStore[key],
            }), onClick: disabled ? () => { } : onClick },
            React.createElement("span", { className: "rmv-viewer-toolbar-item-icon" }, icon),
            React.createElement("span", { className: "rmv-viewer-toolbar-item-label" }, label)));
    };
    return (React.createElement("div", { id: "HorizontalViewerToolbar", className: cn(className, 'rmv-viewer-toolbar'), style: Object.assign({}, (style || {})) },
        React.createElement("div", { className: "rmv-viewer-toolbar-left" },
            React.createElement(Dropdown, { overlayClassName: "rmv-viewer-toolbar-dropdown", trigger: ['hover'], overlay: React.createElement(Menu, null,
                    React.createElement(Menu.Item, { key: "file" },
                        React.createElement(FileImporter, { threeRenderer: threeRenderer })),
                    React.createElement(Menu.Item, { key: "file-zlib" },
                        React.createElement(FileImporter, { threeRenderer: threeRenderer, compressType: "zlib" })),
                    React.createElement(Menu.Item, { key: "url", disabled: true }, i18nFormat('打开网络地址')),
                    React.createElement(Menu.Item, { key: "dir", disabled: true }, i18nFormat('打开文件夹')),
                    React.createElement(Menu.Item, { key: "zip-dir", disabled: true }, i18nFormat('打开文件夹（ZIP 压缩包）'))) }, renderItem(React.createElement(FolderOpenOutlined, null), i18nFormat('打开'))),
            renderItem(React.createElement(TreeSvg, null), React.createElement(Tooltip, { overlay: i18nFormat('查看文件结构'), placement: "bottom" },
                React.createElement("span", null, i18nFormat('结构')))),
            React.createElement(Dropdown, { key: i18nFormat('导出'), overlayClassName: "rmv-viewer-toolbar-dropdown", trigger: viewerStateStore.hasModelFileLoaded ? ['hover'] : [], overlay: React.createElement(Menu, null,
                    React.createElement(Menu.Item, { key: "export-model", onClick: () => {
                            viewerStateStore.setPartialState({
                                isFileExporterPanelVisible: true,
                            });
                        } }, i18nFormat('导出为模型')),
                    React.createElement(Menu.Item, { key: "slice", disabled: true }, i18nFormat('切片')),
                    React.createElement(Menu.Divider, null),
                    React.createElement(Menu.Item, { key: "zip", disabled: true }, i18nFormat('压缩为 ZIP 格式')),
                    React.createElement(Menu.Item, { key: "zlib", disabled: true }, i18nFormat('压缩为 ZLIB 格式'))) }, renderItem(React.createElement(ExportOutlined, null), i18nFormat('导出')))),
        React.createElement("div", { className: "rmv-viewer-toolbar-middle" },
            renderItem(React.createElement(PaleteeSvg, null), React.createElement(Tooltip, { overlay: i18nFormat('配置渲染选项'), placement: "bottom" },
                React.createElement("span", null, i18nFormat('渲染'))), {
                key: 'isRenderOptionsPanelVisible',
                onClick: () => {
                    viewerStateStore.resetPanelVisible();
                    viewerStateStore.setPartialState({
                        isRenderOptionsPanelVisible: !viewerStateStore.isRenderOptionsPanelVisible,
                    });
                },
            }),
            React.createElement(Dropdown, { overlayClassName: "rmv-viewer-toolbar-dropdown", trigger: viewerStateStore.hasModelFileLoaded ? ['hover'] : [], overlay: React.createElement(Menu, null,
                    React.createElement(Menu.Item, { key: "measure", disabled: true }, i18nFormat('距离测量')),
                    React.createElement(Menu.Item, { key: "wall-thickness", disabled: true }, i18nFormat('壁厚分析')),
                    React.createElement(Menu.Item, { key: "wall-thickness", disabled: true }, i18nFormat('异常分析')),
                    React.createElement(Menu.Divider, null),
                    React.createElement(Menu.Item, { key: "estimate", disabled: true }, i18nFormat('材料估价'))) }, renderItem(React.createElement(ToolOutlined, null), i18nFormat('测量'))),
            React.createElement(Dropdown, { overlayClassName: "rmv-viewer-toolbar-dropdown", trigger: viewerStateStore.hasModelFileLoaded ? ['hover'] : [], overlay: React.createElement(Menu, null,
                    React.createElement(Menu.Item, { key: "param-editor", onClick: () => {
                            viewerStateStore.resetPanelVisible();
                            viewerStateStore.setPartialState({
                                isOperPanelVisible: !viewerStateStore.isOperPanelVisible,
                            });
                        } }, i18nFormat('拓扑编辑')),
                    React.createElement(Menu.Item, { key: "step-editor", disabled: true }, i18nFormat('代码编辑')),
                    React.createElement(Menu.Divider, null),
                    React.createElement(Menu.Item, { key: "repair", disabled: true }, i18nFormat('面片修复')),
                    React.createElement(Menu.Item, { key: "repair", disabled: true }, i18nFormat('面片裁剪')),
                    React.createElement(Menu.Item, { key: "support", disabled: true }, i18nFormat('生成支撑'))) }, renderItem(React.createElement(ControlOutlined, null), i18nFormat('操作'))),
            renderItem(React.createElement(CameraOutlined, null), React.createElement(Tooltip, { overlay: i18nFormat('自动生成模型截图'), placement: "bottom" },
                React.createElement("span", null, i18nFormat('截图'))), {
                key: 'snapshotDataUrl',
                onClick: async () => {
                    if (viewerStateStore.snapshotDataUrl) {
                        return;
                    }
                    message.loading({
                        key: 'loading',
                        title: i18nFormat('截图中'),
                        duration: 0,
                    });
                    const dataUrl = await threeRenderer.captureSnapshot();
                    viewerStateStore.setPartialState({ snapshotDataUrl: dataUrl });
                    message.loading({
                        key: 'loading',
                        title: i18nFormat('截图成功，请自行裁剪'),
                    });
                },
            })),
        React.createElement("div", { className: "rmv-viewer-toolbar-right" },
            renderItem(React.createElement(InfoCircleOutlined, null), React.createElement(Tooltip, { overlay: i18nFormat('查看模型属性'), placement: "bottom" },
                React.createElement("span", null, i18nFormat('属性'))), {
                key: 'isAttrPanelVisible',
                onClick: () => {
                    viewerStateStore.resetPanelVisible();
                    viewerStateStore.setPartialState({
                        isAttrPanelVisible: !viewerStateStore.isAttrPanelVisible,
                    });
                },
            }),
            renderItem(React.createElement(SettingOutlined, null), i18nFormat('设置'), {
                key: 'isSettingsPanelVisible',
                onClick: () => {
                    viewerStateStore.resetPanelVisible();
                    viewerStateStore.setPartialState({
                        isSettingsPanelVisible: !viewerStateStore.isSettingsPanelVisible,
                    });
                },
            }))));
};
HorizontalViewerToolbar.displayName = 'HorizontalViewerToolbar';
//# sourceMappingURL=index.js.map