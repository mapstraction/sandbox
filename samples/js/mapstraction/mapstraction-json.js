var mapstraction;
function initialize() {
    mapstraction = new mxn.Mapstraction('map_canvas','google');

    var myPoint = new mxn.LatLonPoint(37.4041960114344,-122.008194923401);
    mapstraction.setCenterAndZoom(myPoint, 3);
    mapstraction.addControls({zoom: 'large'});

    json = {
        features: [{
            "type": "Feature",
            "toponym": null,
            "title": "DSC_0023.JPG",
            "author": "ugef",
            "id": 1930723,
            "description": "",
            "categories": "california unitedstates sanjose eyefi",
            "geometry": {
                "type": "Point",
                "coordinates": [-121.896263,37.328655]
            },
            "properties": 
            {
                "icon_shadow": "http://mapufacture.com/images/providers/blank.png",
                "icon_shadow_size": [0,0],
                "line_color": "",
                "icon": "http://assets0.mapufacture.com/images/markers/flickr_marker.png",
                "line_opacity": 1.0,
                "pubdate": "2008/07/03 20:14:01 +0000",
                "line_width": 1.0,
                "poly_color": "",
                "icon_size": [16,16]
            },
            "source_id": 1000014
        },
        {
            "type": "Feature",
            "toponym": null,
            "title": "M 4.7,Kuril Islands",
            "author": "",
            "id": 1389649,
            "description": "November 07,2007 13:37:58 GMT",
            "categories": "4,pastweek,56.80 km",
            "geometry": {
                "type": "Point",
                "coordinates": [153.1435,47.4004]
            },
                "icon_shadow": "http://mapufacture.com/images/providers/blank.png",
                "icon_shadow_size": [0,0],
                "line_color": "",
                "icon": "http://assets1.mapufacture.com/images/markers/usgs_marker.png",
                "line_opacity": 1.0,
                "pubdate": "2007/11/07 13:37:58 +0000",
                "line_width": 1.0,
                "poly_color": "",
                "icon_size": [16,16],
            "source_id": 1000022
        }
        ]
    }
    // 
    mapstraction.addJSON(json);
    mapstraction.autoCenterAndZoom
}