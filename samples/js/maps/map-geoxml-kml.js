var map;
var geoXml; 
var toggleState = 1;

function initialize() {
  if (GBrowserIsCompatible()) {
    geoXml = new GGeoXml("http://mapgadgets.googlepages.com/cta.kml");
    map = new GMap2(document.getElementById("map_canvas")); 
    map.setCenter(new GLatLng(41.875696,-87.624207), 11); 
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