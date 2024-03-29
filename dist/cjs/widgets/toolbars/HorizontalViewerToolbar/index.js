"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizontalViewerToolbar = void 0;
const tslib_1 = require("tslib");
require("./index.css");
const icons_1 = require("@ant-design/icons");
const menu_1 = (0, tslib_1.__importDefault)(require("antd/lib/menu"));
const message_1 = (0, tslib_1.__importDefault)(require("antd/lib/message"));
const tooltip_1 = (0, tslib_1.__importDefault)(require("antd/lib/tooltip"));
const classnames_1 = (0, tslib_1.__importDefault)(require("classnames"));
const rc_dropdown_1 = (0, tslib_1.__importDefault)(require("rc-dropdown"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const stores_1 = require("../../../stores");
const utils_1 = require("../../../utils");
const PaletteSvg_1 = require("../../svgs/PaletteSvg");
const TreeSvg_1 = require("../../svgs/TreeSvg");
const importer_1 = require("./importer");
const HorizontalViewerToolbar = ({ className, style, threeRenderer, }) => {
    const viewerStateStore = (0, stores_1.useViewerStateStore)();
    const renderItem = (icon, label, { key, onClick = () => { } } = {}) => {
        const disabled = label === (0, utils_1.i18nFormat)('打开') || label === (0, utils_1.i18nFormat)('设置')
            ? false
            : !viewerStateStore.hasModelFileLoaded;
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)({
                'rmv-viewer-toolbar-item': true,
                'rmv-viewer-toolbar-item--disabled': disabled,
                'rmv-viewer-toolbar-item--selected': !!viewerStateStore[key],
            }), onClick: disabled ? () => { } : onClick },
            react_1.default.createElement("span", { className: "rmv-viewer-toolbar-item-icon" }, icon),
            react_1.default.createElement("span", { className: "rmv-viewer-toolbar-item-label" }, label)));
    };
    return (react_1.default.createElement("div", { id: "HorizontalViewerToolbar", className: (0, classnames_1.default)(className, 'rmv-viewer-toolbar'), style: Object.assign({}, (style || {})) },
        react_1.default.createElement("div", { className: "rmv-viewer-toolbar-left" },
            react_1.default.createElement(rc_dropdown_1.default, { overlayClassName: "rmv-viewer-toolbar-dropdown", trigger: ['hover'], overlay: react_1.default.createElement(menu_1.default, null,
                    react_1.default.createElement(menu_1.default.Item, { key: "file" },
                        react_1.default.createElement(importer_1.FileImporter, { threeRenderer: threeRenderer })),
                    react_1.default.createElement(menu_1.default.Item, { key: "file-zlib" },
                        react_1.default.createElement(importer_1.FileImporter, { threeRenderer: threeRenderer, compressType: "zlib" })),
                    react_1.default.createElement(menu_1.default.Item, { key: "url", disabled: true }, (0, utils_1.i18nFormat)('打开网络地址')),
                    react_1.default.createElement(menu_1.default.Item, { key: "dir", disabled: true }, (0, utils_1.i18nFormat)('打开文件夹')),
                    react_1.default.createElement(menu_1.default.Item, { key: "zip-dir", disabled: true }, (0, utils_1.i18nFormat)('打开文件夹（ZIP 压缩包）'))) }, renderItem(react_1.default.createElement(icons_1.FolderOpenOutlined, null), (0, utils_1.i18nFormat)('打开'))),
            renderItem(react_1.default.createElement(TreeSvg_1.TreeSvg, null), react_1.default.createElement(tooltip_1.default, { overlay: (0, utils_1.i18nFormat)('查看文件结构'), placement: "bottom" },
                react_1.default.createElement("span", null, (0, utils_1.i18nFormat)('结构')))),
            react_1.default.createElement(rc_dropdown_1.default, { key: (0, utils_1.i18nFormat)('导出'), overlayClassName: "rmv-viewer-toolbar-dropdown", trigger: viewerStateStore.hasModelFileLoaded ? ['hover'] : [], overlay: react_1.default.createElement(menu_1.default, null,
                    react_1.default.createElement(menu_1.default.Item, { key: "export-model", onClick: () => {
                            viewerStateStore.setPartialState({
                                isFileExporterPanelVisible: true,
                            });
                        } }, (0, utils_1.i18nFormat)('导出为模型')),
                    react_1.default.createElement(menu_1.default.Item, { key: "slice", disabled: true }, (0, utils_1.i18nFormat)('切片')),
                    react_1.default.createElement(menu_1.default.Divider, null),
                    react_1.default.createElement(menu_1.default.Item, { key: "zip", disabled: true }, (0, utils_1.i18nFormat)('压缩为 ZIP 格式')),
                    react_1.default.createElement(menu_1.default.Item, { key: "zlib", disabled: true }, (0, utils_1.i18nFormat)('压缩为 ZLIB 格式'))) }, renderItem(react_1.default.createElement(icons_1.ExportOutlined, null), (0, utils_1.i18nFormat)('导出')))),
        react_1.default.createElement("div", { className: "rmv-viewer-toolbar-middle" },
            renderItem(react_1.default.createElement(PaletteSvg_1.PaleteeSvg, null), react_1.default.createElement(tooltip_1.default, { overlay: (0, utils_1.i18nFormat)('配置渲染选项'), placement: "bottom" },
                react_1.default.createElement("span", null, (0, utils_1.i18nFormat)('渲染'))), {
                key: 'isRenderOptionsPanelVisible',
                onClick: () => {
                    viewerStateStore.resetPanelVisible();
                    viewerStateStore.setPartialState({
                        isRenderOptionsPanelVisible: !viewerStateStore.isRenderOptionsPanelVisible,
                    });
                },
            }),
            react_1.default.createElement(rc_dropdown_1.default, { overlayClassName: "rmv-viewer-toolbar-dropdown", trigger: viewerStateStore.hasModelFileLoaded ? ['hover'] : [], overlay: react_1.default.createElement(menu_1.default, null,
                    react_1.default.createElement(menu_1.default.Item, { key: "measure", disabled: true }, (0, utils_1.i18nFormat)('距离测量')),
                    react_1.default.createElement(menu_1.default.Item, { key: "wall-thickness", disabled: true }, (0, utils_1.i18nFormat)('壁厚分析')),
                    react_1.default.createElement(menu_1.default.Item, { key: "wall-thickness", disabled: true }, (0, utils_1.i18nFormat)('异常分析')),
                    react_1.default.createElement(menu_1.default.Divider, null),
                    react_1.default.createElement(menu_1.default.Item, { key: "estimate", disabled: true }, (0, utils_1.i18nFormat)('材料估价'))) }, renderItem(react_1.default.createElement(icons_1.ToolOutlined, null), (0, utils_1.i18nFormat)('测量'))),
            react_1.default.createElement(rc_dropdown_1.default, { overlayClassName: "rmv-viewer-toolbar-dropdown", trigger: viewerStateStore.hasModelFileLoaded ? ['hover'] : [], overlay: react_1.default.createElement(menu_1.default, null,
                    react_1.default.createElement(menu_1.default.Item, { key: "param-editor", onClick: () => {
                            viewerStateStore.resetPanelVisible();
                            viewerStateStore.setPartialState({
                                isOperPanelVisible: !viewerStateStore.isOperPanelVisible,
                            });
                        } }, (0, utils_1.i18nFormat)('拓扑编辑')),
                    react_1.default.createElement(menu_1.default.Item, { key: "step-editor", disabled: true }, (0, utils_1.i18nFormat)('代码编辑')),
                    react_1.default.createElement(menu_1.default.Divider, null),
                    react_1.default.createElement(menu_1.default.Item, { key: "repair", disabled: true }, (0, utils_1.i18nFormat)('面片修复')),
                    react_1.default.createElement(menu_1.default.Item, { key: "repair", disabled: true }, (0, utils_1.i18nFormat)('面片裁剪')),
                    react_1.default.createElement(menu_1.default.Item, { key: "support", disabled: true }, (0, utils_1.i18nFormat)('生成支撑'))) }, renderItem(react_1.default.createElement(icons_1.ControlOutlined, null), (0, utils_1.i18nFormat)('操作'))),
            renderItem(react_1.default.createElement(icons_1.CameraOutlined, null), react_1.default.createElement(tooltip_1.default, { overlay: (0, utils_1.i18nFormat)('自动生成模型截图'), placement: "bottom" },
                react_1.default.createElement("span", null, (0, utils_1.i18nFormat)('截图'))), {
                key: 'snapshotDataUrl',
                onClick: async () => {
                    if (viewerStateStore.snapshotDataUrl) {
                        return;
                    }
                    message_1.default.loading({
                        key: 'loading',
                        title: (0, utils_1.i18nFormat)('截图中'),
                        duration: 0,
                    });
                    const dataUrl = await threeRenderer.captureSnapshot();
                    viewerStateStore.setPartialState({ snapshotDataUrl: dataUrl });
                    message_1.default.loading({
                        key: 'loading',
                        title: (0, utils_1.i18nFormat)('截图成功，请自行裁剪'),
                    });
                },
            })),
        react_1.default.createElement("div", { className: "rmv-viewer-toolbar-right" },
            renderItem(react_1.default.createElement(icons_1.InfoCircleOutlined, null), react_1.default.createElement(tooltip_1.default, { overlay: (0, utils_1.i18nFormat)('查看模型属性'), placement: "bottom" },
                react_1.default.createElement("span", null, (0, utils_1.i18nFormat)('属性'))), {
                key: 'isAttrPanelVisible',
                onClick: () => {
                    viewerStateStore.resetPanelVisible();
                    viewerStateStore.setPartialState({
                        isAttrPanelVisible: !viewerStateStore.isAttrPanelVisible,
                    });
                },
            }),
            renderItem(react_1.default.createElement(icons_1.SettingOutlined, null), (0, utils_1.i18nFormat)('设置'), {
                key: 'isSettingsPanelVisible',
                onClick: () => {
                    viewerStateStore.resetPanelVisible();
                    viewerStateStore.setPartialState({
                        isSettingsPanelVisible: !viewerStateStore.isSettingsPanelVisible,
                    });
                },
            }))));
};
exports.HorizontalViewerToolbar = HorizontalViewerToolbar;
exports.HorizontalViewerToolbar.displayName = 'HorizontalViewerToolbar';
//# sourceMappingURL=index.js.map