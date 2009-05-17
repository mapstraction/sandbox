var ge;
var placemark;
var dragInfo = null;

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
  placemark.setName('Drag Me!');

  // listen for mousedown on the window (look specifically for point placemarks)
  google.earth.addEventListener(ge.getWindow(), 'mousedown', function(event) {
    if (event.getTarget().getType() == 'KmlPlacemark' &&
        event.getTarget().getGeometry().getType() == 'KmlPoint') {
      //event.preventDefault();
      var placemark = event.getTarget();

      dragInfo = {
        placemark: event.getTarget(),
        dragged: false
      };
    }
  });

  // listen for mousemove on the globe
  google.earth.addEventListener(ge.getGlobe(), 'mousemove', function(event) {
    if (dragInfo) {
      event.preventDefault();
      var point = dragInfo.placemark.getGeometry();
      point.setLatitude(event.getLatitude());
      point.setLongitude(event.getLongitude());
      dragInfo.dragged = true;
    }
  });

  // listen for mouseup on the window
  google.earth.addEventListener(ge.getWindow(), 'mouseup', function(event) {
    if (dragInfo) {
      if (dragInfo.dragged) {
        // if the placemark was dragged, prevent balloons from popping up
        event.preventDefault();
      }

      dragInfo = null;
    }
  });

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}


google.setOnLoadCallback(init);