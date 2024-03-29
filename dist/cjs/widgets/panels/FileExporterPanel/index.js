"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileExporterPanel = void 0;
const tslib_1 = require("tslib");
const icons_1 = require("@ant-design/icons");
const U = (0, tslib_1.__importStar)(require("@m-fe/utils"));
const button_1 = (0, tslib_1.__importDefault)(require("antd/lib/button"));
const descriptions_1 = (0, tslib_1.__importDefault)(require("antd/lib/descriptions"));
const input_1 = (0, tslib_1.__importDefault)(require("antd/lib/input"));
const select_1 = (0, tslib_1.__importDefault)(require("antd/lib/select"));
const space_1 = (0, tslib_1.__importDefault)(require("antd/lib/space"));
const file_saver_1 = require("file-saver");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const stores_1 = require("../../../stores");
const utils_1 = require("../../../utils");
const decorators_1 = require("../../decorators");
const FileExporterPanel = ({ className, style, children, }) => {
    const viewerStateStore = (0, stores_1.useViewerStateStore)();
    const [fileName, setFileName] = react_1.default.useState('');
    const [exportFileType, setExportFileType] = react_1.default.useState('stl-text');
    const { threeRenderer, unit, isFileExporterPanelVisible } = viewerStateStore;
    if (!threeRenderer || !threeRenderer.context) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    if (!isFileExporterPanelVisible) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    const onExport = () => {
        const mesh = threeRenderer.context.mesh;
        const stlExporter = new utils_1.StlExporter();
        const buffer = stlExporter.parse(mesh, { binary: true });
        const blob = new Blob([buffer], { type: 'application/vnd.ms-pki.stl' });
        (0, file_saver_1.saveAs)(blob, fileName + '.stl');
    };
    return (react_1.default.createElement("div", { className: "rmv-drawer-panel", style: { width: 400 } },
        react_1.default.createElement("div", { className: "rmv-drawer-panel-header" },
            react_1.default.createElement("span", null, U.get(threeRenderer, r => r.viewerProps.fileName)),
            react_1.default.createElement(icons_1.CloseOutlined, { onClick: () => {
                    viewerStateStore.setPartialState({
                        isFileExporterPanelVisible: false,
                    });
                } })),
        react_1.default.createElement(decorators_1.Divider, null),
        react_1.default.createElement("div", { className: "rmv-drawer-panel-body" },
            react_1.default.createElement(descriptions_1.default, { title: (0, utils_1.i18nFormat)('参数'), column: 1 },
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('文件名') },
                    react_1.default.createElement(input_1.default, { value: fileName, onChange: e => {
                            setFileName(e.target.value);
                        } })),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('格式') },
                    react_1.default.createElement(select_1.default, { style: { width: 250 }, options: [
                            {
                                label: 'Wavefront (.obj)',
                                value: 'obj',
                                disabled: true,
                            },
                            {
                                label: 'Stereolithography Text (.stl)',
                                value: 'stl-text',
                            },
                            {
                                label: 'Stereolithography Binary (.stl)',
                                value: 'stl-binary',
                                disabled: true,
                            },
                            {
                                label: 'Polygon File Format Text (.ply)',
                                value: 'ply-text',
                                disabled: true,
                            },
                            {
                                label: 'Polygon File Format Binary (.ply)',
                                value: 'ply-binary',
                                disabled: true,
                            },
                            {
                                label: 'glTF Text (.gltf)',
                                value: 'gltf',
                                disabled: true,
                            },
                            {
                                label: 'glTF Binary (.glb)',
                                value: 'glb',
                                disabled: true,
                            },
                            {
                                label: 'Object File Format Text (.off)',
                                value: 'off',
                                disabled: true,
                            },
                            {
                                label: 'Rhinoceros 3D (.3dm)',
                                value: '3dm',
                                disabled: true,
                            },
                            {
                                label: 'Dotbim (.bim)',
                                value: 'bim',
                                disabled: true,
                            },
                        ], value: exportFileType, onChange: e => {
                            setExportFileType(e);
                        } })))),
        react_1.default.createElement(space_1.default, { align: "center", style: { display: 'flex', justifyContent: 'center' } },
            react_1.default.createElement(button_1.default, { size: "small", type: "primary", onClick: onExport }, (0, utils_1.i18nFormat)('导出')))));
};
exports.FileExporterPanel = FileExporterPanel;
exports.FileExporterPanel.displayName = 'FileExporterPanel';
//# sourceMappingURL=index.js.map