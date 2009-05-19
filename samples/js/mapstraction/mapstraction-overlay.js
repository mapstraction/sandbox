function initialize() {
    var mapstraction = new Mapstraction('map_canvas','yahoo');

    var myPoint = new LatLonPoint(18.47, -69.9);
    mapstraction.setCenterAndZoom(myPoint, 11);
    mapstraction.setMapType(Mapstraction.SATELLITE);
    mapstraction.addImageOverlay("over","http://mapstraction.com/images/santodomingo.png",50,-70.01544, 18.39777, -69.80567, 18.563517);
    mapstraction.addSmallControls();    
}