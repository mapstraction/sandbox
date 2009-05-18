var mapstraction;
var geocoder;
var address;
function initialize() {
    mapstraction = new Mapstraction('map_canvas','google');
    mapstraction.setCenterAndZoom(new LatLonPoint(0,0), 1);

    // initialise the map with your choice of API
    geocoder = new MapstractionGeocoder(geocode_return, 'google');
    
    address = new Object();
    address.street = "1600 Pennsylvania Ave.";
    address.locality = "Washington";
    address.region = "DC";
    address.country = "US";

    geocoder.geocode(address);    
}

function geocode_return(geocoded_location) {

    // display the map centered on a latitude and longitude (Google zoom levels)
    mapstraction.setCenterAndZoom(geocoded_location.point, 15);

    mapstraction.addControls({
        pan: true, 
        zoom: 'small',
        map_type: true
    });
    // create a marker positioned at a lat/lon 
    geocode_marker = new Marker(geocoded_location.point);

    var address = geocoded_location.street + ", " 
    + geocoded_location.locality + ", " 
    + geocoded_location.region;
    geocode_marker.setLabel("A");
    geocode_marker.setInfoBubble(address);

    // display marker 
    mapstraction.addMarker(geocode_marker);

    // open the marker
    geocode_marker.openBubble();
}



function user_submit() {
    var address = new Object();
    address.address = document.getElementById('address').value;
    geocoder.geocode(address);
}