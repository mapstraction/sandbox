function initialize() {
  if (GBrowserIsCompatible()) {
  
    var map = new GMap2(document.getElementById("map_canvas"));
    map.setCenter(new GLatLng(37.88, -122.442626), 10);
    map.addControl(new GSmallMapControl());
    map.addControl(new GMapTypeControl());

    GEvent.addListener(map,"click", function(overlay,latlng) {
      if (overlay) {
        // ignore if we click on the info window
        return;
      }
      var tileCoordinate = new GPoint();
      var tilePoint = new GPoint();
      var currentProjection = G_NORMAL_MAP.getProjection();
      tilePoint = currentProjection.fromLatLngToPixel(latlng, map.getZoom());
      tileCoordinate.x = Math.floor(tilePoint.x / 256);
      tileCoordinate.y = Math.floor(tilePoint.y / 256);
      var myHtml = "Latitude: " + latlng.lat() + "<br/>Longitude: " + latlng.lng() + 
        "<br/>The Tile Coordinate is:<br/> x: " + tileCoordinate.x + 
        "<br/> y: " + tileCoordinate.y + "<br/> at zoom level " + map.getZoom();	
      map.openInfoWindow(latlng, myHtml);
    });
  }
}