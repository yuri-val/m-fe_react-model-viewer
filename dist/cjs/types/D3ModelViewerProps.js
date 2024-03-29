"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeD3ModelViewerProps = exports.defaultModelViewerProps = exports.D3ModelViewerWidgets = exports.D3ModelTypes = void 0;
const tslib_1 = require("tslib");
const U = (0, tslib_1.__importStar)(require("@m-fe/utils"));
const utils_1 = require("../utils");
exports.D3ModelTypes = [
    'stl',
    'obj',
    'stp',
    'step',
    '3dm',
    '3ds',
    '3mf',
    'cob',
    'blender',
    'dxf',
    'ply',
    'x3d',
    'gitf',
    'gltf',
    'glb',
    'igs',
    'iges',
    'fbx',
    '3dxml',
    'catpart',
    'x_t',
    'x_b',
];
exports.D3ModelViewerWidgets = [
    'languageSelector',
    'attrPanel',
    'captureImage',
    'joystick',
    'colorPicker',
];
exports.defaultModelViewerProps = {
    compressType: 'none',
    customOptions: {
        unit: 'mm',
        externalAttr: {},
    },
    layoutOptions: {
        width: 600,
        height: 400,
        layoutType: window.innerWidth > 600 ? 'pc' : 'mobile',
        widgets: exports.D3ModelViewerWidgets,
    },
    renderOptions: {
        theme: 'default',
        modelColor: 'rgb(179,179,179)',
        backgroundColor: 'rgb(55,65,92)',
        withMesh: true,
        withCameraControls: true,
        withPlane: true,
        withAxisHelper: true,
        withMaterialedMesh: true,
        autoplay: true,
        shadowIntensity: 0,
        autoRotate: false,
        autoCapture: false,
        cameraX: 0,
        cameraY: 0,
        cameraZ: 0,
    },
};
/** 合并 Props */
const mergeD3ModelViewerProps = ({ currentProps, originProps = exports.defaultModelViewerProps, }) => {
    const finalProps = Object.assign(Object.assign(Object.assign({}, (originProps || {})), (currentProps || {})), { customOptions: Object.assign(Object.assign({}, (originProps.customOptions || {})), (currentProps.customOptions || {})), layoutOptions: Object.assign(Object.assign({}, (originProps.layoutOptions || {})), (currentProps.layoutOptions || {})), renderOptions: Object.assign(Object.assign({}, (originProps.renderOptions || {})), (currentProps.renderOptions || {})) });
    if (!finalProps.fileName && typeof finalProps.src === 'string') {
        finalProps.fileName = U.getFileNameFromUrl(finalProps.src);
    }
    finalProps.type = `${finalProps.type || (0, utils_1.getModelType)(finalProps.fileName, undefined)}`.toLowerCase();
    // 判断结尾是否有 zlib，如果有，则先设置为 zlib
    if ((finalProps.fileName || '').endsWith('zlib')) {
        finalProps.compressType = 'zlib';
    }
    if (!finalProps.compressType) {
        finalProps.compressType = (0, utils_1.getModelCompressType)(finalProps.fileName, finalProps.src);
    }
    return finalProps;
};
exports.mergeD3ModelViewerProps = mergeD3ModelViewerProps;
//# sourceMappingURL=D3ModelViewerProps.js.map