function MyApplication() {
  this.counter = 0;
  this.map = new GMap2(document.getElementById("map_canvas"));
  this.map.setCenter(new GLatLng(37.4419, -122.1419), 13);
  var myEventListener = GEvent.bind(this.map, "click", this, function(overlay, latlng) {
     if (this.counter == 0) {
       if (latlng) {
         this.map.addOverlay(new GMarker(latlng))
         this.counter++;
       } else if (overlay instanceof GMarker) {
         // This code is never executed as the event listener is 
         // removed the second time this event is triggered
         this.removeOverlay(marker)
       }
     } else {
       GEvent.removeListener(myEventListener);
     }
  }); 
}

function initialize() {
  var application = new MyApplication();
}