var map;
var geocoder;
var address;

function initialize() {
  map = new GMap2(document.getElementById("map_canvas"));
  map.setCenter(new GLatLng(40.730885,-73.997383), 15);
  map.addControl(new GLargeMapControl);
  GEvent.addListener(map, "click", getAddress);
  geocoder = new GClientGeocoder();
}

function getAddress(overlay, latlng) {
  if (latlng != null) {
    address = latlng;
    geocoder.getLocations(latlng, showAddress);
  }
}

function showAddress(response) {
  map.clearOverlays();
  if (!response || response.Status.code != 200) {
    alert("Status Code:" + response.Status.code);
  } else {
    place = response.Placemark[0];
    point = new GLatLng(place.Point.coordinates[1],
                        place.Point.coordinates[0]);
    marker = new GMarker(point);
    map.addOverlay(marker);
    marker.openInfoWindowHtml(
    '<b>orig latlng:</b>' + response.name + '<br/>' + 
    '<b>latlng:</b>' + place.Point.coordinates[1] + "," + place.Point.coordinates[0] + '<br>' +
    '<b>Status Code:</b>' + response.Status.code + '<br>' +
    '<b>Status Request:</b>' + response.Status.request + '<br>' +
    '<b>Address:</b>' + place.address + '<br>' +
    '<b>Accuracy:</b>' + place.AddressDetails.Accuracy + '<br>' +
    '<b>Country code:</b> ' + place.AddressDetails.Country.CountryNameCode);
  }
}