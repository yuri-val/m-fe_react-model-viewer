/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import './index.css';
import { ellipsis, genId, get, isLanIp } from '@m-fe/utils';
import Tooltip from 'antd/lib/tooltip';
import React from 'react';
import { SketchPicker } from 'react-color';
import { ErrorBoundary } from 'react-error-boundary';
import Loader from 'react-loader-spinner';
import { cookMeshMaterial, ObjectSnapshotGenerator, ThreeRenderer, } from '../../engine';
import { withViewerStateStore } from '../../stores';
import { getInitialStateFromProps, mergeD3ModelViewerProps, } from '../../types';
import { ErrorFallback, getLocale, i18nFormat, isSupportThreejsLoader, setLocale, } from '../../utils';
import { Joystick, Switch } from '../../widgets';
export class WebGLViewerComp extends React.Component {
    constructor() {
        super(...arguments);
        this.getDom = () => {
            return get('', () => this.$ref.current || document.getElementById('webgl-container'));
        };
        this.id = genId();
        this.$ref = React.createRef();
    }
    get mixedProps() {
        return Object.assign(Object.assign({}, mergeD3ModelViewerProps({ currentProps: this.props })), { viewerStateStore: this.props.viewerStateStore });
    }
    get threeRenderer() {
        return this.props.viewerStateStore.threeRenderer;
    }
    componentDidMount() {
        this.props.viewerStateStore.setPartialState(getInitialStateFromProps(this.mixedProps));
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
        const threeRenderer = new ThreeRenderer(props, {
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
        return (React.createElement(ErrorBoundary, { FallbackComponent: props => (React.createElement("div", { style: { height: 150 } },
                React.createElement(ErrorFallback, Object.assign({}, props)))) },
            React.createElement("div", { id: "webgl-container", className: "rmv-sv-webgl", ref: this.$ref, style: Object.assign({ width, height }, style) }, !hasModelFileLoaded ? (React.createElement(ErrorBoundary, { FallbackComponent: ErrorFallback },
                React.createElement("div", { style: {
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    } },
                    React.createElement(Loader, { type: "Puff", color: "#00BFFF", height: 100, width: 100 })))) : (React.createElement(React.Fragment, null)))));
    }
    renderAttr() {
        const { fileName, src, customOptions: { unit }, viewerStateStore, } = this.mixedProps;
        const { threeRenderer } = viewerStateStore;
        if (!threeRenderer) {
            return React.createElement(Loader, { type: "Puff", color: "#00BFFF", height: 100, width: 100 });
        }
        const { isAttrPanelVisible } = viewerStateStore;
        const { topology } = threeRenderer.context;
        return isAttrPanelVisible && topology ? (React.createElement(ErrorBoundary, { FallbackComponent: ErrorFallback },
            React.createElement("div", { className: "rmv-gmv-attr-modal" },
                React.createElement("div", { className: "rmv-gmv-attr-modal-row" },
                    fileName && (React.createElement("div", { className: "item" },
                        i18nFormat('名称'),
                        "\uFF1A",
                        `${ellipsis(fileName)}`)),
                    React.createElement("div", { className: "item" },
                        i18nFormat('尺寸'),
                        "\uFF1A",
                        topology.sizeX ? topology.sizeX.toFixed(2) : 0,
                        "*",
                        topology.sizeY ? topology.sizeY.toFixed(2) : 0,
                        "*",
                        topology.sizeZ ? topology.sizeZ.toFixed(2) : 0,
                        " ",
                        unit),
                    React.createElement("div", { className: "item" },
                        i18nFormat('体积'),
                        "\uFF1A",
                        topology.volume ? topology.volume.toFixed(2) : 0,
                        " ",
                        unit,
                        React.createElement("sup", null, "3"))),
                React.createElement("div", { className: "rmv-gmv-attr-modal-row" },
                    React.createElement("div", { className: "item" },
                        i18nFormat('面积'),
                        "\uFF1A",
                        topology.area ? topology.area.toFixed(2) : 0,
                        " ",
                        unit,
                        React.createElement("sup", null, "2")),
                    React.createElement("div", { className: "item" },
                        i18nFormat('面片'),
                        "\uFF1A",
                        `${topology.triangleCnt}`),
                    React.createElement("div", { className: "item" },
                        i18nFormat('来源'),
                        "\uFF1A",
                        typeof src === 'string' && isLanIp(src)
                            ? i18nFormat('内网')
                            : i18nFormat('公网')))))) : (React.createElement(React.Fragment, null));
    }
    renderLoose() {
        const { layoutOptions: { width, widgets }, viewerStateStore, } = this.mixedProps;
        const { modelColor, isColorPickerVisible, withMaterialedMesh, withWireframe, withBoundingBox, withClipping, } = viewerStateStore;
        return (React.createElement("div", { className: "rmv-sv-container rmv-sv-loose-container", style: { width } },
            isColorPickerVisible ? (React.createElement(ErrorBoundary, { FallbackComponent: ErrorFallback },
                React.createElement("div", { className: "rmv-sv-color-picker" },
                    React.createElement(SketchPicker, { color: modelColor, onChange: ({ hex }) => {
                            this.props.viewerStateStore.setPartialState({
                                modelColor: hex,
                            });
                            this.threeRenderer.changeMaterial(cookMeshMaterial(withClipping, modelColor));
                        } })))) : (React.createElement(React.Fragment, null)),
            React.createElement("div", { className: "rmv-sv-toolbar", style: { width: widgets.includes('languageSelector') ? 150 : 100 } },
                React.createElement("div", { className: "rmv-sv-toolbar-item" },
                    React.createElement("label", { htmlFor: `withMaterialedMesh-${this.id}` },
                        i18nFormat('着色'),
                        "\uFF1A"),
                    React.createElement(Switch, { id: `withMaterialedMesh-${this.id}`, checked: withMaterialedMesh, onChange: e => {
                            if (e.target.checked) {
                                this.threeRenderer.setupMaterialedMesh();
                            }
                            else {
                                this.threeRenderer.removeMaterialedMesh();
                            }
                        } })),
                React.createElement("div", { className: "rmv-sv-toolbar-item" },
                    React.createElement("label", { htmlFor: `withWireframe-${this.id}` },
                        i18nFormat('线框'),
                        "\uFF1A"),
                    React.createElement(Switch, { id: `withWireframe-${this.id}`, checked: withWireframe, onChange: e => {
                            if (e.target.checked) {
                                this.threeRenderer.setupWireframe();
                            }
                            else {
                                this.threeRenderer.removeWireFrame();
                            }
                        } })),
                React.createElement("div", { className: "rmv-sv-toolbar-item" },
                    React.createElement("label", { htmlFor: `withBoundingBox-${this.id}` },
                        i18nFormat('框体'),
                        "\uFF1A"),
                    React.createElement(Switch, { id: `withBoundingBox-${this.id}`, checked: withBoundingBox, onChange: e => {
                            if (e.target.checked) {
                                this.threeRenderer.setupBoundingBox();
                            }
                            else {
                                this.threeRenderer.removeBoundingBox();
                            }
                        } })),
                React.createElement("div", { className: "rmv-sv-toolbar-item" },
                    React.createElement("label", { htmlFor: `withColorPicker-${this.id}` },
                        i18nFormat('色盘'),
                        "\uFF1A"),
                    React.createElement(Switch, { id: `withColorPicker-${this.id}`, checked: isColorPickerVisible, onChange: e => {
                            this.props.viewerStateStore.setPartialState({
                                isColorPickerVisible: e.target.checked,
                            });
                        } })),
                React.createElement("div", { className: "rmv-sv-toolbar-item" },
                    React.createElement("label", { htmlFor: `withClipping-${this.id}` },
                        i18nFormat('剖切'),
                        "\uFF1A"),
                    React.createElement(Switch, { id: `withClipping-${this.id}`, checked: withClipping, onChange: e => {
                            this.props.viewerStateStore.setPartialState({
                                withClipping: e.target.checked,
                            });
                            this.threeRenderer.changeMaterial(cookMeshMaterial(withClipping, modelColor));
                        } })),
                React.createElement("div", { className: "rmv-sv-toolbar-item" },
                    React.createElement("label", { htmlFor: `withLanguageSelector-${this.id}` }, "\u4E2D/EN\uFF1A"),
                    React.createElement(Switch, { id: `withLanguageSelector-${this.id}`, checked: getLocale() === 'en', onChange: e => {
                            if (e.target.checked) {
                                setLocale('en');
                            }
                            else {
                                setLocale('zh');
                            }
                        } })),
                React.createElement("div", { className: "rmv-sv-toolbar-item" },
                    React.createElement("label", { htmlFor: `isFreshViewEnabled-${this.id}` }, "\u7B80\u7EA6\uFF1A"),
                    React.createElement(Switch, { id: `isFreshViewEnabled-${this.id}`, checked: get(this.threeRenderer, r => r.context.theme === 'fresh'), onChange: () => {
                            this.threeRenderer.changeTheme('fresh');
                        } })),
                widgets.includes('joystick') && (React.createElement(Joystick, { threeRenderer: this.threeRenderer }))),
            this.renderAttr(),
            this.renderWebGL()));
    }
    render() {
        const { type, style, layoutOptions: { width, height, layoutType, widgets }, viewerStateStore, onSnapshot, } = this.mixedProps;
        const { withMaterialedMesh, withWireframe, withBoundingBox, withClipping, modelColor, isColorPickerVisible, } = viewerStateStore;
        // 如果出现异常
        if (!isSupportThreejsLoader(type) && !this.mixedProps.mesh) {
            return (React.createElement("div", { className: "rmv-sv-container", style: {
                    width,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                } },
                React.createElement("div", { className: "rmv-sv-webgl", ref: this.$ref, style: Object.assign({ width,
                        height, display: 'flex', justifyContent: 'center', alignItems: 'center' }, style) }, i18nFormat('该类型暂不支持预览'))));
        }
        if (layoutType === 'pc') {
            // 宽松方式，即左右布局
            return this.renderLoose();
        }
        // 非宽松方式，即上下布局
        return (React.createElement("div", { className: "rmv-sv-container rmv-sv-compact-container", style: { width } },
            isColorPickerVisible && (React.createElement("div", { className: "rmv-sv-color-picker", style: { bottom: -8, background: 'none', top: 'unset' } },
                React.createElement(SketchPicker, { color: modelColor, onChange: ({ hex }) => {
                        this.props.viewerStateStore.setPartialState({
                            modelColor: hex,
                        });
                        this.threeRenderer.changeMaterial(cookMeshMaterial(withClipping, modelColor));
                    } }))),
            React.createElement("div", { className: "rmv-sv-toolbar" },
                React.createElement("div", { className: "rmv-sv-toolbar-left" },
                    React.createElement("div", { className: "rmv-sv-toolbar-item" },
                        React.createElement(Switch, { id: `withMaterialedMesh-${this.id}`, checked: withMaterialedMesh, onChange: e => {
                                if (e.target.checked) {
                                    this.threeRenderer.setupMaterialedMesh();
                                }
                                else {
                                    this.threeRenderer.removeMaterialedMesh();
                                }
                            } }),
                        React.createElement("label", { htmlFor: `withMaterialedMesh-${this.id}` }, i18nFormat('着色'))),
                    React.createElement("div", { className: "rmv-sv-toolbar-item" },
                        React.createElement(Switch, { id: `withWireframe-${this.id}`, checked: withWireframe, onChange: e => {
                                if (e.target.checked) {
                                    this.threeRenderer.setupWireframe();
                                }
                                else {
                                    this.threeRenderer.removeWireFrame();
                                }
                            } }),
                        React.createElement("label", { htmlFor: `withWireframe-${this.id}` }, i18nFormat('线框'))),
                    React.createElement("div", { className: "rmv-sv-toolbar-item" },
                        React.createElement(Switch, { id: `withBoundingBox-${this.id}`, checked: withBoundingBox, onChange: e => {
                                if (e.target.checked) {
                                    this.threeRenderer.setupBoundingBox();
                                }
                                else {
                                    this.threeRenderer.removeBoundingBox();
                                }
                            } }),
                        React.createElement("label", { htmlFor: `withBoundingBox-${this.id}` }, i18nFormat('框体'))),
                    React.createElement("div", { className: "rmv-sv-toolbar-item" },
                        React.createElement(Switch, { id: `withColorPicker-${this.id}`, checked: isColorPickerVisible, onChange: e => {
                                this.props.viewerStateStore.setPartialState({
                                    isColorPickerVisible: e.target.checked,
                                });
                            } }),
                        React.createElement("label", { htmlFor: `withColorPicker-${this.id}` }, i18nFormat('色盘'))),
                    React.createElement("div", { className: "rmv-sv-toolbar-item" },
                        React.createElement(Switch, { id: `withClipping-${this.id}`, checked: withClipping, onChange: e => {
                                this.props.viewerStateStore.setPartialState({
                                    withClipping: e.target.checked,
                                });
                                this.threeRenderer.changeMaterial(cookMeshMaterial(withClipping, modelColor));
                            } }),
                        React.createElement("label", { htmlFor: `withClipping-${this.id}` }, i18nFormat('剖切'))),
                    React.createElement("div", { className: "rmv-sv-toolbar-item" },
                        React.createElement(Switch, { id: `withLanguageSelector-${this.id}`, checked: getLocale() === 'en', onChange: e => {
                                if (e.target.checked) {
                                    setLocale('en');
                                }
                                else {
                                    setLocale('zh');
                                }
                            } }),
                        React.createElement("label", { htmlFor: `withLanguageSelector-${this.id}` }, "\u4E2D/EN")),
                    React.createElement("div", { className: "rmv-sv-toolbar-item" },
                        React.createElement("label", { htmlFor: `isFreshViewEnabled-${this.id}` }, "\u7B80\u7EA6\uFF1A"),
                        React.createElement(Switch, { id: `isFreshViewEnabled-${this.id}`, checked: get(this.threeRenderer, r => r.context.theme === 'fresh'), onChange: () => {
                                this.threeRenderer.changeTheme('fresh');
                            } }))),
                React.createElement("div", { className: "rmv-sv-toolbar-right" }, onSnapshot && widgets.includes('captureImage') && (React.createElement(Tooltip, { placement: "left", overlay: i18nFormat('点击生成截图') },
                    React.createElement("svg", { viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", "p-id": "671", width: "20px", height: "20px", style: { cursor: 'pointer' }, onClick: () => {
                            const context = this.threeRenderer.context;
                            try {
                                new ObjectSnapshotGenerator(context.mesh, context.camera, context.renderer, (dataUrl) => {
                                    onSnapshot(dataUrl);
                                });
                            }
                            catch (_) {
                                console.error(_);
                            }
                        } },
                        React.createElement("path", { d: "M970.88 803.2V375.04a98.56 98.56 0 0 0-97.92-97.92h-152.32L696.32 192a64 64 0 0 0-64-43.52H393.6a64 64 0 0 0-64 43.52l-26.24 84.48H151.04A97.92 97.92 0 0 0 53.12 375.04v428.8a97.92 97.92 0 0 0 97.92 97.92h721.92a98.56 98.56 0 0 0 97.92-98.56z m-64 0a33.92 33.92 0 0 1-33.92 33.92H151.04a33.92 33.92 0 0 1-33.92-33.92V375.04a33.92 33.92 0 0 1 33.92-33.92h176.64A32 32 0 0 0 359.04 320L384 211.2a14.08 14.08 0 0 1 7.04 0h243.84L665.6 320a32 32 0 0 0 30.72 23.68h176.64a33.92 33.92 0 0 1 33.92 33.92z", fill: "#ffffff", "p-id": "672" }),
                        React.createElement("path", { d: "M284.16 423.04H209.28a16 16 0 0 0 0 32h74.88a16 16 0 0 0 0-32zM512 384a188.16 188.16 0 1 0 188.16 192A188.8 188.8 0 0 0 512 384z m0 345.6A156.16 156.16 0 1 1 668.16 576 156.8 156.8 0 0 1 512 729.6z", fill: "#ffffff", "p-id": "673" })))))),
            widgets.includes('joystick') && (React.createElement(Joystick, { threeRenderer: this.threeRenderer })),
            this.renderAttr(),
            this.renderWebGL()));
    }
}
WebGLViewerComp.displayName = 'WebGLViewer';
export const WebGLViewer = withViewerStateStore(WebGLViewerComp);
//# sourceMappingURL=index.js.map