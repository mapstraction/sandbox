var ge;
var placemark;

google.load("earth", "1");

function init() {
  // Create two buttons that will create and delete the balloon.
  var content = document.getElementById('content');
  var inputHTML = '<input type="button" value="Show Feature Balloon!" onclick="createFeatureBalloon()" />';
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

  // give the placemark a name and a description (a balloon will
  // automatically show on click)
  placemark.setName('Placemark 1');
  placemark.setDescription('This is the coolest placemark ever.');

  var pluginVersion = ge.getPluginVersion().toString();
  document.getElementById('installed-plugin-version').innerHTML = 'Version: ' +
                                                                  pluginVersion;
}

function failureCB(errorCode) {}

function createFeatureBalloon() {
  var balloon = ge.createFeatureBalloon('');
  balloon.setMaxWidth(300);
  balloon.setFeature(placemark);
  ge.setBalloon(balloon);
}


function deleteBalloon() {
  ge.setBalloon(null);
}

google.setOnLoadCallback(init);