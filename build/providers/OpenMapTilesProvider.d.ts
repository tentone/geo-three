import { MapProvider } from './MapProvider';
export declare class OpenMapTilesProvider extends MapProvider {
    address: string;
    format: string;
    theme: string;
    constructor(address: string, format?: string, theme?: string);
    getMetaData(): Promise<void>;
    fetchTile(zoom: number, x: number, y: number): Promise<any>;
}
