var ge;
var lineStringPlacemark;

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

  function addToLineString(lineString, lat, lng, latOffset, lngOffset) {
    var altitude = 1.0; // give it some altitude
    lineString.getCoordinates().
            pushLatLngAlt(lat + latOffset, lng + lngOffset, altitude);
  }

  var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
  var lat = lookAt.getLatitude();
  var lng = lookAt.getLongitude();

  lineStringPlacemark = ge.createPlacemark('');
  var lineString = ge.createLineString('');
  lineStringPlacemark.setGeometry(lineString);
  lineString.setTessellate(true);

  // add the the points to the line string geometry
  addToLineString(lineString, lat, lng,   0,   0, 0);
  addToLineString(lineString, lat, lng, 1.5,  .5, 0);
  addToLineString(lineString, lat, lng,   0, 1.0, 0);
  addToLineString(lineString, lat, lng, 1.5, 1.5, 0);
  addToLineString(lineString, lat, lng,   0, 2.0, 0);
  addToLineString(lineString, lat, lng, 1.5, 2.5, 0);
  addToLineString(lineString, lat, lng,   0, 3.0, 0);
  addToLineString(lineString, lat, lng, 1.5, 3.5, 0);
  addToLineString(lineString, lat, lng,   0, 4.0, 0);
  addToLineString(lineString, lat, lng, 1.5, 4.5, 0);

  ge.getFeatures().appendChild(lineStringPlacemark);

  // zoom in to the linestring we created
  lookAt.setRange(1000000);
  ge.getView().setAbstractView(lookAt);


  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

function buttonClick() {
  // If lineStringPlacemark doesn't already have a Style associated
  // with it, we create it now.
  if (!lineStringPlacemark.getStyleSelector()) {
    lineStringPlacemark.setStyleSelector(ge.createStyle(''));
  }

  // The Style of a Feature is retrieved as feature.getStyleSelector().
  // The Style itself contains a LineStyle, which is what we manipulate
  // to change the color and width of the line.
  var lineStyle = lineStringPlacemark.getStyleSelector().getLineStyle();
  lineStyle.setWidth(lineStyle.getWidth() + 2);
  lineStyle.getColor().set('6600ffff');  // aabbggrr format
}

google.setOnLoadCallback(init);