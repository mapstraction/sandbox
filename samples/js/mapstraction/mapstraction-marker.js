var mapstraction;
function initialize() {
    mapstraction = new Mapstraction('map_canvas','google');
    mapstraction.addMarker( new Marker( new LatLonPoint(37.75,-122.44)));
    advancedMarker();
    mapstraction.autoCenterAndZoom();
}

function advancedMarker() {
    mapstraction.addMarkerWithData(new Marker( new LatLonPoint(47.4004,153.1435)),{
        infoBubble : "Advanced Marker",
        label : "tooltip",
        date : "new Date()",
        marker : 4,
        iconShadow: "http://mapufacture.com/images/providers/blank.png",
        iconShadowSize : [0,0],
        icon : "http://assets1.mapufacture.com/images/markers/usgs_marker.png",
        iconSize : [20,20],
        draggable : false,
        hover : true
    });
    
}