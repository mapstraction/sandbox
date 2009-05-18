// TODO: add in alt property so the hover on the links can describe them
var tempJSON = [
{
    "category":"Mapstraction API-General",
    "samples":[
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-google.html", "files":["samples/js/mapstraction/mapstraction-google.js"], "sampleName":"Simple Overview", "tags": "", "providers": "google"},
    ],
    "docsUrl": "http://mapstraction.com"
},
{
    "category":"Mapstraction API-Providers",
    "samples":[
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-google.html", "files":["samples/js/mapstraction/mapstraction-google.js"], "sampleName":"Google", "tags": "", "providers": "google"},
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-yahoo.html", "files":["samples/js/mapstraction/mapstraction-yahoo.js"], "sampleName":"Yahoo", "tags": "", "providers": "yahoo"},
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-microsoft.html", "files":["samples/js/mapstraction/mapstraction-microsoft.js"], "sampleName":"Microsoft", "tags": "", "providers": "microsoft"},
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-mapquest.html", "files":["samples/js/mapstraction/mapstraction-mapquest.js"], "sampleName":"MapQuest", "tags": "", "providers": "mapquest"},
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-openlayers.html", "files":["samples/js/mapstraction/mapstraction-openlayers.js"], "sampleName":"OpenLayers", "tags": "", "providers": "openlayers"},
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-google.html", "files":["samples/js/mapstraction/mapstraction-osm.js"], "sampleName":"OpenStreetMap", "tags": "", "providers": "google"},
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-multimap.html", "files":["samples/js/mapstraction/mapstraction-multimap.js"], "sampleName":"MultiMap", "tags": "", "providers": "multimap"},
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-map24.html", "files":["samples/js/mapstraction/mapstraction-map24.js"], "sampleName":"Map24", "tags": "", "providers": "map24"},
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-freeearth.html", "files":["samples/js/mapstraction/mapstraction-freeearth.js"], "sampleName":"FreeEarth", "tags": "", "providers": "freeearth"},
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-viamichelin.html", "files":["samples/js/mapstraction/mapstraction-viamichelin.js"], "sampleName":"ViaMichelin", "tags": "", "providers": "viamichelin"},
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-openspace.html", "files":["samples/js/mapstraction/mapstraction-openspace.js"], "sampleName":"OpenSpace", "tags": "", "providers": "openspace"}
    ],
    "docsUrl": "http://mapstraction.com"
},  
{
    "category":"Mapstraction API-Controls",
    "samples":[
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-sliders.html", "files":["samples/js/mapstraction/mapstraction-filters.js"], "sampleName":"Filtering Markers", "tags": "", "providers": "google"},
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-sliders.html", "files":["samples/js/mapstraction/mapstraction-radius.js"], "sampleName":"Radius Filtering", "tags": "", "providers": "google"}
    ],
    "docsUrl": "http://mapstraction.com"
},  
{
    "category":"Mapstraction API-Data",
    "samples":[
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-openlayers.html", "files":["samples/js/mapstraction/mapstraction-polylines.js"], "sampleName":"Polylines", "tags": "", "providers": "openlayers"},    
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-openlayers.html", "files":["samples/js/mapstraction/mapstraction-georss.js"], "sampleName":"GeoRSS feed", "tags": "", "providers": "google"},
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-tiles.html", "files":["samples/js/mapstraction/mapstraction-tiles.js"], "sampleName":"Tiles", "tags": "", "providers": "google"}
    ],
    "docsUrl": "http://mapstraction.com"
},  
{
    "category":"Mapstraction API-Services",
    "samples":[
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-geocode.html", "files":["samples/js/mapstraction/mapstraction-geocode.js"], "sampleName":"Geocoding", "tags": "", "providers": "openlayers"},
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-route.html", "files":["samples/js/mapstraction/mapstraction-route.js"], "sampleName":"Routing", "tags": "", "providers": "mapquest,google"}
    ],
    "docsUrl": "http://mapstraction.com"
},    
{
    "category":"Mapstraction API-mxn",
    "samples":[
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-mxn.html", "files":["samples/js/mapstraction/mapstraction-mxn.js"], "sampleName":"Mapstraction v2", "tags": "", "providers": ""},
    {"boilerplateLoc":"samples/boilerplateHTML/mapstraction/mapstraction-geocommons.html", "files":["samples/js/mapstraction/mapstraction-geocommons.js"], "sampleName":"GeoCommons", "tags": "", "providers": ""}
    ],
    "docsUrl": "http://mapstraction.com"
}
];

if (typeof codeArray != 'undefined' && codeArray.length) {
    codeArray = codeArray.concat(tempJSON);
    delete tempJSON;
} else {
    window.codeArray = tempJSON;
    delete tempJSON;
}