# Geo-Three

- Library to display maps using `three.js`. Allows for full world scale visualization of geographic data using tile based chunks.
- Can generate 3D geometry for terrain from terrain height data using software generated tiles or using GPU displacement maps.
- Supports multiple maps service providers ([BingMaps](https://www.microsoft.com/en-us/maps), [GoogleMaps](https://developers.google.com/maps/documentation), [HereMaps](https://developer.here.com/), [MapBox](https://docs.mapbox.com/api/), [MapTiler](https://www.maptiler.com/), [OpenMapTiles](https://openmaptiles.org/), [OpenStreetMaps](https://www.openstreetmap.org/)).
  - Each one of these map providers require a developer account and a API configuration to be used.
  - Its possible to implement new provides using the `MapProvider` interface.
  - Providers should have a tile based map system to be supported by the library.




### Usage

- To add the library to your project get the library trough NPM alongside with three.js and use it as a ES module.
- You can also include the library directly in you webpage but ensure first that THREE is available globally.

```javascript
// Create a map tiles provider object
var provider = new OpenStreetMapsProvider();

// Create the map view and add it to your THREE scene
var map = new MapView(MapView.PLANAR, provider);
scene.add(map);
```



### Data Providers

- The library as support for multiple data providers that have to be configured beforehand. Most of these data providers rely on external API that differ from service to service.
- Each one of them has its own provider object implementation of the `MapProvider` interface.

- The debug provider provides information about the 



### License

- Project uses a MIT license that allow for commercial usage of the platform without any cost.
- The license is available on the project GitHub page

