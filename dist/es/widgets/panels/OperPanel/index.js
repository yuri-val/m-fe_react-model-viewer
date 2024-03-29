import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import * as U from '@m-fe/utils';
import { InputNumber, Slider } from 'antd';
import Descriptions from 'antd/lib/descriptions';
import message from 'antd/lib/message';
import Space from 'antd/lib/space';
import Tooltip from 'antd/lib/tooltip';
import React from 'react';
import * as THREE from 'three';
import { useViewerStateStore } from '../../../stores';
import { useInterval } from '../../../types';
import { i18nFormat } from '../../../utils';
import { Divider } from '../../decorators';
export const OperPanel = ({}) => {
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
            React.createElement("span", null, i18nFormat('拓扑编辑')),
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
                            isOperPanelVisible: false,
                        });
                    } }))),
        React.createElement(Divider, null),
        React.createElement("div", { className: "rmv-drawer-panel-body" },
            React.createElement(Descriptions, { title: i18nFormat('Translate'), column: 2 },
                React.createElement(Descriptions.Item, { label: i18nFormat('X') },
                    React.createElement(InputNumber, { size: "small" })),
                React.createElement(Descriptions.Item, { label: i18nFormat('Y') },
                    React.createElement(InputNumber, { size: "small" })),
                React.createElement(Descriptions.Item, { label: i18nFormat('Z') },
                    React.createElement(InputNumber, { size: "small" }))),
            React.createElement(Descriptions, { title: i18nFormat('Rotate'), column: 2 },
                React.createElement(Descriptions.Item, { label: i18nFormat('X') },
                    React.createElement(Slider, { min: 0, max: 360 })),
                React.createElement(Descriptions.Item, { label: i18nFormat('Y') },
                    React.createElement(Slider, { min: 0, max: 360 })),
                React.createElement(Descriptions.Item, { label: i18nFormat('Z') },
                    React.createElement(Slider, { min: 0, max: 360 }))))));
};
OperPanel.displayName = 'OperPanel';
//# sourceMappingURL=index.js.map