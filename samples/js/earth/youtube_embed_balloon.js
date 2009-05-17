var ge;
var placemark;

google.load("earth", "1");

function init() {
  var content = document.getElementById('content');
  content.innerHTML = '<i>Click the placemark</i>';

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
  placemark.setName('Click for a YouTube video!');

  google.earth.addEventListener(placemark, 'click', function(event) {
    // prevent the default balloon from popping up
    event.preventDefault();

    var balloon = ge.createHtmlStringBalloon('');
    balloon.setFeature(placemark); // optional
    balloon.setMaxWidth(400);

    // YouTube video embed... the &nbsp; in the beginning is a fix for IE6
    balloon.setContentString(
            '&nbsp;<object width="400" height="300"><param name="movie" '+
            'value="http://www.youtube.com/v/6mrG_bsqC6k&hl=en&fs=1"/>' +
            '<param name="allowFullScreen" value="true"/>' +
            '<embed src="http://www.youtube.com/v/6mrG_bsqC6k&hl=en&fs=1" ' +
            'type="application/x-shockwave-flash" allowfullscreen="true" ' +
            'width="400" height="300"></embed></object>');

    ge.setBalloon(balloon);
  });

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

google.setOnLoadCallback(init);