import './index.css';
export interface DividerProps {
    className?: string;
    style?: Record<string, string | number>;
}
export declare const Divider: {
    ({ className, style }: DividerProps): JSX.Element;
    displayName: string;
};
