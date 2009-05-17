function initialize() {
  var myPano = new GStreetviewPanorama(document.getElementById("pano"));
  fenwayPark = new GLatLng(42.345573,-71.098326);
  myPOV = {yaw:370.64659986187695,pitch:-20};
  myPano.setLocationAndPOV(fenwayPark, myPOV);
  GEvent.addListener(myPano, "error", handleNoFlash);
}

function handleNoFlash(errorCode) {
  if (errorCode == 603) {
    alert("Error: Flash doesn't appear to be supported by your browser");
    return;
  }
}  