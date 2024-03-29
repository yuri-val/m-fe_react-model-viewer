import { CloseOutlined } from '@ant-design/icons';
import Descriptions from 'antd/lib/descriptions';
import Radio from 'antd/lib/radio';
import React from 'react';
import { useViewerStateStore } from '../../../stores';
import { getLocale, i18nFormat, setLocale } from '../../../utils';
import { Divider } from '../../decorators';
export const SettingsPanel = ({ className, style, children, }) => {
    const viewerStateStore = useViewerStateStore();
    const { threeRenderer, unit } = viewerStateStore;
    if (!threeRenderer || !threeRenderer.context) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement("div", { className: "rmv-drawer-panel" },
        React.createElement("div", { className: "rmv-drawer-panel-header" },
            React.createElement("span", null, i18nFormat('设置')),
            React.createElement(CloseOutlined, { onClick: () => {
                    viewerStateStore.setPartialState({ isSettingsPanelVisible: false });
                } })),
        React.createElement(Divider, null),
        React.createElement("div", { className: "rmv-drawer-panel-body" },
            React.createElement(Descriptions, { title: i18nFormat('个性化'), column: 1 },
                React.createElement(Descriptions.Item, { label: i18nFormat('语言') },
                    React.createElement(Radio.Group, { value: getLocale(), buttonStyle: "solid", size: "small", onChange: l => {
                            setLocale(l.target.value);
                        } },
                        React.createElement(Radio.Button, { value: "en" }, "En"),
                        React.createElement(Radio.Button, { value: "zh" }, "\u4E2D"))),
                React.createElement(Descriptions.Item, { label: i18nFormat('单位') },
                    React.createElement(Radio.Group, { value: unit, buttonStyle: "solid", size: "small" },
                        React.createElement(Radio.Button, { value: "mm" }, "mm"),
                        React.createElement(Radio.Button, { value: "cm" }, "cm"),
                        React.createElement(Radio.Button, { value: "in" }, "in"))),
                React.createElement(Descriptions.Item, { label: i18nFormat('工具栏') },
                    React.createElement(Radio.Group, { value: unit, buttonStyle: "solid", size: "small" },
                        React.createElement(Radio.Button, { value: "mm" }, i18nFormat('顶部')),
                        React.createElement(Radio.Button, { value: "cm" }, i18nFormat('底部')),
                        React.createElement(Radio.Button, { value: "in" }, i18nFormat('左侧')),
                        React.createElement(Radio.Button, { value: "in" }, i18nFormat('右侧'))))),
            React.createElement(Descriptions, { title: i18nFormat('插件'), column: 1 }),
            React.createElement("div", { style: { position: 'absolute', bottom: 16, fontSize: 12 } }, "MeshSpace | Powered by Unionfab"))));
};
SettingsPanel.displayName = 'SettingsPanel';
//# sourceMappingURL=index.js.map