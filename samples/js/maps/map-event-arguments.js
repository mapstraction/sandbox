function initialize() {
  if (GBrowserIsCompatible()) {
    var map = new GMap2(document.getElementById("map_canvas"));
    map.setCenter(new GLatLng(37.4419, -122.1419), 13);

    GEvent.addListener(map,"click", function(overlay,latlng) {     
      if (latlng) {   
        var myHtml = "The GLatLng value is: " + map.fromLatLngToDivPixel(latlng) + " at zoom level " + map.getZoom();
        map.openInfoWindow(latlng, myHtml);
      }
    });
    map.addControl(new GSmallMapControl());
    map.addControl(new GMapTypeControl());
  }
}