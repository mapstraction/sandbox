function initialize() {
  if (GBrowserIsCompatible()) {
    // define the crosshair tile layer and its required functions
    var crossLayer = new GTileLayer(new GCopyrightCollection(""), 0, 15);
    crossLayer.getTileUrl =  function(tile, zoom) {
      return "./include/tile_crosshairs.png";
    }
    crossLayer.isPng = function() {return true;}

    // Create a new map type incorporating the tile layer
    var layerTerCross = [ G_PHYSICAL_MAP.getTileLayers()[0],
                          crossLayer ];
    var mtTerCross = new GMapType(layerTerCross,
                                  G_PHYSICAL_MAP.getProjection(), "Ter+");

    var map = new GMap2(document.getElementById("map_canvas"),
        { size: new GSize(640,320) } );
    map.addMapType(G_PHYSICAL_MAP);
    map.addMapType(mtTerCross);
    map.setCenter(new GLatLng(37.4419, -122.1419), 4);
    map.addControl(new GLargeMapControl())

    var mapControl = new GHierarchicalMapTypeControl();
    
    // Set up map type menu relationships
    mapControl.clearRelationships();
    mapControl.addRelationship(G_SATELLITE_MAP, G_HYBRID_MAP, "Labels", false);
    mapControl.addRelationship(G_PHYSICAL_MAP, mtTerCross, "Crosshairs");

    // Add control after you've specified the relationships
    map.addControl(mapControl);
  }
}