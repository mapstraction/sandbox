var ge;
var placemark;

google.load("earth", "1");

function init() {
    // Create two buttons that will show/hide buildings.
  var content = document.getElementById('content');
  var inputHTML = '<input type="button" value="Show Buildings" onclick="showBuildings()" />';
  inputHTML += '<input type="button" value="Hide Buildings" onclick="hideBuildings()" />';
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
  // Fly to San Francisco
  var la = ge.createLookAt('');
  la.set(37.79333, -122.40, 0, ge.ALTITUDE_RELATIVE_TO_GROUND, 0, 70, 1000);
  ge.getView().setAbstractView(la);

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

function showBuildings() {
  ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, true);

  setTimeout(function() {
    var la = ge.createLookAt('');
    la.set(37.79333, -122.40, 0, ge.ALTITUDE_RELATIVE_TO_GROUND,
            180, 50, 1000);
    ge.getView().setAbstractView(la);
  }, 10000);
}

function hideBuildings() {
  ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, false);
}

function alertBuildingsVisible() {
  alert(getInheritedVisibility(
          ge.getLayerRoot().getLayerById(ge.LAYER_BUILDINGS)) ?
        'Buildings are visible' : 'Buildings are NOT visible');
}

function getInheritedVisibility(layer) {
  if (layer.getVisibility() == false) {
    return false;
  } else {
    var parent = layer.getParentNode();
    if (!parent)
      return true;

    return getInheritedVisibility(parent);
  }
}

google.setOnLoadCallback(init);
