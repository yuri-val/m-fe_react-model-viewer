import './index.css';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../../utils';
import { Holdable } from '../../decorators/Holdable';
export const Joystick = ({ threeRenderer }) => {
    return (React.createElement(ErrorBoundary, { FallbackComponent: ErrorFallback },
        React.createElement("div", { className: "rmv-sv-joystick" },
            React.createElement("div", { className: "rmv-sv-joystick-center", onClick: () => {
                    threeRenderer.resetCamera();
                } }),
            React.createElement(Holdable, { finite: false, onPress: () => {
                    threeRenderer.moveUp();
                } },
                React.createElement("div", { className: "rmv-gmv-attr-joystick-arrow rmv-gmv-attr-joystick-arrow-up", style: { top: 0 } },
                    React.createElement("i", null))),
            React.createElement(Holdable, { finite: false, onPress: () => {
                    threeRenderer.moveDown();
                } },
                React.createElement("div", { className: "rmv-gmv-attr-joystick-arrow rmv-gmv-attr-joystick-arrow-down", style: { bottom: 0 } },
                    React.createElement("i", null))),
            React.createElement(Holdable, { finite: false, onPress: () => {
                    threeRenderer.moveLeft();
                } },
                React.createElement("div", { className: "rmv-gmv-attr-joystick-arrow rmv-gmv-attr-joystick-arrow-left" },
                    React.createElement("i", null))),
            React.createElement(Holdable, { finite: false, onPress: () => {
                    threeRenderer.moveRight();
                } },
                React.createElement("div", { className: "rmv-gmv-attr-joystick-arrow rmv-gmv-attr-joystick-arrow-right" },
                    React.createElement("i", null))))));
};
Joystick.displayName = 'Joystick';
//# sourceMappingURL=index.js.map