var mapstraction;
var geocoder;
var address;
function initialize() {
    mapstraction = new Mapstraction('map_canvas','google');
    var myPoint = new LatLonPoint(37.804656, -122.263606);
    var csv = "name|holepar|holeyardage|holenumber|address\nSimple placemark|4.0|234.0|1.0|1517 N. Main St., Royal Oak, MI\nSimple placemark 2|3.0|100.0|2.0|2200 Wilson Blvd., Arlington, VA";
    geocoder = new MapstractionGeocoder(geocode_return, 'google');
    address = new Object();
    
    mapCSV(csv);
}

function mapCSV(csv) {
    var rows = csv.split("\n");
    var headers = rows[0].split("|")
    var address_col;
    for(var h=0;h<headers.length;++h) {
        if(headers[h] == "address")
        address_col = h;
    }
    for(var i=1;i<rows.length;++i) {
        cols = rows[i].split("|");
        address.address = cols[address_col];
        geocoder.geocode(address);         
    }   
    mapstraction.autoCenterAndZoom();
    
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
