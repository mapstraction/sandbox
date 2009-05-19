var mapstraction;
function initialize() {
    mapstraction = Mapstraction.new("map_canvas","microsoft");
    // google, microsoft, yahoo, openlayers, freeearth, mapquest, openspace
    var myPoint = new LatLonPoint(37.404196,-122.008194);

    // display the map centered on a latitude and longitude (Google zoom levels)
    mapstraction.setCenterAndZoom(myPoint, 9);

    mapstraction.addControls({
        pan: true, 
        zoom: 'small',
        map_type: true 
    });
    my_marker = new Marker(myPoint);

    my_marker.setIcon('http://mapstraction.com/icon.gif');
    mapstraction.addMarker( new Marker( new LatLonPoint(37.75,-122.44)));
}