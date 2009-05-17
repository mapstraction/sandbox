var ge;
var placemark;

google.load("earth", "1");

function init() {
  // Create two buttons that will toggle terrain.
  var content = document.getElementById('content');
  var inputHTML = '<input type="button" value="Hide Terrain" onclick="hideTerrain()" />' +
                  '<input type="button" value="Show Terrain" onclick="showTerrain()" />';
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
  // Fly to the Grand Canyon
  var la = ge.createLookAt('');
  la.set(36.291068, -112.4981896, 0, ge.ALTITUDE_RELATIVE_TO_GROUND,
          0, 80, 20000);
  ge.getView().setAbstractView(la);

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

function showTerrain() {
  var layerRoot = ge.getLayerRoot();
  var terrainLayer = layerRoot.getLayerById(ge.LAYER_TERRAIN);
  terrainLayer.setVisibility(true);

  // shortcut:
  // layerRoot.enableLayerById(ge.LAYER_TERRAIN, true);
}

function hideTerrain() {
  var layerRoot = ge.getLayerRoot();
  var terrainLayer = layerRoot.getLayerById(ge.LAYER_TERRAIN);
  terrainLayer.setVisibility(false);

  // shortcut:
  // layerRoot.enableLayerById(ge.LAYER_TERRAIN, false);
}


google.setOnLoadCallback(init);