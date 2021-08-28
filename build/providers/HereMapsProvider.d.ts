import { MapProvider } from './MapProvider';
export declare class HereMapsProvider extends MapProvider {
    static PATH: string;
    appId: string;
    appCode: string;
    style: string;
    scheme: string;
    format: string;
    size: number;
    version: string;
    server: number;
    constructor(appId: string, appCode: string, style: string, scheme: string, format: string, size: number);
    nextServer(): void;
    getMetaData(): void;
    fetchTile(zoom: number, x: number, y: number): Promise<any>;
}
