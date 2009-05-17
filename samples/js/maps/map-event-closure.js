function initialize() {
  var message = ["This","is","the","secret","message"];
 
  if (GBrowserIsCompatible()) {
    var map = new GMap2(document.getElementById("map_canvas"));
    map.setCenter(new GLatLng(37.4419, -122.1419), 13);
  
    // Creates a marker at the given point
    // Clicking the marker will hide it
    function createMarker(latlng, number) {
      var marker = new GMarker(latlng);
      marker.value = number;
      GEvent.addListener(marker,"click", function() {
        var myHtml = "<b>#" + number + "</b><br/>" + message[number -1];
        map.openInfoWindowHtml(latlng, myHtml);
      });
      return marker;
	}

    // Add 5 markers to the map at random locations
    // Note that we don't add the secret message to the marker's instance data
    var bounds = map.getBounds();
    var southWest = bounds.getSouthWest();
    var northEast = bounds.getNorthEast();
    var lngSpan = northEast.lng() - southWest.lng();
    var latSpan = northEast.lat() - southWest.lat();
    for (var i = 0; i < 5; i++) {
      var latlng = new GLatLng(southWest.lat() + latSpan * Math.random(),
	    southWest.lng() + lngSpan * Math.random());
	map.addOverlay(createMarker(latlng, i + 1));
    }
  }
}