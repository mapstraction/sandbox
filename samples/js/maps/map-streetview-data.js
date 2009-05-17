var map;
var myPano;   
var panoClient;
var nextPanoId;

function initialize() {
  var fenwayPark = new GLatLng(42.345573,-71.098326);
  var fenwayPOV = {yaw:370.64659986187695,pitch:-20};
  
  panoClient = new GStreetviewClient();      
  
  map = new GMap2(document.getElementById("map_canvas"));
  map.setCenter(fenwayPark, 15);
  GEvent.addListener(map, "click", function(overlay,latlng) {
    panoClient.getNearestPanorama(latlng, showPanoData);
  });
  
  myPano = new GStreetviewPanorama(document.getElementById("pano"));
  myPano.setLocationAndPOV(fenwayPark, fenwayPOV);
  GEvent.addListener(myPano, "error", handleNoFlash);  
  panoClient.getNearestPanorama(fenwayPark, showPanoData);
}

function showPanoData(panoData) {
  if (panoData.code != 200) {
    GLog.write('showPanoData: Server rejected with code: ' + panoData.code);
    return;
  }
  nextPanoId = panoData.links[0].panoId;
  var displayString = [
    "Panorama ID: " + panoData.location.panoId,
    "LatLng: " + panoData.location.latlng,
    "Copyright: " + panoData.copyright,
    "Description: " + panoData.location.description,
    "Next Pano ID: " + panoData.links[0].panoId
  ].join("<br/>");
  map.openInfoWindowHtml(panoData.location.latlng, displayString);
  
  GLog.write('Viewer moved to' + panoData.location.latlng);
  myPano.setLocationAndPOV(panoData.location.latlng);
}

function next() {
  // Get the next panoId
  // Note that this is not sophisticated. At the end of the block, it will get stuck
  panoClient.getPanoramaById(nextPanoId, showPanoData);
}

function handleNoFlash(errorCode) {
  if (errorCode == 603) {
    alert("Error: Flash doesn't appear to be supported by your browser");
    return;
  }
}  