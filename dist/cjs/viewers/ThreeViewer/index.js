"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreeViewer = exports.ThreeViewerComp = void 0;
const tslib_1 = require("tslib");
require("./index.css");
const utils_1 = require("@m-fe/utils");
const button_1 = (0, tslib_1.__importDefault)(require("antd/lib/button"));
const divider_1 = (0, tslib_1.__importDefault)(require("antd/lib/divider"));
const empty_1 = (0, tslib_1.__importDefault)(require("antd/lib/empty"));
const space_1 = (0, tslib_1.__importDefault)(require("antd/lib/space"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_error_boundary_1 = require("react-error-boundary");
const react_loader_spinner_1 = (0, tslib_1.__importDefault)(require("react-loader-spinner"));
const engine_1 = require("../../engine");
const stores_1 = require("../../stores");
const types_1 = require("../../types");
const utils_2 = require("../../utils");
const widgets_1 = require("../../widgets");
const BoxSpin_1 = require("../../widgets/decorators/BoxSpin");
const FileExporterPanel_1 = require("../../widgets/panels/FileExporterPanel");
const ModelAttrPanel_1 = require("../../widgets/panels/ModelAttrPanel");
const OperPanel_1 = require("../../widgets/panels/OperPanel");
const RenderOptionsPanel_1 = require("../../widgets/panels/RenderOptionsPanel");
const SettingsPanel_1 = require("../../widgets/panels/SettingsPanel");
class ThreeViewerComp extends react_1.default.Component {
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
        const persistedRendererOptionsStr = localStorage.getItem('rmv-renderer-options');
        const persistedRendererOptions = persistedRendererOptionsStr
            ? (0, utils_1.parseJson)(persistedRendererOptionsStr, {})
            : {};
        // 这里需要获取保存起来的状态值
        this.props.viewerStateStore.setPartialState(Object.assign(Object.assign({}, (0, types_1.getInitialStateFromProps)(this.mixedProps)), persistedRendererOptions));
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
    initRenderer(props = this.mixedProps) {
        if (this.threeRenderer) {
            this.threeRenderer.destroy();
        }
        const threeRenderer = new engine_1.ThreeRenderer(props, {
            getDom: this.getDom,
            getViewerState: () => this.props.viewerStateStore,
            onContextChange: (partialViewerState) => {
                if (typeof props.viewerStateStore.setPartialState === 'function') {
                    props.viewerStateStore.setPartialState(Object.assign({}, partialViewerState));
                }
                else {
                    console.log(props.viewerStateStore, props.viewerStateStore.setPartialState, partialViewerState);
                }
            },
        });
        threeRenderer.init();
        props.viewerStateStore.setPartialState({ threeRenderer });
    }
    renderWebGL() {
        const { layoutOptions: { width, height }, style, viewerStateStore, } = this.mixedProps;
        const { hasModelFileLoaded, loaderEvent, threeRenderer } = viewerStateStore;
        return (react_1.default.createElement(react_error_boundary_1.ErrorBoundary, { FallbackComponent: props => (react_1.default.createElement("div", { style: { width } },
                react_1.default.createElement(utils_2.ErrorFallback, Object.assign({}, props)))) },
            react_1.default.createElement("div", { id: "webgl-container", className: "rmv-sv-webgl", ref: this.$ref, style: Object.assign({ width, height: typeof height === 'number'
                        ? height - 40
                        : `calc(${height || '100%'} - 40px)` }, style) }, !hasModelFileLoaded ? (react_1.default.createElement(react_error_boundary_1.ErrorBoundary, { FallbackComponent: utils_2.ErrorFallback },
                react_1.default.createElement("div", { style: {
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    } }, (0, utils_1.get)(threeRenderer, () => threeRenderer.viewerProps.src) ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(BoxSpin_1.BoxSpin, null),
                    (0, utils_2.isSupportOcctLoader)((0, utils_1.get)(threeRenderer, () => threeRenderer.viewerProps.type)) ? (react_1.default.createElement("div", { style: { transform: 'translateY(32px)' } }, loaderEvent
                        ? `${(0, utils_2.i18nFormat)('CAD 解析中')}: ${loaderEvent}`
                        : (0, utils_2.i18nFormat)('CAD 文件需要加载额外解析器，请耐心等候'))) : (react_1.default.createElement("div", { style: { marginTop: 24 } }, loaderEvent)))) : (react_1.default.createElement(empty_1.default, { description: react_1.default.createElement("div", null,
                        react_1.default.createElement("div", null, (0, utils_2.i18nFormat)('请点击左上角打开文件，或使用下列演示文件')),
                        react_1.default.createElement(space_1.default, { size: 0, split: react_1.default.createElement(divider_1.default, { type: "vertical", style: { margin: 0 } }) },
                            react_1.default.createElement(button_1.default, { type: "link", onClick: () => {
                                    threeRenderer.init({
                                        src: 'https://oss-huitong-foshan-pri.oss-cn-shenzhen.aliyuncs.com/TENANT-109/model/202110/d3381eb6-08c1-4f06-9456-36edfaad6d5f/Spider_ascii.stl',
                                        fileName: 'Spider_ascii.stl',
                                        type: undefined,
                                        compressType: 'zlib',
                                    });
                                } }, (0, utils_2.i18nFormat)('STL')),
                            react_1.default.createElement(button_1.default, { type: "link", onClick: () => {
                                    threeRenderer.init({
                                        src: 'https://ufc-assets.oss-accelerate.aliyuncs.com/%E6%B5%8B%E8%AF%95%E6%A8%A1%E5%9E%8B/formats/STEP/abstract_pca.step',
                                        fileName: 'abstract_pca.step',
                                        type: undefined,
                                        compressType: 'none',
                                    });
                                } }, (0, utils_2.i18nFormat)('STEP')),
                            react_1.default.createElement(button_1.default, { type: "link", onClick: () => {
                                    threeRenderer.init({
                                        src: 'https://ufc-assets.oss-accelerate.aliyuncs.com/%E6%B5%8B%E8%AF%95%E6%A8%A1%E5%9E%8B/formats/IGES/ex1.iges',
                                        fileName: 'ex1.iges',
                                        type: undefined,
                                        compressType: 'none',
                                    });
                                } }, (0, utils_2.i18nFormat)('IGES')),
                            react_1.default.createElement(button_1.default, { type: "link", onClick: () => {
                                    threeRenderer.init({
                                        src: 'https://ufc-assets.oss-accelerate.aliyuncs.com/%E6%B5%8B%E8%AF%95%E6%A8%A1%E5%9E%8B/formats/3MF/models/dodeca_chain_loop_color.3mf',
                                        fileName: 'dodeca_chain_loop_color.3mf',
                                        type: undefined,
                                        compressType: 'none',
                                    });
                                } }, (0, utils_2.i18nFormat)('3MF')),
                            react_1.default.createElement(button_1.default, { type: "link", onClick: () => {
                                    threeRenderer.init({
                                        src: 'https://ufc-assets.oss-accelerate.aliyuncs.com/%E6%B5%8B%E8%AF%95%E6%A8%A1%E5%9E%8B/formats/OBJ/models/WusonOBJ.obj',
                                        fileName: 'WusonOBJ.obj',
                                        type: undefined,
                                        compressType: 'none',
                                    });
                                } }, (0, utils_2.i18nFormat)('OBJ')))) }))))) : (react_1.default.createElement(react_1.default.Fragment, null)))));
    }
    renderAttr() {
        const { fileName, src, customOptions: { unit }, viewerStateStore, } = this.mixedProps;
        const { threeRenderer, isAttrPanelVisible } = viewerStateStore;
        if (!threeRenderer) {
            return react_1.default.createElement(react_loader_spinner_1.default, { type: "Puff", color: "#00BFFF", height: 100, width: 100 });
        }
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
    render() {
        const { type, style, layoutOptions: { width, height, widgets }, viewerStateStore, } = this.mixedProps;
        const { threeRenderer } = viewerStateStore;
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
        return (react_1.default.createElement("div", { className: "rmv-three-viewer-container", style: { width, height: height } },
            react_1.default.createElement(widgets_1.HorizontalViewerToolbar, { threeRenderer: threeRenderer }),
            this.renderWebGL(),
            widgets.includes('joystick') && (react_1.default.createElement(widgets_1.Joystick, { threeRenderer: this.threeRenderer })),
            viewerStateStore.isAttrPanelVisible && react_1.default.createElement(ModelAttrPanel_1.ModelAttrPanel, null),
            viewerStateStore.isSettingsPanelVisible && react_1.default.createElement(SettingsPanel_1.SettingsPanel, null),
            viewerStateStore.isRenderOptionsPanelVisible && react_1.default.createElement(RenderOptionsPanel_1.RenderOptionsPanel, null),
            viewerStateStore.isOperPanelVisible && react_1.default.createElement(OperPanel_1.OperPanel, null),
            react_1.default.createElement(widgets_1.SnapshotClipViewer, null),
            react_1.default.createElement(FileExporterPanel_1.FileExporterPanel, null)));
    }
}
exports.ThreeViewerComp = ThreeViewerComp;
ThreeViewerComp.displayName = 'ThreeViewer';
exports.ThreeViewer = (0, stores_1.withViewerStateStore)(ThreeViewerComp);
//# sourceMappingURL=index.js.map