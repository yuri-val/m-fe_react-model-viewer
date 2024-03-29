import './index.css';
import { ChangeEvent } from 'react';
interface IProps {
    id: string;
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onColor?: string;
}
export declare const Switch: ({ id, checked, onChange, onColor, }: IProps) => JSX.Element;
export {};
