function initialize() {
  if (GBrowserIsCompatible()) {
    var map = new GMap2(document.getElementById("map_canvas"));
    map.setCenter(new GLatLng(37.4419, -122.1419), 13);
    window.setTimeout(function() {
      map.panTo(new GLatLng(37.4569, -122.1569));
    }, 1000);
  }
}