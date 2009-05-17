var ge;
google.load("earth", "1");

function init() {
    // Create button
  var content = document.getElementById('content');
  var inputHTML = '<input type="button" value="Create Ground Overlay!" ' +
                  'onclick="createGroundOverlay()" />';
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

  var la = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
  la.setRange(200000);
  la.setHeading(45);
  la.setTilt(45);
  ge.getView().setAbstractView(la);

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

function createGroundOverlay() {
  var groundOverlay = ge.createGroundOverlay('');
  groundOverlay.setIcon(ge.createIcon(''))
  groundOverlay.getIcon().
          setHref("http://www.google.com/intl/en_ALL/images/logo.gif");
  groundOverlay.setLatLonBox(ge.createLatLonBox(''));

  var center = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
  var north = center.getLatitude() + .35;
  var south = center.getLatitude() - .35;
  var east = center.getLongitude() + .55;
  var west = center.getLongitude() - .55;
  var rotation = 0;
  var latLonBox = groundOverlay.getLatLonBox();
  latLonBox.setBox(north, south, east, west, rotation);

  ge.getFeatures().appendChild(groundOverlay);
}

google.setOnLoadCallback(init);