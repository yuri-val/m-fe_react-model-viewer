import './index.css';
import { ThreeRenderer } from '../../../engine';
export interface ViewerToolbarProps {
    className?: string;
    style?: Record<string, string | number>;
    threeRenderer: ThreeRenderer;
}
export declare const HorizontalViewerToolbar: {
    ({ className, style, threeRenderer, }: ViewerToolbarProps): JSX.Element;
    displayName: string;
};
