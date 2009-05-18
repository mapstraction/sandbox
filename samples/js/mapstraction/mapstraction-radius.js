var mapstraction;
function initialize()
{
    // hide the right-hand filter handle
    $('handle2').hide();
    
    mapstraction = new Mapstraction('map_canvas', 'google');
    mapstraction.enableScrollWheelZoom(); 
    myPoint = new LatLonPoint(52.250873, 0.110292);
    mapstraction.setCenterAndZoom(myPoint, 12);
    centerRadius = new Radius(myPoint, 20);
    addMarkers(50); 
    addSlider();
    sliderChanged(1);
}

function addMarkers(count) {
    var bounds = mapstraction.getBounds();
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    while ( count-- ) {
        var ll = new LatLonPoint( sw.lat + ( ( ne.lat - sw.lat ) * Math.random() ), sw.lon + ( ( ne.lon - sw.lon ) * Math.random() ) );
        var marker = new Marker(ll);
        var distance = mxn.fn.KMToMiles(marker.location.distance(myPoint));
        var el = document.createElement('strong');
        el.appendChild( document.createTextNode('Distance: ' + distance.toFixed(2) + ' Mile(s)'));
        marker.setInfoBubble(el);
        marker.setAttribute('distance', distance);
        mapstraction.addMarker(marker);
    }
}

function addSlider() {
    slider = new Control.Slider('handle1', 'track', {
        range:$R(0, 5, false),
        step:1,
        restricted:true,
        sliderValue: 1,
        onChange: sliderChanged,
        onSlide: sliderChanged
    });
}

function sliderChanged(radius) {
    mapstraction.removeAllPolylines();
    mapstraction.removeAllFilters();
    mapstraction.addPolygon(centerRadius.getPolyline(mxn.fn.milesToKM(radius), '#00F'));
    mapstraction.addFilter('distance', 'le', radius);
    var selectedCount = mapstraction.doFilter();
    var tw = document.getElementById( 'timeWindow' );
    tw.innerHTML = 'Radius: ' + radius.toFixed(2) + ' Mile(s)<br/>Selected Markers: ' + selectedCount;
}