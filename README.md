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



### Tile Loading

- Tiles are fetched from the service API configured, each on of the services requires specific configuration using the specific `MapProvider` object.

- Base tiles are always loaded at the beginning of the process, then each frame a couple of rays are casted into the tile tree. The number of rays can be configured using the `MapView` `subdivisionRays` attribute.

- The distance of the ray to the camera is used to define if the node needs to simplified or sub-divided. These values can be configured using the `thresholdUp` and `thresholdDown` values.

  ​    

<img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/tiles.png" width="280">





### Data Providers

- The library as support for multiple data providers that have to be configured beforehand. Most of these data providers rely on external API that differ from service to service.
- Each one of them has its own provider object implementation of the `MapProvider` interface.

- The debug provider provides information about the tiles loaded, shows the zoom level and the coordinates of the tile relative to the origin in that specific level.

<img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/bing_sat.png" width="280"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/heremaps_sat.png" width="280"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/mapbox_sat.png" width="280"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/bing_vector.png" width="280"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/heremaps_vector.png" width="280"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/mapbox_vector.png" width="280"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/osm_vector.png" width="280"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/debug.png" width="280"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/mapbox_height.png" width="280">

### License

- Project uses a MIT license that allow for commercial usage of the platform without any cost.
- The license is available on the project GitHub page

