import { MapProvider } from './MapProvider';
import { Color } from 'three';
export declare class HeightDebugProvider extends MapProvider {
    provider: MapProvider;
    fromColor: Color;
    toColor: Color;
    constructor(provider: any);
    fetchTile(zoom: number, x: number, y: number): Promise<any>;
}
