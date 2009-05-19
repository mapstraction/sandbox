var mapstraction;
function initialize() {
      mapstraction = new Mapstraction('google','google');
      var myPoint = new LatLonPoint(38.8971, -77.070857);
      mapstraction.setCenterAndZoom(myPoint, 13);
      my_marker = new Marker(myPoint);
      var text = "Swapping with Mapstraction";
      my_marker.setInfoBubble(text);
      mapstraction.addMarker(my_marker);
    
}