var ge;
var animRunning = false;
var ANIM_ALTITUDE = 100;

google.load("earth", "1");

function init() {
  // Create two buttons that will start/stop animation.
  var content = document.getElementById('content');
  var inputHTML = '<input type="button" value="Start Animation!" onclick="startAnimation()" />';
  inputHTML += '<input type="button" value="Stop Animation!" onclick="stopAnimation()" />';
  content.innerHTML = inputHTML;

  google.earth.createInstance('content', initCB, failureCB);
}

function initCB(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);


  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

  ge.getOptions().setMouseNavigationEnabled(false);

  var camera = ge.createCamera('');
  camera.set(37, -122, ANIM_ALTITUDE, ge.ALTITUDE_RELATIVE_TO_GROUND,
      0, 80, 0);
  ge.getView().setAbstractView(camera);

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

function startAnimation() {
  if (!animRunning) {
    ge.getOptions().setFlyToSpeed(ge.SPEED_TELEPORT);
    animRunning = true;
    google.earth.addEventListener(ge, 'frameend', tickAnimation);

    // start it off
    tickAnimation();
  }
}

function stopAnimation() {
  if (animRunning) {
    google.earth.removeEventListener(ge, 'frameend', tickAnimation);
    animRunning = false;
  }
}

function tickAnimation() {
  // an example of some camera manipulation that's possible w/ the Earth API
  var camera = ge.getView().copyAsCamera(ge.ALTITUDE_RELATIVE_TO_GROUND);
  var dest = destination(camera.getLatitude(), camera.getLongitude(), 10,
                         camera.getHeading());

  camera.setAltitude(ANIM_ALTITUDE);
  camera.setLatitude(dest[0]);
  camera.setLongitude(dest[1]);

  ge.getView().setAbstractView(camera);
}

/* Helper functions, courtesy of
   http://www.movable-type.co.uk/scripts/latlong.html */
function distance(lat1, lng1, lat2, lng2) {
  var a = Math.sin(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180);
  var b = Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.cos((lng2 - lng1) * Math.PI / 180);
  return 6371000 * Math.acos(a + b);
}

function destination(lat, lng, dist, heading) {
  lat *= Math.PI / 180;
  lng *= Math.PI / 180;
  heading *= Math.PI / 180;
  dist /= 6371000; // angular dist

  var lat2 = Math.asin(Math.sin(lat) * Math.cos(dist) +
                       Math.cos(lat) * Math.sin(dist) * Math.cos(heading));

  return [
      180 / Math.PI * lat2,
      180 / Math.PI *
        (lng + Math.atan2(Math.sin(heading) * Math.sin(dist) * Math.cos(lat2),
                          Math.cos(dist) - Math.sin(lat) * Math.sin(lat2)))];
}

google.setOnLoadCallback(init);