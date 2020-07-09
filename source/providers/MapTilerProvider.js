/**
 * Map tiler provider API.
 *
 * The map tiler server is based on open map tiles.
 *
 * API Reference
 *  - https://www.maptiler.com/
 *
 * @class MapTilerProvider
 * @param {String} apiKey
 */
class MapTilerProvider extends MapProvider {
 constructor(apiKey, type, style, format) {
     super();

     /**
      * Server API access token.
      * 
      * @attribute apiToken
      * @type {String}
      */
     this.apiKey = apiKey !== undefined ? apiKey : "";

     /**
      * Map image tile format.
      *  - png
      *  - jpg
      *
      * @attribute format
      * @type {String}
      */
     this.format = format !== undefined ? format : "png";

     /** 
      * The type of the map being provided, can be
      *  - styles For vectorial map styles
      *  - data For data map styles.
      *
      * @attribute type
      * @type {String}
      */
     this.type = type !== undefined ? type : "styles";

     /**
      * Map tile style, some of the vectorial styles available.
      * - basic
      * - bright
      * - darkmatter
      * - hybrid
      * - positron
      * - streets
      * - topo
      * - voyager
      *
      * Data styles:
      * - hillshades
      * - terrain-rgb
      * - satellite
      *
      * @attribute style
      * @type {String}
      */
     this.style = style !== undefined ? style : "klokantech-basic";
 }

 fetchTile(zoom, x, y) {
     return "https://maps.tilehosting.com/" + this.type + "/" + this.style + "/" + zoom + "/" + x + "/" + y + "." + this.format + "?key=" + this.apiKey;
 }
}