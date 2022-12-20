import { MapProvider } from './MapProvider';
export declare class BingMapsProvider extends MapProvider {
    static ADDRESS: string;
    maxZoom: number;
    minZoom: number;
    apiKey: string;
    type: string;
    format: string;
    mapSize: number;
    subdomain: string;
    meta: any;
    constructor(apiKey?: string, type?: string);
    static AERIAL: string;
    static ROAD: string;
    static AERIAL_LABELS: string;
    static OBLIQUE: string;
    static OBLIQUE_LABELS: string;
    getMetaData(): Promise<void>;
    static quadKey(zoom: number, x: number, y: number): string;
    fetchTile(zoom: number, x: number, y: number): Promise<any>;
}
