import { MapProvider } from './MapProvider';
export declare class DebugProvider extends MapProvider {
    resolution: number;
    fetchTile(zoom: number, x: number, y: number): Promise<any>;
}
