function initialize() {
  if (GBrowserIsCompatible()) {
    var map = new GMap2(document.getElementById("map_canvas"));
    map.setCenter(new GLatLng(37.4419, -122.1419), 13);
    GEvent.addListener(map, "click", function() {
      alert("You clicked the map.");
     });
  }
}