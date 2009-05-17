function initialize() {
  if (GBrowserIsCompatible()) {
    var map = new GMap2(document.getElementById("map_canvas"));
    map.setCenter(new GLatLng(37.4419, -122.1419), 13);
    var polyline = new GPolyline([
	  new GLatLng(37.4419, -122.1419),
	  new GLatLng(37.4519, -122.1519)
], "#ff0000", 10);
map.addOverlay(polyline);
  }
}