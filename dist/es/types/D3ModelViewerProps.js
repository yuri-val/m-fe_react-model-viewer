import * as U from '@m-fe/utils';
import { getModelCompressType, getModelType } from '../utils';
export const D3ModelTypes = [
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
export const D3ModelViewerWidgets = [
    'languageSelector',
    'attrPanel',
    'captureImage',
    'joystick',
    'colorPicker',
];
export const defaultModelViewerProps = {
    compressType: 'none',
    customOptions: {
        unit: 'mm',
        externalAttr: {},
    },
    layoutOptions: {
        width: 600,
        height: 400,
        layoutType: window.innerWidth > 600 ? 'pc' : 'mobile',
        widgets: D3ModelViewerWidgets,
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
export const mergeD3ModelViewerProps = ({ currentProps, originProps = defaultModelViewerProps, }) => {
    const finalProps = Object.assign(Object.assign(Object.assign({}, (originProps || {})), (currentProps || {})), { customOptions: Object.assign(Object.assign({}, (originProps.customOptions || {})), (currentProps.customOptions || {})), layoutOptions: Object.assign(Object.assign({}, (originProps.layoutOptions || {})), (currentProps.layoutOptions || {})), renderOptions: Object.assign(Object.assign({}, (originProps.renderOptions || {})), (currentProps.renderOptions || {})) });
    if (!finalProps.fileName && typeof finalProps.src === 'string') {
        finalProps.fileName = U.getFileNameFromUrl(finalProps.src);
    }
    finalProps.type = `${finalProps.type || getModelType(finalProps.fileName, undefined)}`.toLowerCase();
    // 判断结尾是否有 zlib，如果有，则先设置为 zlib
    if ((finalProps.fileName || '').endsWith('zlib')) {
        finalProps.compressType = 'zlib';
    }
    if (!finalProps.compressType) {
        finalProps.compressType = getModelCompressType(finalProps.fileName, finalProps.src);
    }
    return finalProps;
};
//# sourceMappingURL=D3ModelViewerProps.js.map