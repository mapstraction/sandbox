var ge;
google.load("earth", "1");

function init() {
   // Create networklink button.
  var content = document.getElementById('content');
  var inputHTML = '<input type="button" onclick="createNetworkLink()" ' +
                  'value="Create NetworkLink!"/>';
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

function createNetworkLink() {
  var networkLink = ge.createNetworkLink("");
  networkLink.setDescription("NetworkLink open to fetched content");
  networkLink.setName("Open NetworkLink");
  networkLink.setFlyToView(true);

  // create a Link object
  var link = ge.createLink("");
  link.setHref("http://kml-samples.googlecode.com" +
               "/svn/trunk/kml/NetworkLink/placemark.kml");

  // attach the Link to the NetworkLink
  networkLink.setLink(link);

  // add the NetworkLink feature to Earth
  ge.getFeatures().appendChild(networkLink);
}

google.setOnLoadCallback(init);