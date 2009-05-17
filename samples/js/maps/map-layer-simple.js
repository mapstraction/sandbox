function initialize() {
  if (GBrowserIsCompatible()) {
    var map = new GMap2(document.getElementById("map_canvas"));
    map.setCenter(new GLatLng(40.730885,-73.997383), 15);
    var myLayer = new GLayer("org.wikipedia.en");
    map.addOverlay(myLayer);
  }
}