function initialize() {
  if (GBrowserIsCompatible()) {
    var map = new GMap2(document.getElementById("map_canvas"),
        { size: new GSize(640,320) } );
    map.removeMapType(G_HYBRID_MAP);
    map.setCenter(new GLatLng(42.366662,-71.106262), 11);
    map.addControl(new GLargeMapControl());

    var mapControl = new GMapTypeControl();
    map.addControl(mapControl);
    
  }
}