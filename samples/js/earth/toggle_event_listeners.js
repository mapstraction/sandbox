var ge;
var placemark;

google.load("earth", "1");

function init() {
  // Create two buttons that will enable/disable listener.
  var content = document.getElementById('content');
  var inputHTML = '<input type="button" value="Enable Click Listener" onclick="enableListener()" />';
  inputHTML += '<input type="button" value="Disable Click Listener" onclick="disableListener()" />';
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

// global state
var eventListenerActive;

function enableListener() {
  if (!eventListenerActive) {
    google.earth.addEventListener(placemark, 'click', myEventHandler);
    eventListenerActive = true;
  }
}

function disableListener() {
  if (eventListenerActive) {
    google.earth.removeEventListener(placemark, 'click', myEventHandler);
    eventListenerActive = false;
  }
}

function myEventHandler(event) {
  alert('You clicked the placemark!');
}

google.setOnLoadCallback(init);