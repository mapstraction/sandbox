var mapstraction;
var maptiles = [ "http://oakland-1950s.s3.amazonaws.com/{Z}-r{Y}-c{X}.jpg",
"http://oakland-1912.s3.amazonaws.com/{Z}-r{Y}-c{X}.jpg",
"http://oakland-1877.s3.amazonaws.com/{Z}-r{Y}-c{X}.jpg"];
function initialize() {
    mapstraction = new Mapstraction('map_canvas','google');
    var myPoint = new LatLonPoint(37.804656, -122.263606);

    // display the map centered on a latitude and longitude (Google zoom levels)
    mapstraction.setCenterAndZoom(myPoint, 11);
    mapstraction.setMapType(Mapstraction.SATELLITE);
    mapstraction.addSmallControls();
    for(var t=0;t<maptiles.length;t++) {
        mapstraction.addTileLayer(maptiles[t], 0.6);
    }
}
