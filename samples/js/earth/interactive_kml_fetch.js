var ge;

// store the object loaded for the given file... initially none of the objects
// are loaded, so initialize these to null
var currentKmlObjects = {
  'red': null,
  'yellow': null,
  'green': null
};

google.load("earth", "1");

function init() {
  // Create checkboxes
  var content = document.getElementById('content');
  var inputHTML = 'Placemarks:<br/>';
  inputHTML += '<input type="checkbox" id="kml-red-check" onclick="toggleKml(\'red\');"/>' +
               '<label for="kml-red-check">Red</label>' +
               '<input type="checkbox" id="kml-yellow-check" onclick="toggleKml(\'yellow\');"/>' +
               '<label for="kml-yellow-check">Yellow</label>' +
               '<input type="checkbox" id="kml-green-check" onclick="toggleKml(\'green\');"/>' +
               '<label for="kml-green-check">Green</label>';
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

  // if the page loaded with checkboxes checked, load the appropriate
  // KML files
  if (document.getElementById('kml-red-check').checked)
    loadKml('red');

  if (document.getElementById('kml-yellow-check').checked)
    loadKml('yellow');

  if (document.getElementById('kml-green-check').checked)
    loadKml('green');

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

function toggleKml(file) {
  // remove the old KML object if it exists
  if (currentKmlObjects[file]) {
    ge.getFeatures().removeChild(currentKmlObjects[file]);
    currentKmlObject = null;
  }

  // if the checkbox is checked, fetch the KML and show it on Earth
  var kmlCheckbox = document.getElementById('kml-' + file + '-check');
  if (kmlCheckbox.checked)
    loadKml(file);
}

function loadKml(file) {
  var kmlUrl = 'http://earth-api-samples.googlecode.com/svn/trunk/' +
               'examples/static/' + file + '.kml';

  // fetch the KML
  google.earth.fetchKml(ge, kmlUrl, function(kmlObject) {
    // NOTE: we still have access to the 'file' variable (via JS closures)

    if (kmlObject) {
      // show it on Earth
      currentKmlObjects[file] = kmlObject;
      ge.getFeatures().appendChild(kmlObject);
    } else {
      // bad KML
      currentKmlObjects[file] = null;
      alert('Bad KML');

      // uncheck the box
      document.getElementById('kml-' + file + '-check').checked = '';
    }
  });
}

google.setOnLoadCallback(init);