var mapstraction;
function initialize()
{
    mapstraction = new Mapstraction('map_canvas', 'google');
    var myPoint = new LatLonPoint(51.387745, -0.50914);
    mapstraction.setCenterAndZoom(myPoint, 14);
    addMarkers( 100 ); 

    addSlider();
    sliderChanged(slidervalues);
}

// Calls the mapstraction filtering based on the slider positions
function sliderChanged(offsets) {
    var min = new Date(slider.timeMin + (offsets[0] / 100) * (slider.timeMax - slider.timeMin));
    var max = new Date(slider.timeMin + (offsets[1] / 100) * (slider.timeMax - slider.timeMin));

    var tw = document.getElementById( 'timeWindow' );
    tw.innerHTML = min.toString() + " -> " + max.toString();

    mapstraction.removeAllFilters();
    mapstraction.addFilter('date', 'ge', min );
    mapstraction.addFilter('date', 'le', max );
    mapstraction.doFilter();

}

// Adds the slider controls
function addSlider() {
    slidervalues = [0,100];
    sliderhandles = [$('handle1'), $('handle2')];
    slider = new Control.Slider(sliderhandles, 'track', {
        range:$R(0, 100, false),
        step:1,
        restricted:true,
        sliderValue: slidervalues,
        onChange: sliderChanged,
        onSlide: sliderChanged
    });
    var d = new Date();
    slider.timeMin = d.getTime() - (86400000/2);
    slider.timeMax = d.getTime() + (86400000/2);
}

// Randomly adds markers to the map
function addMarkers( count ) {
    var bounds = mapstraction.getBounds();
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    while ( count-- ) {
        var ll = new LatLonPoint( sw.lat + ( ( ne.lat - sw.lat ) * Math.random() ), sw.lon + ( ( ne.lon - sw.lon ) * Math.random() ) );
        var marker = new Marker(ll);

        var number = Math.round( 86400000 * Math.random() );
        var d = new Date();
        d.setTime( d.getTime() - (86400000/2) + number);
        var h = d.getHours(); if (h < 10) { h = "0" + h; }
        var m = d.getMinutes(); if (m < 10) { m = "0" + m; }

        var el = document.createElement('h1');
        el.appendChild( document.createTextNode(h + ':' + m));

        marker.setInfoBubble(el);
        marker.setAttribute( 'date', d );
        mapstraction.addMarker( marker );
    }
}