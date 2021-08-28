export declare class Martini {
    gridSize: number;
    numTriangles: number;
    numParentTriangles: number;
    indices: Uint32Array;
    coords: Uint16Array;
    constructor(gridSize?: number);
    createTile(terrain: any): Tile;
}
declare class Tile {
    martini: Martini;
    terrain: Float32Array;
    errors: Float32Array;
    constructor(terrain: Float32Array, martini: Martini);
    update(): void;
    getMesh(maxError?: number, withSkirts?: boolean): {
        vertices: any;
        triangles: any;
        numVerticesWithoutSkirts: number;
    };
}
export {};
