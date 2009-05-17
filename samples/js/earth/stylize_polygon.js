var ge;
var polygonPlacemark;

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

  polygonPlacemark = ge.createPlacemark('');
  var polygon = ge.createPolygon('');
  polygonPlacemark.setGeometry(polygon);
  var outer = ge.createLinearRing('');
  polygon.setOuterBoundary(outer);

  // Square outer boundary.
  var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
  var coords = outer.getCoordinates();
  var lat = lookAt.getLatitude();
  var lon = lookAt.getLongitude();
  coords.pushLatLngAlt(lat - .05, lon - .05, 0);
  coords.pushLatLngAlt(lat - .05, lon + .05, 0);
  coords.pushLatLngAlt(lat + .05, lon + .05, 0);
  coords.pushLatLngAlt(lat + .05, lon - .05, 0);

  // Another square as the inner boundary.  Note that we can create
  // any number of inner boundaries.
  var innerBoundary = ge.createLinearRing('');
  polygon.getInnerBoundaries().appendChild(innerBoundary);
  coords = innerBoundary.getCoordinates();
  coords.pushLatLngAlt(lat - .02, lon - .02, 0);
  coords.pushLatLngAlt(lat - .02, lon + .02, 0);
  coords.pushLatLngAlt(lat + .02, lon + .02, 0);
  coords.pushLatLngAlt(lat + .02, lon - .02, 0);

  ge.getFeatures().appendChild(polygonPlacemark);

  // zoom in to the linestring we created
  lookAt.setRange(50000);
  ge.getView().setAbstractView(lookAt);

  stylize();

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

function stylize() {
  // If polygonPlacemark doesn't already have a Style associated
  // with it, we create it now.
  if (!polygonPlacemark.getStyleSelector()) {
    polygonPlacemark.setStyleSelector(ge.createStyle(''));
  }

  // The Style of a Feature is retrieved as
  // feature.getStyleSelector().  The Style itself contains a
  // LineStyle and a PolyStyle, which are what we manipulate to change
  // the line color, line width, and inner color of the polygon.
  var lineStyle = polygonPlacemark.getStyleSelector().getLineStyle();
  lineStyle.setWidth(lineStyle.getWidth() + 2);
  // Color is specified in 'aabbggrr' format.
  lineStyle.getColor().set('66ff0000');

  // Color can also be specified by individual color components.
  var polyColor =
          polygonPlacemark.getStyleSelector().getPolyStyle().getColor();
  polyColor.setA(200);
  polyColor.setB(0);
  polyColor.setG(255);
  polyColor.setR(255);
}

google.setOnLoadCallback(init);