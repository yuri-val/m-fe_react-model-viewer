"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebGLViewer = exports.WebGLViewerComp = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
require("./index.css");
const utils_1 = require("@m-fe/utils");
const tooltip_1 = (0, tslib_1.__importDefault)(require("antd/lib/tooltip"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_color_1 = require("react-color");
const react_error_boundary_1 = require("react-error-boundary");
const react_loader_spinner_1 = (0, tslib_1.__importDefault)(require("react-loader-spinner"));
const engine_1 = require("../../engine");
const stores_1 = require("../../stores");
const types_1 = require("../../types");
const utils_2 = require("../../utils");
const widgets_1 = require("../../widgets");
class WebGLViewerComp extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.getDom = () => {
            return (0, utils_1.get)('', () => this.$ref.current || document.getElementById('webgl-container'));
        };
        this.id = (0, utils_1.genId)();
        this.$ref = react_1.default.createRef();
    }
    get mixedProps() {
        return Object.assign(Object.assign({}, (0, types_1.mergeD3ModelViewerProps)({ currentProps: this.props })), { viewerStateStore: this.props.viewerStateStore });
    }
    get threeRenderer() {
        return this.props.viewerStateStore.threeRenderer;
    }
    componentDidMount() {
        this.props.viewerStateStore.setPartialState((0, types_1.getInitialStateFromProps)(this.mixedProps));
        this.initRenderer();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.mixedProps.src ||
            nextProps.mesh !== this.mixedProps.mesh) {
            this.initRenderer(nextProps);
        }
    }
    componentWillUnmount() {
        if (this.threeRenderer) {
            this.threeRenderer.destroy();
        }
        if (this.getDom()) {
            this.getDom().remove();
        }
    }
    componentDidCatch(error) {
        console.error('>>>WebGLViewer>>>error>>>', error);
    }
    initRenderer(props = this.mixedProps) {
        if (this.threeRenderer) {
            this.threeRenderer.destroy();
        }
        const threeRenderer = new engine_1.ThreeRenderer(props, {
            getDom: this.getDom,
            getViewerState: () => this.props.viewerStateStore,
            onContextChange: (partialViewerState) => {
                this.props.viewerStateStore.setPartialState(Object.assign({}, partialViewerState));
            },
        });
        threeRenderer.init();
        this.props.viewerStateStore.setPartialState({ threeRenderer });
    }
    renderWebGL() {
        const { layoutOptions: { width, height }, style, viewerStateStore, } = this.mixedProps;
        const { hasModelFileLoaded } = viewerStateStore;
        return (react_1.default.createElement(react_error_boundary_1.ErrorBoundary, { FallbackComponent: props => (react_1.default.createElement("div", { style: { height: 150 } },
                react_1.default.createElement(utils_2.ErrorFallback, Object.assign({}, props)))) },
            react_1.default.createElement("div", { id: "webgl-container", className: "rmv-sv-webgl", ref: this.$ref, style: Object.assign({ width, height }, style) }, !hasModelFileLoaded ? (react_1.default.createElement(react_error_boundary_1.ErrorBoundary, { FallbackComponent: utils_2.ErrorFallback },
                react_1.default.createElement("div", { style: {
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    } },
                    react_1.default.createElement(react_loader_spinner_1.default, { type: "Puff", color: "#00BFFF", height: 100, width: 100 })))) : (react_1.default.createElement(react_1.default.Fragment, null)))));
    }
    renderAttr() {
        const { fileName, src, customOptions: { unit }, viewerStateStore, } = this.mixedProps;
        const { threeRenderer } = viewerStateStore;
        if (!threeRenderer) {
            return react_1.default.createElement(react_loader_spinner_1.default, { type: "Puff", color: "#00BFFF", height: 100, width: 100 });
        }
        const { isAttrPanelVisible } = viewerStateStore;
        const { topology } = threeRenderer.context;
        return isAttrPanelVisible && topology ? (react_1.default.createElement(react_error_boundary_1.ErrorBoundary, { FallbackComponent: utils_2.ErrorFallback },
            react_1.default.createElement("div", { className: "rmv-gmv-attr-modal" },
                react_1.default.createElement("div", { className: "rmv-gmv-attr-modal-row" },
                    fileName && (react_1.default.createElement("div", { className: "item" },
                        (0, utils_2.i18nFormat)('名称'),
                        "\uFF1A",
                        `${(0, utils_1.ellipsis)(fileName)}`)),
                    react_1.default.createElement("div", { className: "item" },
                        (0, utils_2.i18nFormat)('尺寸'),
                        "\uFF1A",
                        topology.sizeX ? topology.sizeX.toFixed(2) : 0,
                        "*",
                        topology.sizeY ? topology.sizeY.toFixed(2) : 0,
                        "*",
                        topology.sizeZ ? topology.sizeZ.toFixed(2) : 0,
                        " ",
                        unit),
                    react_1.default.createElement("div", { className: "item" },
                        (0, utils_2.i18nFormat)('体积'),
                        "\uFF1A",
                        topology.volume ? topology.volume.toFixed(2) : 0,
                        " ",
                        unit,
                        react_1.default.createElement("sup", null, "3"))),
                react_1.default.createElement("div", { className: "rmv-gmv-attr-modal-row" },
                    react_1.default.createElement("div", { className: "item" },
                        (0, utils_2.i18nFormat)('面积'),
                        "\uFF1A",
                        topology.area ? topology.area.toFixed(2) : 0,
                        " ",
                        unit,
                        react_1.default.createElement("sup", null, "2")),
                    react_1.default.createElement("div", { className: "item" },
                        (0, utils_2.i18nFormat)('面片'),
                        "\uFF1A",
                        `${topology.triangleCnt}`),
                    react_1.default.createElement("div", { className: "item" },
                        (0, utils_2.i18nFormat)('来源'),
                        "\uFF1A",
                        typeof src === 'string' && (0, utils_1.isLanIp)(src)
                            ? (0, utils_2.i18nFormat)('内网')
                            : (0, utils_2.i18nFormat)('公网')))))) : (react_1.default.createElement(react_1.default.Fragment, null));
    }
    renderLoose() {
        const { layoutOptions: { width, widgets }, viewerStateStore, } = this.mixedProps;
        const { modelColor, isColorPickerVisible, withMaterialedMesh, withWireframe, withBoundingBox, withClipping, } = viewerStateStore;
        return (react_1.default.createElement("div", { className: "rmv-sv-container rmv-sv-loose-container", style: { width } },
            isColorPickerVisible ? (react_1.default.createElement(react_error_boundary_1.ErrorBoundary, { FallbackComponent: utils_2.ErrorFallback },
                react_1.default.createElement("div", { className: "rmv-sv-color-picker" },
                    react_1.default.createElement(react_color_1.SketchPicker, { color: modelColor, onChange: ({ hex }) => {
                            this.props.viewerStateStore.setPartialState({
                                modelColor: hex,
                            });
                            this.threeRenderer.changeMaterial((0, engine_1.cookMeshMaterial)(withClipping, modelColor));
                        } })))) : (react_1.default.createElement(react_1.default.Fragment, null)),
            react_1.default.createElement("div", { className: "rmv-sv-toolbar", style: { width: widgets.includes('languageSelector') ? 150 : 100 } },
                react_1.default.createElement("div", { className: "rmv-sv-toolbar-item" },
                    react_1.default.createElement("label", { htmlFor: `withMaterialedMesh-${this.id}` },
                        (0, utils_2.i18nFormat)('着色'),
                        "\uFF1A"),
                    react_1.default.createElement(widgets_1.Switch, { id: `withMaterialedMesh-${this.id}`, checked: withMaterialedMesh, onChange: e => {
                            if (e.target.checked) {
                                this.threeRenderer.setupMaterialedMesh();
                            }
                            else {
                                this.threeRenderer.removeMaterialedMesh();
                            }
                        } })),
                react_1.default.createElement("div", { className: "rmv-sv-toolbar-item" },
                    react_1.default.createElement("label", { htmlFor: `withWireframe-${this.id}` },
                        (0, utils_2.i18nFormat)('线框'),
                        "\uFF1A"),
                    react_1.default.createElement(widgets_1.Switch, { id: `withWireframe-${this.id}`, checked: withWireframe, onChange: e => {
                            if (e.target.checked) {
                                this.threeRenderer.setupWireframe();
                            }
                            else {
                                this.threeRenderer.removeWireFrame();
                            }
                        } })),
                react_1.default.createElement("div", { className: "rmv-sv-toolbar-item" },
                    react_1.default.createElement("label", { htmlFor: `withBoundingBox-${this.id}` },
                        (0, utils_2.i18nFormat)('框体'),
                        "\uFF1A"),
                    react_1.default.createElement(widgets_1.Switch, { id: `withBoundingBox-${this.id}`, checked: withBoundingBox, onChange: e => {
                            if (e.target.checked) {
                                this.threeRenderer.setupBoundingBox();
                            }
                            else {
                                this.threeRenderer.removeBoundingBox();
                            }
                        } })),
                react_1.default.createElement("div", { className: "rmv-sv-toolbar-item" },
                    react_1.default.createElement("label", { htmlFor: `withColorPicker-${this.id}` },
                        (0, utils_2.i18nFormat)('色盘'),
                        "\uFF1A"),
                    react_1.default.createElement(widgets_1.Switch, { id: `withColorPicker-${this.id}`, checked: isColorPickerVisible, onChange: e => {
                            this.props.viewerStateStore.setPartialState({
                                isColorPickerVisible: e.target.checked,
                            });
                        } })),
                react_1.default.createElement("div", { className: "rmv-sv-toolbar-item" },
                    react_1.default.createElement("label", { htmlFor: `withClipping-${this.id}` },
                        (0, utils_2.i18nFormat)('剖切'),
                        "\uFF1A"),
                    react_1.default.createElement(widgets_1.Switch, { id: `withClipping-${this.id}`, checked: withClipping, onChange: e => {
                            this.props.viewerStateStore.setPartialState({
                                withClipping: e.target.checked,
                            });
                            this.threeRenderer.changeMaterial((0, engine_1.cookMeshMaterial)(withClipping, modelColor));
                        } })),
                react_1.default.createElement("div", { className: "rmv-sv-toolbar-item" },
                    react_1.default.createElement("label", { htmlFor: `withLanguageSelector-${this.id}` }, "\u4E2D/EN\uFF1A"),
                    react_1.default.createElement(widgets_1.Switch, { id: `withLanguageSelector-${this.id}`, checked: (0, utils_2.getLocale)() === 'en', onChange: e => {
                            if (e.target.checked) {
                                (0, utils_2.setLocale)('en');
                            }
                            else {
                                (0, utils_2.setLocale)('zh');
                            }
                        } })),
                react_1.default.createElement("div", { className: "rmv-sv-toolbar-item" },
                    react_1.default.createElement("label", { htmlFor: `isFreshViewEnabled-${this.id}` }, "\u7B80\u7EA6\uFF1A"),
                    react_1.default.createElement(widgets_1.Switch, { id: `isFreshViewEnabled-${this.id}`, checked: (0, utils_1.get)(this.threeRenderer, r => r.context.theme === 'fresh'), onChange: () => {
                            this.threeRenderer.changeTheme('fresh');
                        } })),
                widgets.includes('joystick') && (react_1.default.createElement(widgets_1.Joystick, { threeRenderer: this.threeRenderer }))),
            this.renderAttr(),
            this.renderWebGL()));
    }
    render() {
        const { type, style, layoutOptions: { width, height, layoutType, widgets }, viewerStateStore, onSnapshot, } = this.mixedProps;
        const { withMaterialedMesh, withWireframe, withBoundingBox, withClipping, modelColor, isColorPickerVisible, } = viewerStateStore;
        // 如果出现异常
        if (!(0, utils_2.isSupportThreejsLoader)(type) && !this.mixedProps.mesh) {
            return (react_1.default.createElement("div", { className: "rmv-sv-container", style: {
                    width,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                } },
                react_1.default.createElement("div", { className: "rmv-sv-webgl", ref: this.$ref, style: Object.assign({ width,
                        height, display: 'flex', justifyContent: 'center', alignItems: 'center' }, style) }, (0, utils_2.i18nFormat)('该类型暂不支持预览'))));
        }
        if (layoutType === 'pc') {
            // 宽松方式，即左右布局
            return this.renderLoose();
        }
        // 非宽松方式，即上下布局
        return (react_1.default.createElement("div", { className: "rmv-sv-container rmv-sv-compact-container", style: { width } },
            isColorPickerVisible && (react_1.default.createElement("div", { className: "rmv-sv-color-picker", style: { bottom: -8, background: 'none', top: 'unset' } },
                react_1.default.createElement(react_color_1.SketchPicker, { color: modelColor, onChange: ({ hex }) => {
                        this.props.viewerStateStore.setPartialState({
                            modelColor: hex,
                        });
                        this.threeRenderer.changeMaterial((0, engine_1.cookMeshMaterial)(withClipping, modelColor));
                    } }))),
            react_1.default.createElement("div", { className: "rmv-sv-toolbar" },
                react_1.default.createElement("div", { className: "rmv-sv-toolbar-left" },
                    react_1.default.createElement("div", { className: "rmv-sv-toolbar-item" },
                        react_1.default.createElement(widgets_1.Switch, { id: `withMaterialedMesh-${this.id}`, checked: withMaterialedMesh, onChange: e => {
                                if (e.target.checked) {
                                    this.threeRenderer.setupMaterialedMesh();
                                }
                                else {
                                    this.threeRenderer.removeMaterialedMesh();
                                }
                            } }),
                        react_1.default.createElement("label", { htmlFor: `withMaterialedMesh-${this.id}` }, (0, utils_2.i18nFormat)('着色'))),
                    react_1.default.createElement("div", { className: "rmv-sv-toolbar-item" },
                        react_1.default.createElement(widgets_1.Switch, { id: `withWireframe-${this.id}`, checked: withWireframe, onChange: e => {
                                if (e.target.checked) {
                                    this.threeRenderer.setupWireframe();
                                }
                                else {
                                    this.threeRenderer.removeWireFrame();
                                }
                            } }),
                        react_1.default.createElement("label", { htmlFor: `withWireframe-${this.id}` }, (0, utils_2.i18nFormat)('线框'))),
                    react_1.default.createElement("div", { className: "rmv-sv-toolbar-item" },
                        react_1.default.createElement(widgets_1.Switch, { id: `withBoundingBox-${this.id}`, checked: withBoundingBox, onChange: e => {
                                if (e.target.checked) {
                                    this.threeRenderer.setupBoundingBox();
                                }
                                else {
                                    this.threeRenderer.removeBoundingBox();
                                }
                            } }),
                        react_1.default.createElement("label", { htmlFor: `withBoundingBox-${this.id}` }, (0, utils_2.i18nFormat)('框体'))),
                    react_1.default.createElement("div", { className: "rmv-sv-toolbar-item" },
                        react_1.default.createElement(widgets_1.Switch, { id: `withColorPicker-${this.id}`, checked: isColorPickerVisible, onChange: e => {
                                this.props.viewerStateStore.setPartialState({
                                    isColorPickerVisible: e.target.checked,
                                });
                            } }),
                        react_1.default.createElement("label", { htmlFor: `withColorPicker-${this.id}` }, (0, utils_2.i18nFormat)('色盘'))),
                    react_1.default.createElement("div", { className: "rmv-sv-toolbar-item" },
                        react_1.default.createElement(widgets_1.Switch, { id: `withClipping-${this.id}`, checked: withClipping, onChange: e => {
                                this.props.viewerStateStore.setPartialState({
                                    withClipping: e.target.checked,
                                });
                                this.threeRenderer.changeMaterial((0, engine_1.cookMeshMaterial)(withClipping, modelColor));
                            } }),
                        react_1.default.createElement("label", { htmlFor: `withClipping-${this.id}` }, (0, utils_2.i18nFormat)('剖切'))),
                    react_1.default.createElement("div", { className: "rmv-sv-toolbar-item" },
                        react_1.default.createElement(widgets_1.Switch, { id: `withLanguageSelector-${this.id}`, checked: (0, utils_2.getLocale)() === 'en', onChange: e => {
                                if (e.target.checked) {
                                    (0, utils_2.setLocale)('en');
                                }
                                else {
                                    (0, utils_2.setLocale)('zh');
                                }
                            } }),
                        react_1.default.createElement("label", { htmlFor: `withLanguageSelector-${this.id}` }, "\u4E2D/EN")),
                    react_1.default.createElement("div", { className: "rmv-sv-toolbar-item" },
                        react_1.default.createElement("label", { htmlFor: `isFreshViewEnabled-${this.id}` }, "\u7B80\u7EA6\uFF1A"),
                        react_1.default.createElement(widgets_1.Switch, { id: `isFreshViewEnabled-${this.id}`, checked: (0, utils_1.get)(this.threeRenderer, r => r.context.theme === 'fresh'), onChange: () => {
                                this.threeRenderer.changeTheme('fresh');
                            } }))),
                react_1.default.createElement("div", { className: "rmv-sv-toolbar-right" }, onSnapshot && widgets.includes('captureImage') && (react_1.default.createElement(tooltip_1.default, { placement: "left", overlay: (0, utils_2.i18nFormat)('点击生成截图') },
                    react_1.default.createElement("svg", { viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", "p-id": "671", width: "20px", height: "20px", style: { cursor: 'pointer' }, onClick: () => {
                            const context = this.threeRenderer.context;
                            try {
                                new engine_1.ObjectSnapshotGenerator(context.mesh, context.camera, context.renderer, (dataUrl) => {
                                    onSnapshot(dataUrl);
                                });
                            }
                            catch (_) {
                                console.error(_);
                            }
                        } },
                        react_1.default.createElement("path", { d: "M970.88 803.2V375.04a98.56 98.56 0 0 0-97.92-97.92h-152.32L696.32 192a64 64 0 0 0-64-43.52H393.6a64 64 0 0 0-64 43.52l-26.24 84.48H151.04A97.92 97.92 0 0 0 53.12 375.04v428.8a97.92 97.92 0 0 0 97.92 97.92h721.92a98.56 98.56 0 0 0 97.92-98.56z m-64 0a33.92 33.92 0 0 1-33.92 33.92H151.04a33.92 33.92 0 0 1-33.92-33.92V375.04a33.92 33.92 0 0 1 33.92-33.92h176.64A32 32 0 0 0 359.04 320L384 211.2a14.08 14.08 0 0 1 7.04 0h243.84L665.6 320a32 32 0 0 0 30.72 23.68h176.64a33.92 33.92 0 0 1 33.92 33.92z", fill: "#ffffff", "p-id": "672" }),
                        react_1.default.createElement("path", { d: "M284.16 423.04H209.28a16 16 0 0 0 0 32h74.88a16 16 0 0 0 0-32zM512 384a188.16 188.16 0 1 0 188.16 192A188.8 188.8 0 0 0 512 384z m0 345.6A156.16 156.16 0 1 1 668.16 576 156.8 156.8 0 0 1 512 729.6z", fill: "#ffffff", "p-id": "673" })))))),
            widgets.includes('joystick') && (react_1.default.createElement(widgets_1.Joystick, { threeRenderer: this.threeRenderer })),
            this.renderAttr(),
            this.renderWebGL()));
    }
}
exports.WebGLViewerComp = WebGLViewerComp;
WebGLViewerComp.displayName = 'WebGLViewer';
exports.WebGLViewer = (0, stores_1.withViewerStateStore)(WebGLViewerComp);
//# sourceMappingURL=index.js.map