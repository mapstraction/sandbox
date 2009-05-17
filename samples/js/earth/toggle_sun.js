var ge;
google.load("earth", "1");

function init() {
  // Create two buttons that will toggle sun mode.
  var content = document.getElementById('content');
  var inputHTML = '<input type="button" value="Show Sun" onclick="showSun()" />' +
                  '<input type="button" value="Hide Sun" onclick="hideSun()" />';
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

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

function showSun() {
  ge.getSun().setVisibility(true);
}

function hideSun() {
  ge.getSun().setVisibility(false);
}

google.setOnLoadCallback(init);