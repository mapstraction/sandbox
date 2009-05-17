var ge;
google.load("earth", "1");

function init() {
  document.getElementById('content').innerHTML = '';

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

  var la = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
  la.setRange(50000);
  ge.getView().setAbstractView(la);

  createPolygon();

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

function createPolygon() {
  var polygonPlacemark = ge.createPlacemark('');
  var polygon = ge.createPolygon('');
  polygonPlacemark.setGeometry(polygon);
  var outer = ge.createLinearRing('');
  polygon.setOuterBoundary(outer);

  // Square outer boundary.
  var center = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
  var coords = outer.getCoordinates();
  var lat = center.getLatitude();
  var lon = center.getLongitude();
  coords.pushLatLngAlt(lat - .05, lon - .05, 0);
  coords.pushLatLngAlt(lat - .05, lon + .05, 0);
  coords.pushLatLngAlt(lat + .05, lon + .05, 0);
  coords.pushLatLngAlt(lat + .05, lon - .05, 0);

  // Another square as the inner boundary.  Note that we can create
  // any number of inner boundaries.
  var innerBoundary = ge.createLinearRing('');
  polygon.getInnerBoundaries().appendChild(innerBoundary);
  coords = innerBoundary.getCoordinates();
  coords.pushLatLngAlt(lat - .02, lon - .02, 0);
  coords.pushLatLngAlt(lat - .02, lon + .02, 0);
  coords.pushLatLngAlt(lat + .02, lon + .02, 0);
  coords.pushLatLngAlt(lat + .02, lon - .02, 0);

  ge.getFeatures().appendChild(polygonPlacemark);
}

google.setOnLoadCallback(init);