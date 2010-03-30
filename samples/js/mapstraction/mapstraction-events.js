var marker;
var mapstraction;
function initialize() {
    mapstraction = new mxn.Mapstraction('map_canvas','google');
    mapstraction.setCenterAndZoom(new mxn.LatLonPoint(37.404196,-122.008194), 7);
    mapstraction.addLargeControls();

  mapstraction.click.addHandler(function(event_name, event_source, event_args) {
    var p = event_args.location;
        marker = new mxn.Marker(p);
        text = "<p>Lat: " + p.lat + " Lon: " + p.lon + "</p>";
        marker.setInfoBubble(text);
        mapstraction.addMarker(marker);
        marker.openBubble();
    });
    mapstraction.changeZoom.addHandler(function(n, s, a) { alert("You changed the zoom level")});
    mapstraction.endPan.addHandler(function(n, s, a) {  alert("You panned the map")});
}