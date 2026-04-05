export declare abstract class MapProvider {
    name: string;
    minZoom: number;
    maxZoom: number;
    bounds: number[];
    center: number[];
    fetchTile(zoom: number, x: number, y: number): Promise<any>;
    fetchTileBuffer(zoom: number, x: number, y: number): Promise<ArrayBuffer | null>;
    getMetaData(): Promise<void>;
}
