var ge;
google.load("earth", "1");

function init() {
  addKMLTextBox();

  google.earth.createInstance('content', initCB, failureCB);
}

function addKMLTextBox() {
  var html = 'Parse this KML:';
  html += '<textarea id="kml-box" rows="10" cols="50" wrap="off" ' +
          'style="font-family: monospace; font-size: small">';
  html += '&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;\n';
  html += '&lt;kml xmlns=&quot;http://www.opengis.net/kml/2.2&quot;&gt;\n';
  html += '  &lt;Placemark&gt;\n';
  html += '    &lt;name&gt;Test Placemark&lt;/name&gt;\n';
  html += '    &lt;Point&gt;\n';
  html += '      &lt;coordinates&gt;\n';
  html += '        -122,37,0\n';
  html += '      &lt;/coordinates&gt;\n';
  html += '    &lt;/Point&gt;\n';
  html += '    &lt;/Placemark&gt;\n';
  html += '&lt;/kml&gt;</textarea>';
  html += '<input type="button" onclick="parseKmlFromTextarea();" ' +
          'value="Parse and Add this KML!"/>'

  document.getElementById('content').innerHTML = html;
}

function initCB(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);


  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

  // look at the San Francisco
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

function parseKmlFromTextarea() {
  // remove the old parsed KML object if one exists
  if (currentKmlObject)
    ge.getFeatures().removeChild(currentKmlObject);

  var kmlBox = document.getElementById('kml-box');
  var kmlString = kmlBox.value;

  // parse the text in the box and add it to Earth
  try {
    currentKmlObject = ge.parseKml(kmlString);
    ge.getFeatures().appendChild(currentKmlObject);
  } catch (ex) {
    alert('Parse error');
  }
}

google.setOnLoadCallback(init);