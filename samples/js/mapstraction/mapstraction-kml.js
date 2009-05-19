function initialize() {
    var mapstraction = new Mapstraction('map_canvas','google');

    var myPoint = new LatLonPoint(37.4041960114344,-122.008194923401);
    mapstraction.setCenterAndZoom(myPoint, 4);
    mapstraction.addControls({zoom: 'large'});
    mapstraction.addOverlay("http://maker.geocommons.com/maps/5059/overlays/0.kml");
}