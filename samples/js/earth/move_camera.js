var ge;
google.load("earth", "1");

function init() {
  var content = document.getElementById('content');
  content.innerHTML = '<input type="button" value="Move the Camera!" onclick="moveCamera()" />';

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

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

function moveCamera() {
  var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
  lookAt.setLatitude(lookAt.getLatitude() + 2);
  lookAt.setLongitude(lookAt.getLongitude() + 20);
  ge.getView().setAbstractView(lookAt);
}

google.setOnLoadCallback(init);