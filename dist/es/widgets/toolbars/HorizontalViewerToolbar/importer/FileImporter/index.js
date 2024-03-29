import React, { useRef } from 'react';
import { i18nFormat } from '../../../../../utils';
export const FileImporter = ({ className, style, threeRenderer, compressType, }) => {
    const fileRef = useRef();
    return (React.createElement("span", { onClick: () => {
            if (fileRef.current) {
                fileRef.current.click();
            }
        } },
        i18nFormat('打开本地文件'),
        compressType && `(${compressType})`,
        React.createElement("span", { style: { display: 'none' } },
            React.createElement("input", { ref: fileRef, id: "file", type: "file", onChange: async () => {
                    const file = fileRef.current.files[0];
                    threeRenderer.init({
                        src: file,
                        fileName: file.name,
                        type: undefined,
                        compressType,
                    });
                } }))));
};
FileImporter.displayName = 'FileImporter';
//# sourceMappingURL=index.js.map