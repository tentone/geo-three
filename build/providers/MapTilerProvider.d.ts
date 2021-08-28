import { MapProvider } from './MapProvider';
export declare class MapTilerProvider extends MapProvider {
    apiKey: string;
    format: string;
    category: string;
    style: string;
    resolution: number;
    constructor(apiKey: any, category: any, style: any, format: any);
    fetchTile(zoom: number, x: number, y: number): Promise<any>;
}
