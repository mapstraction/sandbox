var ge;
var placemark;
var counter = 0;

google.load("earth", "1");

function init() {
 // Create stylize button.
  var content = document.getElementById('content');
  var inputHTML = '<input type="button" onclick="stylize()" value="Stylize Placemark!"/>';
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

  // create the placemark
  placemark = ge.createPlacemark('');

  var point = ge.createPoint('');
  point.setLatitude(37);
  point.setLongitude(-122);
  placemark.setGeometry(point);

  // add the placemark to the earth DOM
  ge.getFeatures().appendChild(placemark);

  // look at the placemark we created
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

function stylize() {
  // Apply stylemap to a placemark
  counter++;
  map = ge.createStyleMap('styleMap' + counter);

  // Create icon normal for style map
  normal = ge.createIcon('');
  normal.setHref('http://maps.google.com/mapfiles/kml/shapes/triangle.png');
  iconNormal = ge.createStyle('styleIconNormal' + counter);
  iconNormal.getIconStyle().setIcon(normal);

  // Create icon highlight for style map
  highlight = ge.createIcon('');
  highlight.setHref('http://maps.google.com/mapfiles/kml/shapes/square.png');
  iconHighlight = ge.createStyle('styleIconHighlight' + counter);
  iconHighlight.getIconStyle().setIcon(highlight);

  // Set normal and highlight icons for stylemap.
  // This is different than creating a style map in createplacemark.js.
  // This example uses a url rather than a style.
  map.setNormalStyleUrl('#styleIconNormal' + counter);
  map.setHighlightStyleUrl('#styleIconHighlight' + counter);

  // Apply stylemap to placemark. Ensure that the inline style
  // selector is null since an inline style selector takes
  // precedence over shared styles.
  placemark.setStyleSelector(null);  // inline style
  placemark.setStyleUrl('#styleMap' + counter);  // shared style
}

google.setOnLoadCallback(init);