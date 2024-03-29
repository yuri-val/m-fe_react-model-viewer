import { CloseOutlined } from '@ant-design/icons';
import * as U from '@m-fe/utils';
import { isLanIp } from '@m-fe/utils';
import Descriptions from 'antd/lib/descriptions';
import React from 'react';
import { useViewerStateStore } from '../../../stores';
import { i18nFormat } from '../../../utils';
import { Divider } from '../../decorators';
export const ModelAttrPanel = ({ className, style, children, }) => {
    const viewerStateStore = useViewerStateStore();
    const { threeRenderer, unit } = viewerStateStore;
    if (!threeRenderer || !threeRenderer.context) {
        return React.createElement(React.Fragment, null);
    }
    const { topology, viewerProps } = threeRenderer.context;
    return (React.createElement("div", { className: "rmv-drawer-panel" },
        React.createElement("div", { className: "rmv-drawer-panel-header" },
            React.createElement("span", null, U.get(threeRenderer, r => r.viewerProps.fileName)),
            React.createElement(CloseOutlined, { onClick: () => {
                    viewerStateStore.setPartialState({ isAttrPanelVisible: false });
                } })),
        React.createElement(Divider, null),
        React.createElement("div", { className: "rmv-drawer-panel-body" },
            React.createElement(Descriptions, { title: i18nFormat('尺寸'), column: 1 },
                React.createElement(Descriptions.Item, { label: i18nFormat('体积') },
                    topology.volume ? topology.volume.toFixed(2) : 0,
                    " ",
                    unit),
                React.createElement(Descriptions.Item, { label: i18nFormat('面积') },
                    topology.area ? topology.area.toFixed(2) : 0,
                    " ",
                    unit),
                React.createElement(Descriptions.Item, { label: i18nFormat('包围盒') },
                    topology.sizeX ? topology.sizeX.toFixed(2) : 0,
                    "*",
                    topology.sizeY ? topology.sizeY.toFixed(2) : 0,
                    "*",
                    topology.sizeZ ? topology.sizeZ.toFixed(2) : 0,
                    " ",
                    unit)),
            React.createElement(Descriptions, { title: i18nFormat('拓扑'), column: 1 },
                React.createElement(Descriptions.Item, { label: i18nFormat('面片') }, `${topology.triangleCnt}`),
                React.createElement(Descriptions.Item, { label: i18nFormat('顶点') }, `${topology.vertexCnt || '-'}`),
                React.createElement(Descriptions.Item, { label: i18nFormat('边') }, `${topology.edgeCnt || '-'}`)),
            React.createElement(Descriptions, { title: i18nFormat('其他'), column: 1 },
                React.createElement(Descriptions.Item, { label: i18nFormat('来源') }, typeof viewerProps.src === 'string' && isLanIp(viewerProps.src)
                    ? i18nFormat('内网')
                    : i18nFormat('公网'))))));
};
ModelAttrPanel.displayName = 'ModelAttrPanel';
//# sourceMappingURL=index.js.map