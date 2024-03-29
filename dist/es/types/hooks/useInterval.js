import { useEffect, useRef } from 'react';
export const useInterval = (callback, delay, runImmediate = true, label) => {
    const savedCallback = useRef();
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
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
//# sourceMappingURL=useInterval.js.map