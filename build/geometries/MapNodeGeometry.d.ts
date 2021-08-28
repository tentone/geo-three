import { BufferGeometry } from 'three';
export declare class MapNodeGeometry extends BufferGeometry {
    constructor(width?: number, height?: number, widthSegments?: number, heightSegments?: number, skirt?: boolean, skirtDepth?: number);
    static buildPlane(width: number, height: number, widthSegments: number, heightSegments: number, indices: number[], vertices: number[], normals: number[], uvs: number[]): void;
    static buildSkirt(width: number, height: number, widthSegments: number, heightSegments: number, skirtDepth: number, indices: number[], vertices: number[], normals: number[], uvs: number[]): void;
}
