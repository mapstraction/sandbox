function MyApplication() {
  this.counter = 0;
  this.map = new GMap2(document.getElementById("map_canvas"));
  this.map.setCenter(new GLatLng(37.4419, -122.1419), 13);
  GEvent.bind(this.map, "click", this, this.onMapClick);
}
    
MyApplication.prototype.onMapClick = function() {
  this.counter++;
  alert("You have clicked the map " + this.counter +
        (this.counter == 1 ?" time":" times"));
}

function initialize() {
  if (GBrowserIsCompatible()) {
    var application = new MyApplication();
  }
}