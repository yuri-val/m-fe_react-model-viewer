"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAsyncEffect = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
function useAsyncEffect(effect, inputs, destroy) {
    const hasDestroy = typeof destroy === 'function';
    react_1.default.useEffect(function () {
        let result;
        let mounted = true;
        const maybePromise = effect(function () {
            return mounted;
        });
        Promise.resolve(maybePromise)
            .then(function (value) {
            result = value;
        })
            .catch(err => {
            console.error('>>>useAsyncEffect>>>error:', err, '>>>inputs: ', inputs);
        });
        return function () {
            mounted = false;
            if (hasDestroy) {
                destroy(result);
            }
        };
    }, inputs);
}
exports.useAsyncEffect = useAsyncEffect;
//# sourceMappingURL=useAsyncEffect.js.map