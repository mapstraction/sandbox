function initialize() {
  if (GBrowserIsCompatible()) {
    var map = new GMap2(document.getElementById("map_canvas"));
    map.setCenter(new GLatLng(37.4419, -122.1419), 13);
    map.addControl(new GSmallMapControl());
    map.addControl(new GMapTypeControl());

    // Download the data in data.xml and load it on the map. The format we
    // expect is:
    // <markers>
    //   <marker lat="37.441" lng="-122.141"/>
    //   <marker lat="37.322" lng="-121.213"/>
    // </markers>
    GDownloadUrl("http://code.google.com/apis/maps/documentation/examples/include/data.xml", function(data) {
      var xml = GXml.parse(data);
      var markers = xml.documentElement.getElementsByTagName("marker");
      for (var i = 0; i < markers.length; i++) {
        var latlng = new GLatLng(parseFloat(markers[i].getAttribute("lat")),
                                parseFloat(markers[i].getAttribute("lng")));
        map.addOverlay(new GMarker(latlng));
      }
    });
  }
}
