"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileImporter = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importStar)(require("react"));
const utils_1 = require("../../../../../utils");
const FileImporter = ({ className, style, threeRenderer, compressType, }) => {
    const fileRef = (0, react_1.useRef)();
    return (react_1.default.createElement("span", { onClick: () => {
            if (fileRef.current) {
                fileRef.current.click();
            }
        } },
        (0, utils_1.i18nFormat)('打开本地文件'),
        compressType && `(${compressType})`,
        react_1.default.createElement("span", { style: { display: 'none' } },
            react_1.default.createElement("input", { ref: fileRef, id: "file", type: "file", onChange: async () => {
                    const file = fileRef.current.files[0];
                    threeRenderer.init({
                        src: file,
                        fileName: file.name,
                        type: undefined,
                        compressType,
                    });
                } }))));
};
exports.FileImporter = FileImporter;
exports.FileImporter.displayName = 'FileImporter';
//# sourceMappingURL=index.js.map