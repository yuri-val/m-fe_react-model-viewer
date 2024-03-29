import { ThreeRenderer } from '../../../../../engine';
import { D3ModelCompressType } from '../../../../../types';
export interface FileImporterProps {
    className?: string;
    style?: Record<string, string | number>;
    threeRenderer: ThreeRenderer;
    compressType?: D3ModelCompressType;
}
export declare const FileImporter: {
    ({ className, style, threeRenderer, compressType, }: FileImporterProps): JSX.Element;
    displayName: string;
};
