var mapstraction;
function initialize() {
    mapstraction = new Mapstraction('map_canvas','yahoo');
    mapstraction.setCenterAndZoom(new LatLonPoint(37.75,-122.44), 8);
}
