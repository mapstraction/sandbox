var ge;
var placemark;

google.load("earth", "1");

function init() {
  // Create two buttons that will toggle sky/earth.
  var content = document.getElementById('content');
  var inputHTML = '<input type="button" value="Show Sky" onclick="showSky()" />' +
                  '<input type="button" value="Show Earth" onclick="showEarth()" />';
  content.innerHTML = inputHTML;

  google.earth.createInstance('content', initCB, failureCB);
}

function initCB(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

  // create the placemark
  placemark = ge.createPlacemark('');

  var point = ge.createPoint('');
  point.setLatitude(37);
  point.setLongitude(-122);
  placemark.setGeometry(point);

  // add the placemark to the earth DOM
  ge.getFeatures().appendChild(placemark);

  // look at the placemark we created
  var la = ge.createLookAt('');
  la.set(37, -122,
          0, // altitude
          ge.ALTITUDE_RELATIVE_TO_GROUND,
          0, // heading
          0, // straight-down tilt
          5000 // range (inverse of zoom)
  );
  ge.getView().setAbstractView(la);

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

function showSky() {
  ge.getOptions().setMapType(ge.MAP_TYPE_SKY);

  setTimeout(function() {
    // Zoom in on a nebula.
    var oldFlyToSpeed = ge.getOptions().getFlyToSpeed();
    ge.getOptions().setFlyToSpeed(.2);  // Slow down the camera flyTo speed.
    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
    lookAt.set(41.28509187215, -169.2448684551622, 0,
            ge.ALTITUDE_RELATIVE_TO_GROUND, 262.87, 0, 162401);
    // Also try:
    //   lookAt.set(-59.65189337195337, -18.799770300376053, 0,
    //              ge.ALTITUDE_RELATIVE_TO_GROUND, 0, 0, 36817);
    ge.getView().setAbstractView(lookAt);
    ge.getOptions().setFlyToSpeed(oldFlyToSpeed);
  }, 1000);  // Start the zoom-in after one second.
}

function showEarth() {
  ge.getOptions().setMapType(ge.MAP_TYPE_EARTH);
}

google.setOnLoadCallback(init);