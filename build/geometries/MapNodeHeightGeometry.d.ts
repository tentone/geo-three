import { BufferGeometry } from 'three';
export declare class MapNodeHeightGeometry extends BufferGeometry {
    constructor(width?: number, height?: number, widthSegments?: number, heightSegments?: number, skirt?: boolean, skirtDepth?: number, imageData?: ImageData, calculateNormals?: boolean);
    computeNormals(widthSegments: number, heightSegments: number): void;
}
