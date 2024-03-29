import React from 'react';
export interface SettingsPanelProps {
    className?: string;
    style?: Record<string, string | number>;
    children?: React.ReactNode;
}
export declare const SettingsPanel: {
    ({ className, style, children, }: SettingsPanelProps): JSX.Element;
    displayName: string;
};
