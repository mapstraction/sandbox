var map;
var geoXml;
var toggleState = 1;

function initialize() {
  if (GBrowserIsCompatible()) {
    geoXml = new GGeoXml("http://api.flickr.com/services/feeds/geo/?g=322338@N20&lang=en-us&format=feed-georss");
    map = new GMap2(document.getElementById("map_canvas"));
    map.setCenter(new GLatLng(49.496675,-102.65625), 3); 
    map.addControl(new GLargeMapControl());
    map.addControl(new GLargeMapControl());
    map.addOverlay(geoXml);
  }
} 

function toggleMyKml() {
  if (toggleState == 1) {
    map.removeOverlay(geoXml);
    toggleState = 0;
  } else {
    map.addOverlay(geoXml);
    toggleState = 1;
  }
}
