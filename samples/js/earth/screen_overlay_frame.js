var ge;
google.load("earth", "1");

function init() {
  document.getElementById('content').innerHTML = '';

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

  var screenOverlay = ge.createScreenOverlay('');

  // Set the visibility to false while we construct the overlay.
  screenOverlay.setVisibility(false);

  // The plugin currently only accepts absolute URLs, so we retrieve the
  // URL of the current page in order to construct an absolute URL for
  // the PNG file we are about to fetch.
  var href = window.location.href;
  var pagePath = href.substring(0, href.lastIndexOf('/')) + '/';

  var icon = ge.createIcon('');
  // Loads an gilded picture frame.
  icon.setHref('http://earth-api-samples.googlecode.com/svn/trunk/examples/static/frame.png');
  screenOverlay.setIcon(icon);

  // Position the overlay.  ScreenXY(0,0) is mapped to OverlayXY(0,0)
  var screenXY = screenOverlay.getScreenXY();
  screenXY.setXUnits(ge.UNITS_PIXELS);
  screenXY.setYUnits(ge.UNITS_PIXELS);
  screenXY.setX(0);
  screenXY.setY(0);

  var overlayXY = screenOverlay.getOverlayXY();
  overlayXY.setXUnits(ge.UNITS_PIXELS);
  overlayXY.setYUnits(ge.UNITS_PIXELS);
  overlayXY.setX(0);
  overlayXY.setY(0);

  // Set object's size in fractions of the 3d view window.  By setting
  // to (1, 1), this image will cover the entire Earth window.
  var overlaySize = screenOverlay.getSize()
  overlaySize.setXUnits(ge.UNITS_FRACTION);
  overlaySize.setYUnits(ge.UNITS_FRACTION);
  overlaySize.setX(1);
  overlaySize.setY(1);

  screenOverlay.setVisibility(true);

  ge.getFeatures().appendChild(screenOverlay);

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

google.setOnLoadCallback(init);