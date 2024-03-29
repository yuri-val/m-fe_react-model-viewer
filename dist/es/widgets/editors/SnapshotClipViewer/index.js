import 'cropperjs/dist/cropper.min.css';
import './index.css';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Space from 'antd/lib/space';
import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'react-cropper';
import { useViewerStateStore } from '../../../stores';
import { i18nFormat } from '../../../utils';
export const SnapshotClipViewer = ({}) => {
    const store = useViewerStateStore();
    const [clipImgUrl, setClipImgUrl] = useState('');
    const cropperRef = useRef(null);
    const onClipImageUrl = () => {
        var _a;
        const imageElement = cropperRef === null || cropperRef === void 0 ? void 0 : cropperRef.current;
        const cropper = imageElement === null || imageElement === void 0 ? void 0 : imageElement.cropper;
        setClipImgUrl((_a = cropper === null || cropper === void 0 ? void 0 : cropper.getCroppedCanvas()) === null || _a === void 0 ? void 0 : _a.toDataURL('image/png'));
    };
    useEffect(() => {
        if (store.snapshotDataUrl && store.snapshotDataUrl.length > 0) {
            onClipImageUrl();
        }
    }, [store.snapshotDataUrl]);
    if (!store.snapshotDataUrl) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement("div", { className: "rmv-drawer-panel ", style: { width: '80%' } },
        React.createElement("div", { className: "snapshot-clip-viewer" },
            React.createElement(Cropper, { src: store.snapshotDataUrl, style: { height: 300, width: 300 }, viewMode: 3, dragMode: 'move', initialAspectRatio: 1, guides: true, crop: onClipImageUrl, ref: cropperRef }),
            React.createElement("div", { style: { marginLeft: 16, display: 'flex', flexDirection: 'column' } },
                React.createElement("img", { src: clipImgUrl, style: { width: '300px', height: '300px', objectFit: 'contain' }, alt: i18nFormat('截图预览') }))),
        React.createElement(Divider, null),
        React.createElement(Space, { size: 0, align: "center", style: { display: 'flex', justifyContent: 'center' } },
            React.createElement(Button, { type: "link" }, i18nFormat('保存')),
            React.createElement(Button, { type: "link", onClick: () => {
                    const image = clipImgUrl.replace('image/png', 'image/octet-stream');
                    const link = document.createElement('a');
                    link.download = 'my-image.png';
                    link.href = image;
                    link.click();
                } }, i18nFormat('下载')),
            React.createElement(Button, { type: "link", onClick: () => {
                    store.setPartialState({ snapshotDataUrl: undefined });
                } }, i18nFormat('关闭')))));
};
//# sourceMappingURL=index.js.map