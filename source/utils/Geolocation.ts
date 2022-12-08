/**
 * Geolocation is used to represent a position in earth using WGS84 Datum units.
 */
export class Geolocation {
    /**
     * Latitude in degrees. Range from -90° to 90°.
     */
    public latitude: number;

    /**
     * Latitude in degrees. Range from -180° to 180°.
     */
    public longitude: number;

    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}