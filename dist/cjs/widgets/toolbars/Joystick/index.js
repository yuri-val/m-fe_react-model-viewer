"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joystick = void 0;
const tslib_1 = require("tslib");
require("./index.css");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_error_boundary_1 = require("react-error-boundary");
const utils_1 = require("../../../utils");
const Holdable_1 = require("../../decorators/Holdable");
const Joystick = ({ threeRenderer }) => {
    return (react_1.default.createElement(react_error_boundary_1.ErrorBoundary, { FallbackComponent: utils_1.ErrorFallback },
        react_1.default.createElement("div", { className: "rmv-sv-joystick" },
            react_1.default.createElement("div", { className: "rmv-sv-joystick-center", onClick: () => {
                    threeRenderer.resetCamera();
                } }),
            react_1.default.createElement(Holdable_1.Holdable, { finite: false, onPress: () => {
                    threeRenderer.moveUp();
                } },
                react_1.default.createElement("div", { className: "rmv-gmv-attr-joystick-arrow rmv-gmv-attr-joystick-arrow-up", style: { top: 0 } },
                    react_1.default.createElement("i", null))),
            react_1.default.createElement(Holdable_1.Holdable, { finite: false, onPress: () => {
                    threeRenderer.moveDown();
                } },
                react_1.default.createElement("div", { className: "rmv-gmv-attr-joystick-arrow rmv-gmv-attr-joystick-arrow-down", style: { bottom: 0 } },
                    react_1.default.createElement("i", null))),
            react_1.default.createElement(Holdable_1.Holdable, { finite: false, onPress: () => {
                    threeRenderer.moveLeft();
                } },
                react_1.default.createElement("div", { className: "rmv-gmv-attr-joystick-arrow rmv-gmv-attr-joystick-arrow-left" },
                    react_1.default.createElement("i", null))),
            react_1.default.createElement(Holdable_1.Holdable, { finite: false, onPress: () => {
                    threeRenderer.moveRight();
                } },
                react_1.default.createElement("div", { className: "rmv-gmv-attr-joystick-arrow rmv-gmv-attr-joystick-arrow-right" },
                    react_1.default.createElement("i", null))))));
};
exports.Joystick = Joystick;
exports.Joystick.displayName = 'Joystick';
//# sourceMappingURL=index.js.map