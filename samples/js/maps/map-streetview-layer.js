function initialize() {
  if (GBrowserIsCompatible()) {
    var map = new GMap2(document.getElementById("map_canvas"));
    map.setCenter(new GLatLng(42.345573,-71.098326), 14);
    svOverlay = new GStreetviewOverlay();
    map.addOverlay(svOverlay);
  }
}