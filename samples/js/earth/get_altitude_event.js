var ge;
google.load("earth", "1");

function init() {
    // Create altitude monitor HTML.
  var content = document.getElementById('content');
  var inputHTML = 'Ground Altitude at Mouse: ' +
                  '<span id="ground-altitude" style="color:#ccc;">N/A</span>';
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

  ge.getLayerRoot().enableLayerById(ge.LAYER_TERRAIN, true);

  // Fly to the Grand Canyon
  var la = ge.createLookAt('');
  la.set(36.20839, -112.45803, 0, ge.ALTITUDE_RELATIVE_TO_GROUND,
          -30, 40, 10000);
  ge.getView().setAbstractView(la);

  // listen to the click event on the globe and window
  google.earth.addEventListener(ge.getWindow(), 'mousemove', function(event) {
    var statusHTML = 'N/A';
    if (event.getDidHitGlobe()) {
      var latitude = event.getLatitude();
      var longitude = event.getLongitude();

      var groundAltitude = ge.getGlobe().getGroundAltitude(latitude, longitude);
      if (groundAltitude) {
        statusHTML = '<span style="color:#000; font-weight:bold;">' +
                     groundAltitude.toFixed(2) + ' meters</span>';
      }
    }

    document.getElementById('ground-altitude').innerHTML = statusHTML;
  });

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

google.setOnLoadCallback(init);