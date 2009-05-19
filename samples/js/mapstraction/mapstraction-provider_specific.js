function initialize() {
    var mapstraction = new Mapstraction('map_canvas','google');
    mapstraction.setCenterAndZoom(new LatLonPoint(37.404196,-122.008194), 9);

    // Use Google's Traffic Overlay
    var trafficOptions = {incidents:true};
    trafficInfo = new GTrafficOverlay(trafficOptions);
    mapstraction.getMap().addOverlay(trafficInfo);
}