import { MapProvider } from './MapProvider';
export declare class MapBoxProvider extends MapProvider {
    static ADDRESS: string;
    static STYLE: number;
    static MAP_ID: number;
    apiToken: string;
    format: string;
    useHDPI: boolean;
    mode: number;
    mapId: string;
    style: string;
    version: string;
    constructor(apiToken?: string, id?: string, mode?: number, format?: string, useHDPI?: boolean, version?: string);
    getMetaData(): void;
    fetchTile(zoom: number, x: number, y: number): Promise<any>;
}
