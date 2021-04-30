# Geo-Three

[![npm version](https://badge.fury.io/js/geo-three.svg)](https://badge.fury.io/js/geo-three)[![GitHub version](https://badge.fury.io/gh/tentone%2Fgeo-three.svg)](https://badge.fury.io/gh/tentone%2Fgeo-three)

- Library to display maps using `three.js`. Allows for full world scale visualization of geographic data using tile based chunks.
- Can generate 3D geometry for terrain from terrain height data using software generated tiles or using GPU displacement maps.
- Supports multiple maps service providers ([BingMaps](https://www.microsoft.com/en-us/maps), [GoogleMaps](https://developers.google.com/maps/documentation), [HereMaps](https://developer.here.com/), [MapBox](https://docs.mapbox.com/api/), [MapTiler](https://www.maptiler.com/), [OpenMapTiles](https://openmaptiles.org/), [OpenStreetMaps](https://www.openstreetmap.org/)).
  - Each one of these map providers require a developer account and a API configuration to be used.
  - Its possible to implement new provides using the `MapProvider` interface.
  - Providers should have a tile based map system to be supported by the library.
 - You can test the [live demo of the library running](https://tentone.github.io/geo-three/examples/index.html) from the GitHub page.

<img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/screenshot/b.png" width="380"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/screenshot/c.png" width="380"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/screenshot/e.png" width="380"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/screenshot/d.png" width="380">



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



### Coordinates

- The project uses internally a XY [EPSG:900913](https://epsg.io/900913) coordinate format to be compatible with the XYZ coordinates used in three.js
- Use the `UnitsUtils` class to access the unit conversion methods for example to convert a latitude, longitude [WGS84](https://epsg.io/4326) pair value to XY coordinates you can use the code bellow:

```javascript
var coords = Geo.UnitsUtils.datumsToSpherical(40.940119, -8.535589);
controls.target.set(coords.x, 0, -coords.y);
```



### Tile Loading

- Tiles are fetched from the service API configured, each one of the services requires specific configuration using the specific `MapProvider` object.

- Base tiles are always loaded at the beginning of the process, then each frame a couple of rays are casted into the tile tree. The number of rays can be configured using the `MapView` `subdivisionRays` attribute.

- The distance of the ray to the camera is used to define if the node needs to simplified or sub-divided. These values can be configured using the `thresholdUp` and `thresholdDown` values.

  ​    

<img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/tiles.png" width="350">



### Data Providers

- The library has support for multiple data providers that must be configured beforehand. Most of these data providers rely on external API that differ from service to service.
- Each one of them has its own provider object implementation of the `MapProvider` interface.

- The `DebugProvider` provides information about the tiles loaded, shows the zoom level and the coordinates of the tile relative to the origin in that specific level.

<img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/bing_sat.png" width="270"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/heremaps_sat.png" width="270"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/mapbox_sat.png" width="270"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/bing_vector.png" width="270"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/heremaps_vector.png" width="270"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/mapbox_vector.png" width="270"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/osm_vector.png" width="270"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/debug.png" width="270"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/providers/mapbox_height.png" width="270">



### LOD Control

- The library includes multiple methods for LOD control, that define how tiles are subdivided or simplified.
  - Raycast: uses ray casting determine the distance of the nodes to the camera view, it only considers the nodes inside of the view frustum. It uses random sampling and takes some time to pick all nodes to be subdivided but is overall faster.
  - Radial: Calculates the distance from the camera to each one of the nodes, the nodes closer are subdivided and nodes far away are simplified a simple and effective method that considers all nodes, and provides a more consistent result.
  - Frustum: Similar to the radial mode but only nodes inside of the view frustum are considered for subdivision.
- Custom `LODControl` can be implemented by extending the `LODControl` object and implementing the `updateLOD(view, camera, renderer, scene)` method.

```javascript
export class DistanceLOD extends LODControl
{
	constructor() {super();}

	updateLOD(view, camera, renderer, scene)
	{
        // Get world position of the camera.
        var pov = new Vector3();
        camera.getWorldPosition(pov);

        view.traverse(function(node)
        {
            // Check if child in a MapNode
            if(node instanceof MapNode)
            {
                var position = new Vector3();
                node.getWorldPosition(position);
				
                // Distance between camera and tile
                var distance = pov.distanceTo(position);
                
                // Normalize distance based on tile level
                distance /= Math.pow(2, 20 - node.level);
                
                // If closer than X subdivide
                if (distance < 50)
                {
                    node.subdivide();
                }
                // If far away, simplify parent
                else if (distance > 200 node.parentNode)
                {
                    node.parentNode.simplify();
                }
            }
        });
	}
}
```



### Tiles Map Nodes

- `MapNode` objects are used to define how the tiles should be represented in the space. `MapNode` are organized hierarchically, every node implements the MapNode class that is based on the THREE.Mesh class (every map node has a visual representation as a mesh).
- The library has support for both planar and spherical representation of tiles. Most providers only have planar tiles available.
  - It is required that the tiles for spherical mode are previously adjusted, since planar tiles get more stretched as closer you get to the poles.

<img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/planar.png" width="350"><img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/spherical.png" width="350">

- There are available formats for GPU shader generated geometry using height data directly from the providers. 
  - GPU generated geometry is more dense, more detailed and a lot faster. But the final geometry used is not accessible for ray casting, so interaction with these geometries is limited.
- On the left the geometry was generated in CPU and on the right the geometry was displaced directly in the vertex shader.

<img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/shader.jpg" width="600">



### Custom Data Providers

- It is possible to create new data providers to access data other tile sources. New data sources have to provide access to the rasterized tile as a compatible DOM element (e.g. [Image](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement), [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement), ...)
- Custom providers have to extend the base `MapProvider` class and implement the `fetchTile(zoom, x, y)` method that returns a `Promise` with access to the tile data.
- Bellow is an implementation of a provider to access [OpenStreetMaps](https://www.openstreetmap.org/) tile data using the [Tile API](https://wiki.openstreetmap.org/wiki/Tiles) the provider simply loads the URL data into a image element.
- These methods are called directly by nodes being loaded into the scene. These should be always asynchronous and should avoid any blocking actions.

```javascript
export class OpenStreetMapsProvider extends MapProvider
{
	constructor(address) {super();}

	fetchTile(zoom, x, y)
	{
		return new Promise((resolve, reject) =>
		{
			var image = document.createElement("img");
			image.onload = function(){resolve(image);};
			image.onerror = function(){reject();};
			image.crossOrigin = "Anonymous";
			image.src = "https://a.tile.openstreetmap.org/" + zoom + "/" + x + "/" + y + ".png";
		});
	}
}
```

- Tiles coordinates for each zoom level are counted from the left-top corner sequentially across the tiles.
- Different API's might use different methods to index these tiles (e.g. [Bing maps](https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system) uses a different indexing method).
  - These coordinates need to be adapted to ensure correct loading when using this library.

<img src="https://raw.githubusercontent.com/tentone/geo-three/master/readme/coords.png" width="600">

- It is also possible to create fictional tiles without any external API to generate tiles by writing data directly into a canvas or even using a local image database to draw the map.
- The code bellow shows how to implement a tile provided that draws a gradient from blue to red based on the zoom level of the tile with 16x16 pixels. This example can be used as basis for other code based tile generators.

```javascript
import {Color} from "three";

export class BlueToRedProvider extends MapProvider
{
	fetchTile(zoom, x, y)
	{
		const canvas = new OffscreenCanvas(16, 16);
		const context = canvas.getContext('2d');
		
		const blue = new Color(0x0000FF);
		const red = new Color(0xFF0000);
		const color = blue.lerpHSL(red, (zoom - this.minZoom) / (this.maxZoom - this.minZoom));
		
		context.fillStyle = color.getStyle();
		context.fillRect(0, 0, 16, 16);
		return Promise.resolve(canvas);
	}
}
```



### License

- Project uses a MIT license that allow for commercial usage of the platform without any cost.
- The license is available on the project GitHub page

