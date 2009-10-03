function initialize() {
    var mapstraction = new mxn.Mapstraction('map_canvas','google');

    var myPoint = new mxn.LatLonPoint(18.47, -69.9);
    mapstraction.setCenterAndZoom(myPoint, 11);
    mapstraction.setMapType(mxn.Mapstraction.SATELLITE);
    mapstraction.addImageOverlay("over","http://mapstraction.com/images/santodomingo.png",50,-70.01544, 18.39777, -69.80567, 18.563517);
    mapstraction.addSmallControls();    
}