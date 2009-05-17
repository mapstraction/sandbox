var ge;
google.load("earth", "1");

function init() {
  // Create Load 3D Model button
  var content = document.getElementById('content');
  content.innerHTML = '<input type="button" onclick="create3dModel()" ' +
                      'value="Load the 3D Model!"/>';

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
  la.setRange(100000);
  ge.getView().setAbstractView(la);

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

function create3dModel() {
  // Create a 3D model, initialize it from a Collada file, and place it
  // in the world.

  placemark = ge.createPlacemark('');
  placemark.setName('model');
  model = ge.createModel('');
  ge.getFeatures().appendChild(placemark);
  loc = ge.createLocation('');
  model.setLocation(loc);
  link = ge.createLink('');

  // A textured model created in Sketchup and exported as Collada.
  var href = window.location.href;
  var modelPath = 'http://earth-api-samples.googlecode.com/svn/' +
                  'trunk/examples/static/splotchy_box.dae';
  link.setHref(modelPath);
  model.setLink(link);

  la = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
  loc.setLatitude(la.getLatitude());
  loc.setLongitude(la.getLongitude());

  placemark.setGeometry(model);

  la.setRange(300);
  la.setTilt(45);
  ge.getView().setAbstractView(la);
}

google.setOnLoadCallback(init);