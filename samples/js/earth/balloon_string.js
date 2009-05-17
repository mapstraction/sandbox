var ge;
var placemark;

google.load("earth", "1");

function init() {
  // Create two buttons that will create and delete the balloon.
  var content = document.getElementById('content');
  var inputHTML = '<input type="button" value="Show a String Balloon!" onclick="createStringBalloon();" />';
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

  var pluginVersion = ge.getPluginVersion().toString();
  document.getElementById('installed-plugin-version').innerHTML = 'Version: ' +
                                                                   pluginVersion;
}

function failureCB(errorCode) {}

function createStringBalloon() {
  var balloon = ge.createHtmlStringBalloon('');
  balloon.setFeature(placemark); // optional
  balloon.setMaxWidth(300);

  // Google logo.
  balloon.setContentString(
      '<img src="http://www.google.com/intl/en_ALL/images/logo.gif"><br>'
      + '<font size=20>Earth Plugin</font><br><font size=-2>sample info '
      + 'window</font>');

  ge.setBalloon(balloon);
}


google.setOnLoadCallback(init);