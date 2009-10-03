var mapstraction;
function initialize() {
    mapstraction = new mxn.Mapstraction('map_canvas','yahoo');
    mapstraction.setCenterAndZoom(new mxn.LatLonPoint(37.75,-122.44), 8);
}
