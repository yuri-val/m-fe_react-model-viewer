import { CloseOutlined } from '@ant-design/icons';
import * as U from '@m-fe/utils';
import Button from 'antd/lib/button';
import Descriptions from 'antd/lib/descriptions';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Space from 'antd/lib/space';
import { saveAs } from 'file-saver';
import React from 'react';
import { useViewerStateStore } from '../../../stores';
import { i18nFormat, StlExporter, } from '../../../utils';
import { Divider } from '../../decorators';
export const FileExporterPanel = ({ className, style, children, }) => {
    const viewerStateStore = useViewerStateStore();
    const [fileName, setFileName] = React.useState('');
    const [exportFileType, setExportFileType] = React.useState('stl-text');
    const { threeRenderer, unit, isFileExporterPanelVisible } = viewerStateStore;
    if (!threeRenderer || !threeRenderer.context) {
        return React.createElement(React.Fragment, null);
    }
    if (!isFileExporterPanelVisible) {
        return React.createElement(React.Fragment, null);
    }
    const onExport = () => {
        const mesh = threeRenderer.context.mesh;
        const stlExporter = new StlExporter();
        const buffer = stlExporter.parse(mesh, { binary: true });
        const blob = new Blob([buffer], { type: 'application/vnd.ms-pki.stl' });
        saveAs(blob, fileName + '.stl');
    };
    return (React.createElement("div", { className: "rmv-drawer-panel", style: { width: 400 } },
        React.createElement("div", { className: "rmv-drawer-panel-header" },
            React.createElement("span", null, U.get(threeRenderer, r => r.viewerProps.fileName)),
            React.createElement(CloseOutlined, { onClick: () => {
                    viewerStateStore.setPartialState({
                        isFileExporterPanelVisible: false,
                    });
                } })),
        React.createElement(Divider, null),
        React.createElement("div", { className: "rmv-drawer-panel-body" },
            React.createElement(Descriptions, { title: i18nFormat('参数'), column: 1 },
                React.createElement(Descriptions.Item, { label: i18nFormat('文件名') },
                    React.createElement(Input, { value: fileName, onChange: e => {
                            setFileName(e.target.value);
                        } })),
                React.createElement(Descriptions.Item, { label: i18nFormat('格式') },
                    React.createElement(Select, { style: { width: 250 }, options: [
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
        React.createElement(Space, { align: "center", style: { display: 'flex', justifyContent: 'center' } },
            React.createElement(Button, { size: "small", type: "primary", onClick: onExport }, i18nFormat('导出')))));
};
FileExporterPanel.displayName = 'FileExporterPanel';
//# sourceMappingURL=index.js.map