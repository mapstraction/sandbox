var mapstraction;
var maptiles = [ ["http://oakland-1950s.s3.amazonaws.com/{Z}-r{Y}-c{X}.jpg", "Oakland 1950"],
["http://oakland-1912.s3.amazonaws.com/{Z}-r{Y}-c{X}.jpg", "Oakland 1912"],
["http://oakland-1877.s3.amazonaws.com/{Z}-r{Y}-c{X}.jpg", "Oakland 1877"]];
function initialize() {
    mapstraction = new mxn.Mapstraction('map_canvas','google');
    var myPoint = new mxn.LatLonPoint(37.804656, -122.263606);

    // display the map centered on a latitude and longitude (Google zoom levels)
    mapstraction.setCenterAndZoom(myPoint, 12);
    mapstraction.setMapType(mxn.Mapstraction.SATELLITE);
    mapstraction.addSmallControls();
    mapstraction.addMapTypeControls();
    for(var t=0;t<maptiles.length;t++) {
        mapstraction.addTileLayer(maptiles[t][0], 0.6, maptiles[t][1]);
    }
}
