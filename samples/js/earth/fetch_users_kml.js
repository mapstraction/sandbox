var ge;
google.load("earth", "1");

function init() {
    // Create two buttons that will start/stop animation.
  var content = document.getElementById('content');
  var defUrl = 'http://earth-api-samples.googlecode.com/svn/trunk/examples/static/red.kml';
  var inputHTML = '<input type="text" id="kml-url" size="50" ' +
                  'value="' + defUrl + '"/>' +
                  '<input type="submit" onclick="fetchKmlFromInput()" value="Fetch KML!"/>';
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

  // fly to Santa Cruz
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

var currentKmlObject = null;

function fetchKmlFromInput() {
  // remove the old KML object if it exists
  if (currentKmlObject) {
    ge.getFeatures().removeChild(currentKmlObject);
    currentKmlObject = null;
  }

  var kmlUrlBox = document.getElementById('kml-url');
  var kmlUrl = kmlUrlBox.value;

  google.earth.fetchKml(ge, kmlUrl, finishFetchKml);
}

function finishFetchKml(kmlObject) {
  // check if the KML was fetched properly
  if (kmlObject) {
    // add the fetched KML to Earth
    currentKmlObject = kmlObject;
    ge.getFeatures().appendChild(currentKmlObject);
  } else {
    alert('Bad KML');
  }
}

google.setOnLoadCallback(init);