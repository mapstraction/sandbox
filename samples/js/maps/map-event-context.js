function initialize() {
  if (GBrowserIsCompatible()) {
    var map = new GMap2(document.getElementById("map_canvas"));
    map.setCenter(new GLatLng(37.4419, -122.1419), 13);
    GEvent.addListener(map, "moveend", function() {
      var center = map.getCenter();
      alert(center.toString());
    });
  }
}