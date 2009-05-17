// Create a directions object and register a map and DIV to hold the 
// resulting computed directions

var map;
var directionsPanel;
var directions;

function initialize() {
  map = new GMap2(document.getElementById("map_canvas"));
  map.setCenter(new GLatLng(42.351505,-71.094455), 15);
  directionsPanel = document.getElementById("route");
  directions = new GDirections(map, directionsPanel);
  directions.load("from: 500 Memorial Drive, Cambridge, MA to: 4 Yawkey Way, Boston, MA 02215 (Fenway Park)");
}
