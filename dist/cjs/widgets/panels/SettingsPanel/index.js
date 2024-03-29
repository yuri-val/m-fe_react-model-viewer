"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsPanel = void 0;
const tslib_1 = require("tslib");
const icons_1 = require("@ant-design/icons");
const descriptions_1 = (0, tslib_1.__importDefault)(require("antd/lib/descriptions"));
const radio_1 = (0, tslib_1.__importDefault)(require("antd/lib/radio"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const stores_1 = require("../../../stores");
const utils_1 = require("../../../utils");
const decorators_1 = require("../../decorators");
const SettingsPanel = ({ className, style, children, }) => {
    const viewerStateStore = (0, stores_1.useViewerStateStore)();
    const { threeRenderer, unit } = viewerStateStore;
    if (!threeRenderer || !threeRenderer.context) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement("div", { className: "rmv-drawer-panel" },
        react_1.default.createElement("div", { className: "rmv-drawer-panel-header" },
            react_1.default.createElement("span", null, (0, utils_1.i18nFormat)('设置')),
            react_1.default.createElement(icons_1.CloseOutlined, { onClick: () => {
                    viewerStateStore.setPartialState({ isSettingsPanelVisible: false });
                } })),
        react_1.default.createElement(decorators_1.Divider, null),
        react_1.default.createElement("div", { className: "rmv-drawer-panel-body" },
            react_1.default.createElement(descriptions_1.default, { title: (0, utils_1.i18nFormat)('个性化'), column: 1 },
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('语言') },
                    react_1.default.createElement(radio_1.default.Group, { value: (0, utils_1.getLocale)(), buttonStyle: "solid", size: "small", onChange: l => {
                            (0, utils_1.setLocale)(l.target.value);
                        } },
                        react_1.default.createElement(radio_1.default.Button, { value: "en" }, "En"),
                        react_1.default.createElement(radio_1.default.Button, { value: "zh" }, "\u4E2D"))),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('单位') },
                    react_1.default.createElement(radio_1.default.Group, { value: unit, buttonStyle: "solid", size: "small" },
                        react_1.default.createElement(radio_1.default.Button, { value: "mm" }, "mm"),
                        react_1.default.createElement(radio_1.default.Button, { value: "cm" }, "cm"),
                        react_1.default.createElement(radio_1.default.Button, { value: "in" }, "in"))),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('工具栏') },
                    react_1.default.createElement(radio_1.default.Group, { value: unit, buttonStyle: "solid", size: "small" },
                        react_1.default.createElement(radio_1.default.Button, { value: "mm" }, (0, utils_1.i18nFormat)('顶部')),
                        react_1.default.createElement(radio_1.default.Button, { value: "cm" }, (0, utils_1.i18nFormat)('底部')),
                        react_1.default.createElement(radio_1.default.Button, { value: "in" }, (0, utils_1.i18nFormat)('左侧')),
                        react_1.default.createElement(radio_1.default.Button, { value: "in" }, (0, utils_1.i18nFormat)('右侧'))))),
            react_1.default.createElement(descriptions_1.default, { title: (0, utils_1.i18nFormat)('插件'), column: 1 }),
            react_1.default.createElement("div", { style: { position: 'absolute', bottom: 16, fontSize: 12 } }, "MeshSpace | Powered by Unionfab"))));
};
exports.SettingsPanel = SettingsPanel;
exports.SettingsPanel.displayName = 'SettingsPanel';
//# sourceMappingURL=index.js.map