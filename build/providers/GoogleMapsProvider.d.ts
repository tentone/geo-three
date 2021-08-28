import { MapProvider } from './MapProvider';
export declare class GoogleMapsProvider extends MapProvider {
    apiToken: string;
    sessionToken: string;
    orientation: number;
    format: string;
    mapType: string;
    overlay: boolean;
    constructor(apiToken: string);
    createSession(): void;
    fetchTile(zoom: number, x: number, y: number): Promise<any>;
}
