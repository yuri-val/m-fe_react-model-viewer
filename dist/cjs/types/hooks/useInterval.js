"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInterval = void 0;
const react_1 = require("react");
const useInterval = (callback, delay, runImmediate = true, label) => {
    const savedCallback = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        savedCallback.current = callback;
    }, [callback]);
    (0, react_1.useEffect)(() => {
        const handler = (...args) => savedCallback.current(...args);
        if (runImmediate) {
            handler();
        }
        if (delay !== null) {
            const id = setInterval(() => {
                handler();
            }, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};
exports.useInterval = useInterval;
//# sourceMappingURL=useInterval.js.map