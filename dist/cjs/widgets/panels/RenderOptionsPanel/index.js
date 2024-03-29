"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderOptionsPanel = void 0;
const tslib_1 = require("tslib");
const icons_1 = require("@ant-design/icons");
const U = (0, tslib_1.__importStar)(require("@m-fe/utils"));
const button_1 = (0, tslib_1.__importDefault)(require("antd/lib/button"));
const descriptions_1 = (0, tslib_1.__importDefault)(require("antd/lib/descriptions"));
const message_1 = (0, tslib_1.__importDefault)(require("antd/lib/message"));
const slider_1 = (0, tslib_1.__importDefault)(require("antd/lib/slider"));
const space_1 = (0, tslib_1.__importDefault)(require("antd/lib/space"));
const tooltip_1 = (0, tslib_1.__importDefault)(require("antd/lib/tooltip"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_color_1 = require("react-color");
const THREE = (0, tslib_1.__importStar)(require("three"));
const engine_1 = require("../../../engine");
const stores_1 = require("../../../stores");
const types_1 = require("../../../types");
const utils_1 = require("../../../utils");
const decorators_1 = require("../../decorators");
const RenderOptionsPanel = ({}) => {
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
            react_1.default.createElement("span", null, (0, utils_1.i18nFormat)('渲染参数')),
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
                            isRenderOptionsPanelVisible: false,
                        });
                    } }))),
        react_1.default.createElement(decorators_1.Divider, null),
        react_1.default.createElement("div", { className: "rmv-drawer-panel-body" },
            react_1.default.createElement(descriptions_1.default, { title: (0, utils_1.i18nFormat)('可视项'), column: 2 },
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('着色') },
                    react_1.default.createElement(decorators_1.Switch, { id: `withMaterialedMesh-${threeRenderer.id}`, checked: withMaterialedMesh, onColor: "#1890ff", onChange: e => {
                            if (e.target.checked) {
                                threeRenderer.setupMaterialedMesh();
                            }
                            else {
                                threeRenderer.removeMaterialedMesh();
                            }
                        } })),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('线框') },
                    react_1.default.createElement(decorators_1.Switch, { id: `withWireframe-${threeRenderer.id}`, checked: withWireframe, onColor: "#1890ff", onChange: e => {
                            if (e.target.checked) {
                                threeRenderer.setupWireframe();
                            }
                            else {
                                threeRenderer.removeWireFrame();
                            }
                        } })),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('包围盒') },
                    react_1.default.createElement(decorators_1.Switch, { id: `withBoundingBox-${threeRenderer.id}`, checked: withBoundingBox, onColor: "#1890ff", onChange: e => {
                            if (e.target.checked) {
                                threeRenderer.setupBoundingBox();
                            }
                            else {
                                threeRenderer.removeBoundingBox();
                            }
                        } })),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('平面') },
                    react_1.default.createElement(decorators_1.Switch, { id: `withPlane-${threeRenderer.id}`, checked: withPlane, onColor: "#1890ff", onChange: e => {
                            if (e.target.checked) {
                                threeRenderer.setupPlane();
                            }
                            else {
                                threeRenderer.removePlane();
                            }
                        } })),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('坐标系') },
                    react_1.default.createElement(decorators_1.Switch, { id: `withAxisHelper-${threeRenderer.id}`, checked: withAxisHelper, onColor: "#1890ff", onChange: e => {
                            if (e.target.checked) {
                                threeRenderer.setupAxisHelper();
                            }
                            else {
                                threeRenderer.removeAxisHelper();
                            }
                        } }))),
            react_1.default.createElement(descriptions_1.default, { title: (0, utils_1.i18nFormat)('摄像机'), column: 1 },
                camPos && (react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('视角') }, `${U.toFixedNumber(camPos.x, 4)},${U.toFixedNumber(camPos.y, 4)},${U.toFixedNumber(camPos.z, 4)}`)),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('亮度') },
                    react_1.default.createElement(slider_1.default, { range: true, defaultValue: [20, 50], style: { width: 150 } }))),
            react_1.default.createElement(descriptions_1.default, { title: (0, utils_1.i18nFormat)('剖切'), column: 1 },
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('X 轴剖切') },
                    react_1.default.createElement(decorators_1.Switch, { id: `withClipping-${threeRenderer.id}`, checked: withClipping, onColor: "#1890ff", onChange: e => {
                            viewerStateStore.setPartialState({
                                withClipping: e.target.checked,
                            });
                            threeRenderer.changeMaterial((0, engine_1.cookMeshMaterial)(e.target.checked, modelColor));
                        } }))),
            react_1.default.createElement(descriptions_1.default, { title: (0, utils_1.i18nFormat)('效果'), column: 1 },
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('模型色') }, showModelColorPicker ? (react_1.default.createElement(react_color_1.SketchPicker, { color: modelColor, onChange: ({ hex }) => {
                        viewerStateStore.setPartialState({
                            modelColor: hex,
                        });
                        threeRenderer.changeMaterial((0, engine_1.cookMeshMaterial)(withClipping, hex));
                    } })) : (react_1.default.createElement("span", null,
                    viewerStateStore.modelColor,
                    react_1.default.createElement(button_1.default, { type: "link", onClick: () => {
                            setShowModelColorPicker(true);
                        } }, (0, utils_1.i18nFormat)('切换'))))),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('背景色') }, showBgColorPicker ? (react_1.default.createElement(react_color_1.SketchPicker, { color: backgroundColor, onChange: ({ hex }) => {
                        threeRenderer.changeBackgroundColor(hex);
                    } })) : (react_1.default.createElement("span", null,
                    viewerStateStore.backgroundColor,
                    react_1.default.createElement(button_1.default, { type: "link", onClick: () => {
                            setShowBgColorPicker(true);
                        } }, (0, utils_1.i18nFormat)('切换'))))),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('线框色') }, showModelColorPicker ? (react_1.default.createElement(react_color_1.SketchPicker, { color: modelColor, onChange: ({ hex }) => {
                        viewerStateStore.setPartialState({
                            modelColor: hex,
                        });
                        threeRenderer.changeMaterial((0, engine_1.cookMeshMaterial)(withClipping, hex));
                    } })) : (react_1.default.createElement("span", null,
                    viewerStateStore.modelColor,
                    react_1.default.createElement(button_1.default, { type: "link", onClick: () => {
                            setShowModelColorPicker(true);
                        } }, (0, utils_1.i18nFormat)('切换'))))),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('粗糙度') },
                    react_1.default.createElement(slider_1.default, { range: true, defaultValue: [20, 50], style: { width: 150 } })),
                react_1.default.createElement(descriptions_1.default.Item, { label: (0, utils_1.i18nFormat)('金属感') },
                    react_1.default.createElement(slider_1.default, { range: true, defaultValue: [20, 50], style: { width: 150 } }))))));
};
exports.RenderOptionsPanel = RenderOptionsPanel;
exports.RenderOptionsPanel.displayName = 'RenderOptionsPanel';
//# sourceMappingURL=index.js.map