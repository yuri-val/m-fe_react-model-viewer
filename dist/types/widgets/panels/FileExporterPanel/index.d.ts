import React from 'react';
export interface FileExporterPanelProps {
    className?: string;
    style?: Record<string, string | number>;
    children?: React.ReactNode;
}
export declare const FileExporterPanel: {
    ({ className, style, children, }: FileExporterPanelProps): JSX.Element;
    displayName: string;
};
