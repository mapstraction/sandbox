function initialize() {
  if (GBrowserIsCompatible()) {
  
    // Create and Center a Map
    var map = new GMap2(document.getElementById("map_canvas"));
    map.setCenter(new GLatLng(37.4419, -122.1419), 13);
    map.addControl(new GLargeMapControl());
    map.addControl(new GMapTypeControl());

    // bind a search control to the map, suppress result list
    map.addControl(new google.maps.LocalSearch(), new GControlPosition(G_ANCHOR_BOTTOM_RIGHT, new GSize(10,20)));
  }
}
GSearch.setOnLoadCallback(initialize);