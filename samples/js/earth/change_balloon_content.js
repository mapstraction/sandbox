var ge;
var placemark;

google.load("earth", "1");

function init() {
  // Create two buttons that will create and change the balloon.
  var content = document.getElementById('content');
  var inputHTML = '<input type="button" value="Create Balloon" onclick="createBalloon()" />';
  inputHTML += '<input type="button" value="Change Balloon" onclick="changeBalloon()" />';
  content.innerHTML = inputHTML;

  google.earth.createInstance('content', initCB, failureCB);
}

function failureCB(errorCode) {}

function initCB(instance) {
  // Store our Google Earth instance.
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
  document.getElementById('installed-plugin-version').innerHTML = pluginVersion;
}

function createBalloon() {
  var balloon = ge.createHtmlStringBalloon('');
  balloon.setFeature(placemark); // optional
  balloon.setMaxWidth(300);

  // Google logo.
  balloon.setContentString(
          '<img src="http://www.google.com/intl/en_ALL/images/logo.gif"><br>' +
          '<font size=20>Earth Plugin</font><br><font size=-2>sample info ' +
          'window</font>');

  ge.setBalloon(balloon);
}

function changeBalloon() {
  // Change the context of the current balloon.
  var balloon = ge.getBalloon();
  if (balloon) {
    // Pigeon Rank
    var content =
            '<img src="http://www.google.com/technology/pigeon_system.jpg">' +
            '<br>PigeonRank&#153; Technology';
    balloon.setFeature(placemark); // optional
    balloon.setMaxWidth(800);

    if (balloon.getType() == 'GEHtmlStringBalloon') {
      balloon.setContentString(content);
    } else if (balloon.getType() == 'GEHtmlDivBalloon') {
      var div = document.createElement('DIV');
      div.innerHTML = content;
      balloon.setContentDiv(div);
    } else if (balloon.getType() == 'GEFeatureBalloon') {
      placemark.setDescription(content);
    }
  }
}

google.setOnLoadCallback(init);