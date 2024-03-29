import './index.css';
import { ThreeRenderer } from '../../../engine';
export interface JoystickProps {
    className?: string;
    style?: Record<string, string | number>;
    threeRenderer: ThreeRenderer;
}
export declare const Joystick: {
    ({ threeRenderer }: JoystickProps): JSX.Element;
    displayName: string;
};
