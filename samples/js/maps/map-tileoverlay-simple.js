function initialize() {
  if (GBrowserIsCompatible()) {
  
    // Set up the copyright information
    // Each image used should indicate its copyright permissions
    var myCopyright = new GCopyrightCollection("(c) ");
    myCopyright.addCopyright(new GCopyright('Demo',
      new GLatLngBounds(new GLatLng(-90,-180), new GLatLng(90,180)),
      0,'©2007 Google'));

    // Create the tile layer overlay and
    // implement the three abstract methods     
    var tilelayer = new GTileLayer(myCopyright);
    tilelayer.getTileUrl = function() { return "http://code.google.com/apis/maps/documentation/examples/include/tile_crosshairs.png"; };
    tilelayer.isPng = function() { return true;};
    tilelayer.getOpacity = function() { return 1.0; }

    var myTileLayer = new GTileLayerOverlay(tilelayer);
    var map = new GMap2(document.getElementById("map_canvas"));
    map.setCenter(new GLatLng(37.4419, -122.1419), 13);
    map.addControl(new GSmallMapControl());
    map.addOverlay(myTileLayer);
  }
}