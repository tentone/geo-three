/**
 * Open tile map server tile provider.
 *
 * API Reference
 *  - https://openmaptiles.org/
 *
 * @class OpenMapTilesProvider
 */
class OpenMapTilesProvider extends MapProvider {
 constructor(address) {
     super();

     /**
      * Map server address.
      *
      * By default the open OSM tile server is used.
      * 
      * @attribute address
      * @type {String}
      */
     this.address = address;

     /**
      * Map image tile format.
      * 
      * @attribute format
      * @type {String}
      */
     this.format = "png";

     /**
      * Map tile theme, some of the styles available.
      * - dark-matter
      * - klokantech-basic
      * - osm-bright
      * - positron
      * 
      * @attribute theme
      * @type {String}
      */
     this.theme = "klokantech-basic";
 }

 getMetaData() {
     const self = this;
     const address = this.address + "styles/" + this.theme + ".json";
     
     FileUtils.readFile(address, false, undefined, function(data)
     {
         const meta = JSON.parse(data);
         
         self.name = meta.name;
         self.format = meta.format;
         self.minZoom = meta.minZoom;
         self.maxZoom = meta.maxZoom;
         self.bounds = meta.bounds;
         self.center = meta.center;
     });
 }

 fetchTile(zoom, x, y) {
     return this.address + "styles/" + this.theme + "/" + zoom + "/" + x + "/" + y + "." + this.format;
 }
}