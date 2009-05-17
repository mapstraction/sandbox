var map;
var trafficInfo;
var toggleState = 1;

function initialize() {
  if (GBrowserIsCompatible()) {
    map = new GMap2(document.getElementById("map_canvas")); 
    map.setCenter(new GLatLng(40.652513,-73.936615), 12);
    map.addControl(new GSmallMapControl());
    var trafficOptions = {incidents:true};
    trafficInfo = new GTrafficOverlay(trafficOptions);
    map.addOverlay(trafficInfo);
  }
}

function toggleTraffic() {
  if (toggleState == 1) {
    map.removeOverlay(trafficInfo);
    toggleState = 0;
  } else {
    map.addOverlay(trafficInfo);
    toggleState = 1;
  }
}