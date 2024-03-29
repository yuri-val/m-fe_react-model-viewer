"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapshotClipViewer = void 0;
const tslib_1 = require("tslib");
require("cropperjs/dist/cropper.min.css");
require("./index.css");
const button_1 = (0, tslib_1.__importDefault)(require("antd/lib/button"));
const divider_1 = (0, tslib_1.__importDefault)(require("antd/lib/divider"));
const space_1 = (0, tslib_1.__importDefault)(require("antd/lib/space"));
const react_1 = (0, tslib_1.__importStar)(require("react"));
const react_cropper_1 = (0, tslib_1.__importDefault)(require("react-cropper"));
const stores_1 = require("../../../stores");
const utils_1 = require("../../../utils");
const SnapshotClipViewer = ({}) => {
    const store = (0, stores_1.useViewerStateStore)();
    const [clipImgUrl, setClipImgUrl] = (0, react_1.useState)('');
    const cropperRef = (0, react_1.useRef)(null);
    const onClipImageUrl = () => {
        var _a;
        const imageElement = cropperRef === null || cropperRef === void 0 ? void 0 : cropperRef.current;
        const cropper = imageElement === null || imageElement === void 0 ? void 0 : imageElement.cropper;
        setClipImgUrl((_a = cropper === null || cropper === void 0 ? void 0 : cropper.getCroppedCanvas()) === null || _a === void 0 ? void 0 : _a.toDataURL('image/png'));
    };
    (0, react_1.useEffect)(() => {
        if (store.snapshotDataUrl && store.snapshotDataUrl.length > 0) {
            onClipImageUrl();
        }
    }, [store.snapshotDataUrl]);
    if (!store.snapshotDataUrl) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement("div", { className: "rmv-drawer-panel ", style: { width: '80%' } },
        react_1.default.createElement("div", { className: "snapshot-clip-viewer" },
            react_1.default.createElement(react_cropper_1.default, { src: store.snapshotDataUrl, style: { height: 300, width: 300 }, viewMode: 3, dragMode: 'move', initialAspectRatio: 1, guides: true, crop: onClipImageUrl, ref: cropperRef }),
            react_1.default.createElement("div", { style: { marginLeft: 16, display: 'flex', flexDirection: 'column' } },
                react_1.default.createElement("img", { src: clipImgUrl, style: { width: '300px', height: '300px', objectFit: 'contain' }, alt: (0, utils_1.i18nFormat)('截图预览') }))),
        react_1.default.createElement(divider_1.default, null),
        react_1.default.createElement(space_1.default, { size: 0, align: "center", style: { display: 'flex', justifyContent: 'center' } },
            react_1.default.createElement(button_1.default, { type: "link" }, (0, utils_1.i18nFormat)('保存')),
            react_1.default.createElement(button_1.default, { type: "link", onClick: () => {
                    const image = clipImgUrl.replace('image/png', 'image/octet-stream');
                    const link = document.createElement('a');
                    link.download = 'my-image.png';
                    link.href = image;
                    link.click();
                } }, (0, utils_1.i18nFormat)('下载')),
            react_1.default.createElement(button_1.default, { type: "link", onClick: () => {
                    store.setPartialState({ snapshotDataUrl: undefined });
                } }, (0, utils_1.i18nFormat)('关闭')))));
};
exports.SnapshotClipViewer = SnapshotClipViewer;
//# sourceMappingURL=index.js.map