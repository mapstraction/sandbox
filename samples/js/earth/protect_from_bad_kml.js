var ge;
google.load("earth", "1");

function init() {
  var content = document.getElementById('content');
  content.innerHTML = '';

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

  // in this sample we will purposely attempt
  // to fetch a bad KML file (one that doesnt exist)

  function finished(object) {
    if (!object) {
      alert('bad or NULL kml');
    }
  }

  google.earth.fetchKml(ge, 'http://www.google.com/fakePlacemark.kml', finished);

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

google.setOnLoadCallback(init);