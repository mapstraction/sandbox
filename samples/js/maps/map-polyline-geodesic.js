function initialize() {
  if (GBrowserIsCompatible()) {
    
   function createLengthMarker(point) {
	  var marker = new GMarker(point);
	  var value = polyline.getLength();
	  value = value / 1000;
	  var message = "The length of this great circle is: " + value + " kilometers.";
	  GEvent.addListener(marker,"click", function() {
 	    var myHtml = message;
 	    map.openInfoWindowHtml(point, myHtml);
	  });
      return marker;
    }

    var map = new GMap2(document.getElementById("map_canvas"));
    map.setCenter(new GLatLng(45.828799,-105.292969), 2);
    var polyOptions = {geodesic:true};
    var polyline = new GPolyline([
      new GLatLng(40.65642, -73.7883),
      new GLatLng(61.1699849, -149.944496)
    ], "#ff0000", 10, 1, polyOptions);
    map.addOverlay(polyline);
    map.addOverlay(createLengthMarker(new GLatLng(45.828799,-105.292969)));
  }
}