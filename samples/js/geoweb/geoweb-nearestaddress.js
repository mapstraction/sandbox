var proxy = "proxy/?a=";
var marker;
var method = "findNearestAddressJSON"
function initialize() {
    var mapstraction = new Mapstraction('map_canvas','yahoo');
    var center = new LatLonPoint(37.404196,-122.008194);
    mapstraction.setCenterAndZoom(center, 7);

    mapstraction.addControls({
        pan: true, 
        zoom: 'small',
    });
    mapstraction.addEventListener('click', function(p) { callGeoNames(p)});    
}
function callGeoNames(point) {
    jQuery.get(proxy + "http://ws.geonames.org/" + method + "&lat="+point.lat+"&lng="+point.lon, {},  function(data) {
        displayResults(data);
    });
}
function displayResults(data) {
    if(marker != null)
        mapstraction.removeMarker(marker);

    marker = new Marker( new LatLonPoint(37.75,-122.44) );
    marker.setInfoBubble(text);
    mapstraction.addMarker(marker);
}
