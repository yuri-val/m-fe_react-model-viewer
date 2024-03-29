import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import * as U from '@m-fe/utils';
import Button from 'antd/lib/button';
import Descriptions from 'antd/lib/descriptions';
import message from 'antd/lib/message';
import Slider from 'antd/lib/slider';
import Space from 'antd/lib/space';
import Tooltip from 'antd/lib/tooltip';
import React from 'react';
import { SketchPicker } from 'react-color';
import * as THREE from 'three';
import { cookMeshMaterial } from '../../../engine';
import { useViewerStateStore } from '../../../stores';
import { useInterval } from '../../../types';
import { i18nFormat } from '../../../utils';
import { Divider, Switch } from '../../decorators';
export const RenderOptionsPanel = ({}) => {
    const [showModelColorPicker, setShowModelColorPicker] = React.useState(false);
    const [showBgColorPicker, setShowBgColorPicker] = React.useState(false);
    const [camPos, setCamPos] = React.useState(new THREE.Vector3());
    const viewerStateStore = useViewerStateStore();
    useInterval(() => {
        const camPos = U.get(viewerStateStore, v => v.threeRenderer.context.camPos);
        if (camPos) {
            setCamPos(new THREE.Vector3(camPos.x, camPos.y, camPos.z));
        }
    }, 1000);
    const { threeRenderer, modelColor, backgroundColor, withMaterialedMesh, withWireframe, withBoundingBox, withClipping, withPlane, withAxisHelper, } = viewerStateStore;
    if (!threeRenderer || !threeRenderer.context) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement("div", { className: "rmv-drawer-panel" },
        React.createElement("div", { className: "rmv-drawer-panel-header" },
            React.createElement("span", null, i18nFormat('渲染参数')),
            React.createElement(Space, null,
                React.createElement(Tooltip, { overlay: i18nFormat('保存为默认配置'), placement: "left" },
                    React.createElement(SaveOutlined, { onClick: () => {
                            localStorage.setItem('rmv-renderer-options', JSON.stringify({
                                camPos: { x: camPos.x, y: camPos.y, z: camPos.z },
                                modelColor,
                                backgroundColor,
                                withMaterialedMesh,
                                withWireframe,
                                withBoundingBox,
                                withClipping,
                                withPlane,
                                withAxisHelper,
                            }));
                            message.success(i18nFormat('保存成功'));
                        } })),
                React.createElement(CloseOutlined, { onClick: () => {
                        viewerStateStore.setPartialState({
                            isRenderOptionsPanelVisible: false,
                        });
                    } }))),
        React.createElement(Divider, null),
        React.createElement("div", { className: "rmv-drawer-panel-body" },
            React.createElement(Descriptions, { title: i18nFormat('可视项'), column: 2 },
                React.createElement(Descriptions.Item, { label: i18nFormat('着色') },
                    React.createElement(Switch, { id: `withMaterialedMesh-${threeRenderer.id}`, checked: withMaterialedMesh, onColor: "#1890ff", onChange: e => {
                            if (e.target.checked) {
                                threeRenderer.setupMaterialedMesh();
                            }
                            else {
                                threeRenderer.removeMaterialedMesh();
                            }
                        } })),
                React.createElement(Descriptions.Item, { label: i18nFormat('线框') },
                    React.createElement(Switch, { id: `withWireframe-${threeRenderer.id}`, checked: withWireframe, onColor: "#1890ff", onChange: e => {
                            if (e.target.checked) {
                                threeRenderer.setupWireframe();
                            }
                            else {
                                threeRenderer.removeWireFrame();
                            }
                        } })),
                React.createElement(Descriptions.Item, { label: i18nFormat('包围盒') },
                    React.createElement(Switch, { id: `withBoundingBox-${threeRenderer.id}`, checked: withBoundingBox, onColor: "#1890ff", onChange: e => {
                            if (e.target.checked) {
                                threeRenderer.setupBoundingBox();
                            }
                            else {
                                threeRenderer.removeBoundingBox();
                            }
                        } })),
                React.createElement(Descriptions.Item, { label: i18nFormat('平面') },
                    React.createElement(Switch, { id: `withPlane-${threeRenderer.id}`, checked: withPlane, onColor: "#1890ff", onChange: e => {
                            if (e.target.checked) {
                                threeRenderer.setupPlane();
                            }
                            else {
                                threeRenderer.removePlane();
                            }
                        } })),
                React.createElement(Descriptions.Item, { label: i18nFormat('坐标系') },
                    React.createElement(Switch, { id: `withAxisHelper-${threeRenderer.id}`, checked: withAxisHelper, onColor: "#1890ff", onChange: e => {
                            if (e.target.checked) {
                                threeRenderer.setupAxisHelper();
                            }
                            else {
                                threeRenderer.removeAxisHelper();
                            }
                        } }))),
            React.createElement(Descriptions, { title: i18nFormat('摄像机'), column: 1 },
                camPos && (React.createElement(Descriptions.Item, { label: i18nFormat('视角') }, `${U.toFixedNumber(camPos.x, 4)},${U.toFixedNumber(camPos.y, 4)},${U.toFixedNumber(camPos.z, 4)}`)),
                React.createElement(Descriptions.Item, { label: i18nFormat('亮度') },
                    React.createElement(Slider, { range: true, defaultValue: [20, 50], style: { width: 150 } }))),
            React.createElement(Descriptions, { title: i18nFormat('剖切'), column: 1 },
                React.createElement(Descriptions.Item, { label: i18nFormat('X 轴剖切') },
                    React.createElement(Switch, { id: `withClipping-${threeRenderer.id}`, checked: withClipping, onColor: "#1890ff", onChange: e => {
                            viewerStateStore.setPartialState({
                                withClipping: e.target.checked,
                            });
                            threeRenderer.changeMaterial(cookMeshMaterial(e.target.checked, modelColor));
                        } }))),
            React.createElement(Descriptions, { title: i18nFormat('效果'), column: 1 },
                React.createElement(Descriptions.Item, { label: i18nFormat('模型色') }, showModelColorPicker ? (React.createElement(SketchPicker, { color: modelColor, onChange: ({ hex }) => {
                        viewerStateStore.setPartialState({
                            modelColor: hex,
                        });
                        threeRenderer.changeMaterial(cookMeshMaterial(withClipping, hex));
                    } })) : (React.createElement("span", null,
                    viewerStateStore.modelColor,
                    React.createElement(Button, { type: "link", onClick: () => {
                            setShowModelColorPicker(true);
                        } }, i18nFormat('切换'))))),
                React.createElement(Descriptions.Item, { label: i18nFormat('背景色') }, showBgColorPicker ? (React.createElement(SketchPicker, { color: backgroundColor, onChange: ({ hex }) => {
                        threeRenderer.changeBackgroundColor(hex);
                    } })) : (React.createElement("span", null,
                    viewerStateStore.backgroundColor,
                    React.createElement(Button, { type: "link", onClick: () => {
                            setShowBgColorPicker(true);
                        } }, i18nFormat('切换'))))),
                React.createElement(Descriptions.Item, { label: i18nFormat('线框色') }, showModelColorPicker ? (React.createElement(SketchPicker, { color: modelColor, onChange: ({ hex }) => {
                        viewerStateStore.setPartialState({
                            modelColor: hex,
                        });
                        threeRenderer.changeMaterial(cookMeshMaterial(withClipping, hex));
                    } })) : (React.createElement("span", null,
                    viewerStateStore.modelColor,
                    React.createElement(Button, { type: "link", onClick: () => {
                            setShowModelColorPicker(true);
                        } }, i18nFormat('切换'))))),
                React.createElement(Descriptions.Item, { label: i18nFormat('粗糙度') },
                    React.createElement(Slider, { range: true, defaultValue: [20, 50], style: { width: 150 } })),
                React.createElement(Descriptions.Item, { label: i18nFormat('金属感') },
                    React.createElement(Slider, { range: true, defaultValue: [20, 50], style: { width: 150 } }))))));
};
RenderOptionsPanel.displayName = 'RenderOptionsPanel';
//# sourceMappingURL=index.js.map