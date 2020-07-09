/** 
 * Represents a map tile node inside of the quadtree
 * 
 * A map node can be subdivided into other nodes (Quadtree).
 * 
 * It is intended to be used as a base class for other map node implementations.
 * 
 * @class MapNode
 */
class MapNode {
 constructor(parentNode, mapView, location, level, x, y) {
     /**
      * The map view.
      *
      * @attribute mapView
      * @type {MapView}
      */
     this.mapView = mapView;

     /**
      * Parent node (from an upper tile level).
      * 
      * @attribute parentNode
      * @type {MapPlaneNode}
      */
     this.parentNode = parentNode;
     
     /**
      * Index of the map node in the quad-tree parent node.
      *
      * Position in the tree parent, can be TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT or BOTTOM_RIGHT.
      *
      * @attribute location
      * @type {Number}
      */
     this.location = location;

     /**
      * Tile level of this node.
      * 
      * @attribute level
      * @type {Number}
      */
     this.level = level;

     /**
      * Tile x position.
      * 
      * @attribute x
      * @type {Number}
      */
     this.x = x;

     /**
      * Tile y position.
      * 
      * @attribute y
      * @type {Number}
      */
     this.y = y;

     /**
      * Indicates how many children nodes where loaded.
      *
      * @attribute nodesLoaded
      * @type {Number}
      */
     this.nodesLoaded = 0;

     /** 
      * Variable to check if the node is subdivided.
      *
      * To avoid bad visibility changes on node load.
      *
      * @attribute subdivided
      * @type {Boolean}
      */
     this.subdivided = false;
 }

 /**
  * Create the child nodes to represent the next tree level.
  *
  * These nodes should be added to the object, and their transformations matrix should be updated.
  *
  * @method createChildNodes 
  */
 createChildNodes() {}

 /**
  * Subdivide node,check the maximum depth allowed for the tile provider.
  *
  * Uses the createChildNodes to actually create the child nodes that represent the next tree level.
  * 
  * @method subdivide
  */
 subdivide() {
     if(this.children.length > 0 || this.level + 1 > this.mapView.provider.maxZoom)
     {
         return;
     }

     this.subdivided = true;

     if(this.childrenCache !== null)
     {
         this.isMesh = false;
         this.children = this.childrenCache;
     }
     else
     {
         this.createChildNodes();
     }
 }

 /**
  * Simplify node, remove all children from node, store them in cache.
  *
  * Reset the subdivided flag and restore the visibility.
  *
  * This base method assumes that the node implementation is based off THREE.Mesh and that the isMesh property is used to toggle visibility.
  *
  * @method simplify
  */
 simplify() {
     if(this.children.length > 0)
     {
         this.childrenCache = this.children;
     }

     this.subdivided = false;
     this.isMesh = true;
     this.children = [];
 }

 /**
  * Get a neighbor in a specific direction.
  *
  * @method getNeighbor
  * @param {Number} direction
  * @return {MapNode} The neighbor node if found, null otherwise.
  */
 getNeighbor(direction) {
     //TODO <ADD CODE HERE>

     return null;
 }

 /**
  * Get the quad tree neighbors (left, right, top, down) in an array.
  *
  * @method getNeighbors
  * @return {Array} The neighbors array, not found neighbors will be returned null.
  */
 getNeighbors() {
     const neighbors = [];

     //TODO <ADD CODE HERE>

     return neighbors;
 }

 /**
  * Load tile texture from the server.
  * 
  * This base method assumes the existence of a material attribute with a map texture.
  *
  * @method loadTexture
  * @param {Function} onLoad 
  */
 loadTexture(onLoad) {
     const texture = new THREE.Texture();
     texture.generateMipmaps = false;
     texture.format = THREE.RGBFormat;
     texture.magFilter = THREE.LinearFilter;
     texture.minFilter = THREE.LinearFilter;
     texture.needsUpdate = false;

     this.material.map = texture;

     const self = this;
     const loader = new THREE.ImageLoader();
     loader.setCrossOrigin("anonymous");
     loader.load(this.mapView.fetchTile(this.level, this.x, this.y), function(image)
     {
         texture.image = image;
         texture.needsUpdate = true;
         self.nodeReady();
     });
 }

 /** 
  * Increment the child loaded counter.
  *
  * Should be called after a map node is ready for display.
  *
  * @method nodeReady
  */
 nodeReady() {
     //Update parent nodes loaded
     if(this.parentNode !== null)
     {
         this.parentNode.nodesLoaded++;

         if(this.parentNode.nodesLoaded >= MapNode.CHILDRENS)
         {
             if(this.parentNode.subdivided === true)
             {
                 this.parentNode.isMesh = false;
             }

             for(let i = 0; i < this.parentNode.children.length; i++)
             {
                 this.parentNode.children[i].visible = true;
             }
         }
     }
     //If its the root object just set visible
     else
     {
         this.visible = true;
     }
 }
}

/**
 * How many children each branch of the tree has.
 *
 * For a quad-tree this value is 4.
 *
 * @static
 * @attribute CHILDRENS
 * @type {Number}
 */
MapNode.CHILDRENS = 4;

/**
 * Root node has no location.
 *
 * @static
 * @attribute ROOT
 * @type {Number}
 */
MapNode.ROOT = -1;

/**
 * Index of top left quad-tree branch node.
 *
 * Can be used to navigate the children array looking for neighbors.
 *
 * @static
 * @attribute TOP_LEFT
 * @type {Number}
 */
MapNode.TOP_LEFT = 0;

/**
 * Index of top left quad-tree branch node.
 *
 * Can be used to navigate the children array looking for neighbors.
 *
 * @static
 * @attribute TOP_RIGHT
 * @type {Number}
 */
MapNode.TOP_RIGHT = 1;

/**
 * Index of top left quad-tree branch node.
 *
 * Can be used to navigate the children array looking for neighbors.
 *
 * @static
 * @attribute BOTTOM_LEFT
 * @type {Number}
 */
MapNode.BOTTOM_LEFT = 2;

/**
 * Index of top left quad-tree branch node.
 *
 * Can be used to navigate the children array looking for neighbors.
 *
 * @static
 * @attribute BOTTOM_RIGHT
 * @type {Number}
 */
MapNode.BOTTOM_RIGHT = 3;