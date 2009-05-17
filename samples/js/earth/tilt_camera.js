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

  var oldFlyToSpeed = ge.getOptions().getFlyToSpeed();
  ge.getOptions().setFlyToSpeed(100);
  go = function(count) {
    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
    lookAt.setLatitude(lookAt.getLatitude() + .1);
    lookAt.setLongitude(lookAt.getLongitude() + 5);
    ge.getView().setAbstractView(lookAt);
    if (count < 40) {
      setTimeout('go(' + (count+1) + ')', 50);
    } else {
      ge.getOptions().setFlyToSpeed(oldFlyToSpeed);
    }
  };

  go(0);

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

google.setOnLoadCallback(init);