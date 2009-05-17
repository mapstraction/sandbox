function KMLFeed(mapstraction, url) {
  this.mapstraction = mapstraction;
  this.url = url;
  this.overlays = new Array();
  this.request = undefined;
  var _mthis = this;
  this.mapstraction.addEventListener('moveend',  function(){_mthis.onMapChange();});
}

KMLFeed.prototype.handleEvent = function() {
  if(this.request.readyState == 4) {
    this.mapstraction.removeAllMarkers();
    this.overlays = new Array();

    var doc = this.request.responseXML;
    placemarks = doc.documentElement.getElementsByTagName("Placemark");
    for(var i = 0; i < placemarks.length; i++) {
      var point = placemarks[i].getElementsByTagName("Point")[0];
      var coords = point.getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;
      coords = coords.split(",");
      var name = placemarks[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
      var description = placemarks[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;

      var myPoint = new LatLonPoint(parseFloat(coords[1]), parseFloat(coords[0]));
      var marker = new Marker(myPoint);
//      marker.setLabel(name);
      marker.setInfoBubble(name + ', ' +description);
      mapstraction.addMarker(marker);

      this.overlays.push(marker);
    }

    this.request = undefined;
  } 
}


KMLFeed.prototype.onMapChange = function() {
  if(this.request != undefined) {
    this.request.abort();
  }
  var bounds = this.mapstraction.getBounds();
  var url = "pubs.kml?BBOX=" + bounds.getSouthWest().lng + "," + bounds.getSouthWest().lat + "," + bounds.getNorthEast().lng + "," + bounds.getNorthEast().lat;
//  this.request = GXmlHttp.create();
  this.request = new XMLHttpRequest();
  this.request.open('GET', url, true);
  
  var _this = this;
  this.request.onreadystatechange = function(){_this.handleEvent()};
    
  this.request.send(null);
}


function KMLHandler(mapstraction) {
  this.mapstraction = mapstraction;
  this.feeds = [];
}

KMLHandler.prototype.addFeed = function(url) {
    //Add the feed to the feeds array
    this.feeds[url] = new KMLFeed(this.mapstraction, url);
    this.feeds[url].onMapChange();
}

KMLHandler.prototype.removeFeed = function(url) {
    //Remove the feed from the feeds array
    this.feeds[url].destroy();
    delete this.feeds[url];
}
