var map;
var geocoder;

function initialize() {
 map = new GMap2(document.getElementById("map_canvas"));
 map.setCenter(new GLatLng(34, 0), 1);
 geocoder = new GClientGeocoder();
}

// addAddressToMap() is called when the geocoder returns an
// answer.  It adds a marker to the map with an open info window
// showing the nicely formatted version of the address and the country code.
function addAddressToMap(response) {
 map.clearOverlays();
 if (!response || response.Status.code != 200) {
   alert("Sorry, we were unable to geocode that address");
 } else {
   place = response.Placemark[0];
   point = new GLatLng(place.Point.coordinates[1],
                       place.Point.coordinates[0]);
   marker = new GMarker(point);
   map.addOverlay(marker);
   marker.openInfoWindowHtml(place.address + '<br>' +
     '<b>Country code:</b> ' + place.AddressDetails.Country.CountryNameCode);
 }
}

// showLocation() is called when you click on the Search button
// in the form.  It geocodes the address entered into the form
// and adds a marker to the map at that location.
function showLocation() {
 var address = document.forms[0].q.value;
 geocoder.getLocations(address, addAddressToMap);
}

// findLocation() is used to enter the sample addresses into the form.
function findLocation(address) {
 document.forms[0].q.value = address;
 showLocation();
}