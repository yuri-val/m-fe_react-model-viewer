"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperPanel = void 0;
const tslib_1 = require("tslib");
const icons_1 = require("@ant-design/icons");
const U = (0, tslib_1.__importStar)(require("@m-fe/utils"));
const antd_1 = require("antd");
const descriptions_1 = (0, tslib_1.__importDefault)(require("antd/lib/descriptions"));
const message_1 = (0, tslib_1.__importDefault)(require("antd/lib/message"));
const space_1 = (0, tslib_1.__importDefault)(require("antd/lib/space"));
const tooltip_1 = (0, tslib_1.__importDefault)(require("antd/lib/tooltip"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const THREE = (0, tslib_1.__importStar)(require("three"));
const stores_1 = require("../../../stores");
const types_1 = require("../../../types");
const utils_1 = require("../../../utils");
const decorators_1 = require("../../decorators");
const OperPanel = ({}) => {
    const [showModelColorPicker, setShowModelColorPicker] = react_1.default.useState(false);
    const [showBgColorPicker, setShowBgColorPicker] = react_1.default.useState(false);
    const [camPos, setCamPos] = react_1.default.useState(new THREE.Vector3());
    const viewerStateStore = (0, stores_1.useViewerStateStore)();
    (0, types_1.useInterval)(() => {
        const camPos = U.get(viewerStateStore, v => v.threeRenderer.context.camPos);
        if (camPos) {
            setCamPos(new THREE.Vector3(camPos.x, camPos.y, camPos.z));
        }
    }, 1000);
    const { threeRenderer, modelColor, backgroundColor, withMaterialedMesh, withWireframe, withBoundingBox, withClipping, withPlane, withAxisHelper, } = viewerStateStore;
    if (!threeRenderer || !threeRenderer.context) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement("div", { className: "rmv-drawer-panel" },
        react_1.default.createElement("div", { className: "rmv-drawer-panel-header" },
            react_1.default.createElement("span", null, (0, utils_1.i18nFormat)('拓扑编辑')),
            react_1.default.createElement(space_1.default, null,
                react_1.default.createElement(tooltip_1.default, { overlay: (0, utils_1.i18nFormat)('保存为默认配置'), placement: "left" },
                    react_1.default.createElement(icons_1.SaveOutlined, { onClick: () => {
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
                            message_1.default.success((0, utils_1.i18nFormat)('保存成功'));
                        } })),
                react_1.default.createElement(icons_1.CloseOutlined, { onClick: () => {
                        viewerStateStore.setPartialState({
                            isOperPanelVisible: false,
                        });
                    } }))),
        react_1.default.createElement(decorators_1.Divider, null),
        react_1.default.createElement("div", { className: "rmv-drawer-panel-body" },
            react_1.default.createElement(descriptions_1.default, { title: (0, utils_1.i18nFormat)('Translate'), column: 2 },
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('X') },
                    react_1.default.createElement(antd_1.InputNumber, { size: "small" })),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('Y') },
                    react_1.default.createElement(antd_1.InputNumber, { size: "small" })),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('Z') },
                    react_1.default.createElement(antd_1.InputNumber, { size: "small" }))),
            react_1.default.createElement(descriptions_1.default, { title: (0, utils_1.i18nFormat)('Rotate'), column: 2 },
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('X') },
                    react_1.default.createElement(antd_1.Slider, { min: 0, max: 360 })),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('Y') },
                    react_1.default.createElement(antd_1.Slider, { min: 0, max: 360 })),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('Z') },
                    react_1.default.createElement(antd_1.Slider, { min: 0, max: 360 }))))));
};
exports.OperPanel = OperPanel;
exports.OperPanel.displayName = 'OperPanel';
//# sourceMappingURL=index.js.map