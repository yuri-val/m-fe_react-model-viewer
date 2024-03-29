export declare function useAsyncEffect<V>(effect: (isMounted: () => boolean) => V | Promise<V>, inputs?: any[], destroy?: (result?: V) => void): void;
