"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelAttrPanel = void 0;
const tslib_1 = require("tslib");
const icons_1 = require("@ant-design/icons");
const U = (0, tslib_1.__importStar)(require("@m-fe/utils"));
const utils_1 = require("@m-fe/utils");
const descriptions_1 = (0, tslib_1.__importDefault)(require("antd/lib/descriptions"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const stores_1 = require("../../../stores");
const utils_2 = require("../../../utils");
const decorators_1 = require("../../decorators");
const ModelAttrPanel = ({ className, style, children, }) => {
    const viewerStateStore = (0, stores_1.useViewerStateStore)();
    const { threeRenderer, unit } = viewerStateStore;
    if (!threeRenderer || !threeRenderer.context) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    const { topology, viewerProps } = threeRenderer.context;
    return (react_1.default.createElement("div", { className: "rmv-drawer-panel" },
        react_1.default.createElement("div", { className: "rmv-drawer-panel-header" },
            react_1.default.createElement("span", null, U.get(threeRenderer, r => r.viewerProps.fileName)),
            react_1.default.createElement(icons_1.CloseOutlined, { onClick: () => {
                    viewerStateStore.setPartialState({ isAttrPanelVisible: false });
                } })),
        react_1.default.createElement(decorators_1.Divider, null),
        react_1.default.createElement("div", { className: "rmv-drawer-panel-body" },
            react_1.default.createElement(descriptions_1.default, { title: (0, utils_2.i18nFormat)('尺寸'), column: 1 },
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_2.i18nFormat)('体积') },
                    topology.volume ? topology.volume.toFixed(2) : 0,
                    " ",
                    unit),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_2.i18nFormat)('面积') },
                    topology.area ? topology.area.toFixed(2) : 0,
                    " ",
                    unit),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_2.i18nFormat)('包围盒') },
                    topology.sizeX ? topology.sizeX.toFixed(2) : 0,
                    "*",
                    topology.sizeY ? topology.sizeY.toFixed(2) : 0,
                    "*",
                    topology.sizeZ ? topology.sizeZ.toFixed(2) : 0,
                    " ",
                    unit)),
            react_1.default.createElement(descriptions_1.default, { title: (0, utils_2.i18nFormat)('拓扑'), column: 1 },
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_2.i18nFormat)('面片') }, `${topology.triangleCnt}`),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_2.i18nFormat)('顶点') }, `${topology.vertexCnt || '-'}`),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_2.i18nFormat)('边') }, `${topology.edgeCnt || '-'}`)),
            react_1.default.createElement(descriptions_1.default, { title: (0, utils_2.i18nFormat)('其他'), column: 1 },
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_2.i18nFormat)('来源') }, typeof viewerProps.src === 'string' && (0, utils_1.isLanIp)(viewerProps.src)
                    ? (0, utils_2.i18nFormat)('内网')
                    : (0, utils_2.i18nFormat)('公网'))))));
};
exports.ModelAttrPanel = ModelAttrPanel;
exports.ModelAttrPanel.displayName = 'ModelAttrPanel';
//# sourceMappingURL=index.js.map