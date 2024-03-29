/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import './index.css';
import { ellipsis, genId, get, isLanIp, parseJson } from '@m-fe/utils';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Empty from 'antd/lib/empty';
import Space from 'antd/lib/space';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Loader from 'react-loader-spinner';
import { ThreeRenderer } from '../../engine';
import { withViewerStateStore } from '../../stores';
import { getInitialStateFromProps, mergeD3ModelViewerProps, } from '../../types';
import { ErrorFallback, i18nFormat, isSupportOcctLoader, isSupportThreejsLoader, } from '../../utils';
import { HorizontalViewerToolbar, Joystick, SnapshotClipViewer, } from '../../widgets';
import { BoxSpin } from '../../widgets/decorators/BoxSpin';
import { FileExporterPanel } from '../../widgets/panels/FileExporterPanel';
import { ModelAttrPanel } from '../../widgets/panels/ModelAttrPanel';
import { OperPanel } from '../../widgets/panels/OperPanel';
import { RenderOptionsPanel } from '../../widgets/panels/RenderOptionsPanel';
import { SettingsPanel } from '../../widgets/panels/SettingsPanel';
export class ThreeViewerComp extends React.Component {
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
        const persistedRendererOptionsStr = localStorage.getItem('rmv-renderer-options');
        const persistedRendererOptions = persistedRendererOptionsStr
            ? parseJson(persistedRendererOptionsStr, {})
            : {};
        // 这里需要获取保存起来的状态值
        this.props.viewerStateStore.setPartialState(Object.assign(Object.assign({}, getInitialStateFromProps(this.mixedProps)), persistedRendererOptions));
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
        const threeRenderer = new ThreeRenderer(props, {
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
        return (React.createElement(ErrorBoundary, { FallbackComponent: props => (React.createElement("div", { style: { width } },
                React.createElement(ErrorFallback, Object.assign({}, props)))) },
            React.createElement("div", { id: "webgl-container", className: "rmv-sv-webgl", ref: this.$ref, style: Object.assign({ width, height: typeof height === 'number'
                        ? height - 40
                        : `calc(${height || '100%'} - 40px)` }, style) }, !hasModelFileLoaded ? (React.createElement(ErrorBoundary, { FallbackComponent: ErrorFallback },
                React.createElement("div", { style: {
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    } }, get(threeRenderer, () => threeRenderer.viewerProps.src) ? (React.createElement(React.Fragment, null,
                    React.createElement(BoxSpin, null),
                    isSupportOcctLoader(get(threeRenderer, () => threeRenderer.viewerProps.type)) ? (React.createElement("div", { style: { transform: 'translateY(32px)' } }, loaderEvent
                        ? `${i18nFormat('CAD 解析中')}: ${loaderEvent}`
                        : i18nFormat('CAD 文件需要加载额外解析器，请耐心等候'))) : (React.createElement("div", { style: { marginTop: 24 } }, loaderEvent)))) : (React.createElement(Empty, { description: React.createElement("div", null,
                        React.createElement("div", null, i18nFormat('请点击左上角打开文件，或使用下列演示文件')),
                        React.createElement(Space, { size: 0, split: React.createElement(Divider, { type: "vertical", style: { margin: 0 } }) },
                            React.createElement(Button, { type: "link", onClick: () => {
                                    threeRenderer.init({
                                        src: 'https://oss-huitong-foshan-pri.oss-cn-shenzhen.aliyuncs.com/TENANT-109/model/202110/d3381eb6-08c1-4f06-9456-36edfaad6d5f/Spider_ascii.stl',
                                        fileName: 'Spider_ascii.stl',
                                        type: undefined,
                                        compressType: 'zlib',
                                    });
                                } }, i18nFormat('STL')),
                            React.createElement(Button, { type: "link", onClick: () => {
                                    threeRenderer.init({
                                        src: 'https://ufc-assets.oss-accelerate.aliyuncs.com/%E6%B5%8B%E8%AF%95%E6%A8%A1%E5%9E%8B/formats/STEP/abstract_pca.step',
                                        fileName: 'abstract_pca.step',
                                        type: undefined,
                                        compressType: 'none',
                                    });
                                } }, i18nFormat('STEP')),
                            React.createElement(Button, { type: "link", onClick: () => {
                                    threeRenderer.init({
                                        src: 'https://ufc-assets.oss-accelerate.aliyuncs.com/%E6%B5%8B%E8%AF%95%E6%A8%A1%E5%9E%8B/formats/IGES/ex1.iges',
                                        fileName: 'ex1.iges',
                                        type: undefined,
                                        compressType: 'none',
                                    });
                                } }, i18nFormat('IGES')),
                            React.createElement(Button, { type: "link", onClick: () => {
                                    threeRenderer.init({
                                        src: 'https://ufc-assets.oss-accelerate.aliyuncs.com/%E6%B5%8B%E8%AF%95%E6%A8%A1%E5%9E%8B/formats/3MF/models/dodeca_chain_loop_color.3mf',
                                        fileName: 'dodeca_chain_loop_color.3mf',
                                        type: undefined,
                                        compressType: 'none',
                                    });
                                } }, i18nFormat('3MF')),
                            React.createElement(Button, { type: "link", onClick: () => {
                                    threeRenderer.init({
                                        src: 'https://ufc-assets.oss-accelerate.aliyuncs.com/%E6%B5%8B%E8%AF%95%E6%A8%A1%E5%9E%8B/formats/OBJ/models/WusonOBJ.obj',
                                        fileName: 'WusonOBJ.obj',
                                        type: undefined,
                                        compressType: 'none',
                                    });
                                } }, i18nFormat('OBJ')))) }))))) : (React.createElement(React.Fragment, null)))));
    }
    renderAttr() {
        const { fileName, src, customOptions: { unit }, viewerStateStore, } = this.mixedProps;
        const { threeRenderer, isAttrPanelVisible } = viewerStateStore;
        if (!threeRenderer) {
            return React.createElement(Loader, { type: "Puff", color: "#00BFFF", height: 100, width: 100 });
        }
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
    render() {
        const { type, style, layoutOptions: { width, height, widgets }, viewerStateStore, } = this.mixedProps;
        const { threeRenderer } = viewerStateStore;
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
        return (React.createElement("div", { className: "rmv-three-viewer-container", style: { width, height: height } },
            React.createElement(HorizontalViewerToolbar, { threeRenderer: threeRenderer }),
            this.renderWebGL(),
            widgets.includes('joystick') && (React.createElement(Joystick, { threeRenderer: this.threeRenderer })),
            viewerStateStore.isAttrPanelVisible && React.createElement(ModelAttrPanel, null),
            viewerStateStore.isSettingsPanelVisible && React.createElement(SettingsPanel, null),
            viewerStateStore.isRenderOptionsPanelVisible && React.createElement(RenderOptionsPanel, null),
            viewerStateStore.isOperPanelVisible && React.createElement(OperPanel, null),
            React.createElement(SnapshotClipViewer, null),
            React.createElement(FileExporterPanel, null)));
    }
}
ThreeViewerComp.displayName = 'ThreeViewer';
export const ThreeViewer = withViewerStateStore(ThreeViewerComp);
//# sourceMappingURL=index.js.map