"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorFallback = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
function ErrorFallback({ error, resetErrorBoundary, }) {
    react_1.default.useEffect(() => {
        console.log('>>>ErrorFallback>>>', error.message);
    });
    return (react_1.default.createElement("div", { role: "alert" },
        react_1.default.createElement("button", { onClick: resetErrorBoundary }, "Try again")));
}
exports.ErrorFallback = ErrorFallback;
//# sourceMappingURL=error.js.map