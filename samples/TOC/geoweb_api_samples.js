// TODO: add in alt property so the hover on the links can describe them
var tempJSON = [
{
    "category":"GeoWeb-Geolocation",
    "samples":[
    {"boilerplateLoc":"samples/boilerplateHTML/geoweb/geoweb-geonames.html", "files":["samples/js/geoweb/geoweb-geonames.js"], "sampleName":"GeoNames", "tags": "", "providers": "openlayers"},
    {"boilerplateLoc":"samples/boilerplateHTML/geoweb/geoweb-atwhere.html", "files":["samples/js/geoweb/geoweb-atwhere.js"], "sampleName":"At Where", "tags": "", "providers": "loki"}
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