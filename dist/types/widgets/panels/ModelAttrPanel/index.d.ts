import React from 'react';
export interface RendererAttrPanelProps {
    className?: string;
    style?: Record<string, string | number>;
    children?: React.ReactNode;
}
export declare const ModelAttrPanel: {
    ({ className, style, children, }: RendererAttrPanelProps): JSX.Element;
    displayName: string;
};
