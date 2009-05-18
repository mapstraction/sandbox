var geocode_marker;
var marker = false;
var mapstraction 

function initialize() {
    mapstraction = new Mapstraction('map_canvas','mapquest');
    mapstraction.setCenterAndZoom(new LatLonPoint(0,0), 1);

    mapstraction.addControls({
        pan: false, 
        zoom: 'small',
        map_type: false 
    });


    // initialise the map with your choice of API
    var router = new MapstractionRouter(route_return, 'mapquest', {proxyServerPath: "proxy_handler.py"});

    var originAddress = new Object();
    originAddress.street = "752 Spring Dr.";
    originAddress.locality = "Northville";
    originAddress.region = "Michigan";
    originAddress.country = "US";

    var destinationAddress = new Object();
    destinationAddress.street = "403 Montgomery Ave.";
    destinationAddress.locality = "Ann Arbor";
    destinationAddress.region = "Michigan";
    destinationAddress.country = "US";

    var waypoints = new Array();
    waypoints.push(originAddress);
    waypoints.push(destinationAddress);            
    router.route(waypoints);    
}
function route_return(waypoints, route) {                
    mapstraction.showRoute(route);

    for(var i=0;i<waypoints.length;i++) {
        geocode_marker = new Marker(waypoints[i].point);

        var address = waypoints[i].street + ", " 
        + waypoints[i].locality + ", " 
        + waypoints[i].region;
        geocode_marker.setLabel("Waypoint " + i);
        geocode_marker.setInfoBubble(address);

        // display marker 
        mapstraction.addMarker(geocode_marker);

    }
    // open the last marker
    geocode_marker.openBubble();

}

