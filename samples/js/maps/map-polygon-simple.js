function initialize() {
  if (GBrowserIsCompatible()) {
    var map = new GMap2(document.getElementById("map_canvas"));
    map.setCenter(new GLatLng(37.4419, -122.1419), 13);
    map.addControl(new GSmallMapControl());
    GEvent.addListener(map, "click", function(overlay,latlng) {
      var lat = latlng.lat();
      var lon = latlng.lng();
      var latOffset = 0.01;
      var lonOffset = 0.01;
   	  var polygon = new GPolygon([
        new GLatLng(lat, lon - lonOffset),
        new GLatLng(lat + latOffset, lon),
        new GLatLng(lat, lon + lonOffset),
        new GLatLng(lat - latOffset, lon),
        new GLatLng(lat, lon - lonOffset)
  ], "#f33f00", 5, 1, "#ff0000", 0.2);
  map.addOverlay(polygon);
    });
  }
}