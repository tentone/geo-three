import { MapProvider } from './MapProvider';
export declare class OpenStreetMapsProvider extends MapProvider {
    address: string;
    format: string;
    constructor(address?: string);
    fetchTile(zoom: number, x: number, y: number): Promise<any>;
}
