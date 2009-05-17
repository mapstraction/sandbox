function initialize() {
  if (GBrowserIsCompatible()) {
  
    var map = new GMap2(document.getElementById("map_canvas"));
    map.setCenter(new GLatLng(40.740, -74.18), 12);

    // ground overlay
    var boundaries = new GLatLngBounds(new GLatLng(40.716216,-74.213393), new GLatLng(40.765641,-74.139235));
    var oldmap = new GGroundOverlay("http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg", boundaries);
    map.addControl(new GSmallMapControl());
    map.addControl(new GMapTypeControl());
    map.addOverlay(oldmap);
  }
}