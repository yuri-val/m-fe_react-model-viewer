"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Holdable = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importStar)(require("react"));
class Holdable extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isPressed: false,
        };
        this.onMouseDown = () => {
            this.clearTimeout();
            this.longPressTimeout = setTimeout(this.onPressStart, this.props.startTimeout);
        };
        this.onMouseOut = () => {
            this.clearTimeout();
            if (this.isCurrentlyPressed()) {
                this.setState({
                    isPressed: false,
                });
            }
        };
        this.clearTimeout = () => {
            clearTimeout(this.longPressTimeout);
            clearInterval(this.pressInterval);
            this.longPressTimeout = undefined;
            this.pressInterval = undefined;
        };
        this.isCurrentlyPressed = () => this.state.isPressed;
        this.onPressStart = () => {
            this.props.onPressStart();
            // When inifite call the timeout for regular period
            if (!this.props.finite) {
                this.props.onPress();
                this.pressInterval = setInterval(this.props.onPress, this.props.pressCallbackTimeout);
            }
            else if (this.props.finite) {
                this.pressInterval = setTimeout(this.longPressEnd, this.props.pressCallbackTimeout);
            }
            this.setState({
                isPressed: true,
            });
        };
        this.longPressEnd = () => {
            this.onMouseOut();
            this.props.longPressEnd();
        };
    }
    render() {
        return (react_1.default.createElement("div", { className: `${this.props.className}`, onTouchStart: this.onMouseDown, onTouchEnd: this.onMouseOut, onMouseOut: this.onMouseOut, onMouseDown: this.onMouseDown, onMouseUp: this.onMouseOut, onClick: this.props.onPress }, this.props.children));
    }
}
exports.Holdable = Holdable;
Holdable.defaultProps = {
    startTimeout: 300,
    onPressStart: () => { },
    longPressEnd: () => { },
    pressCallbackTimeout: 100,
    onPress: undefined,
    finite: true,
    className: '',
};
//# sourceMappingURL=index.js.map