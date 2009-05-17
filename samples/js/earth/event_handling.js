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

  function eventHandler(event) {
    var text = 'Click:';

    function addToMessage(append1, append2) {
      text += ' ' + append1 + ': ' + append2 + '\n' ;
    }

    addToMessage('target type', event.getTarget().getType());
    addToMessage('currentTarget type',
            event.getCurrentTarget().getType());
    addToMessage('button', event.getButton());
    addToMessage('clientX', event.getClientX());
    addToMessage('clientY', event.getClientY());
    addToMessage('screenX', event.getScreenX());
    addToMessage('screenY', event.getScreenY());
    addToMessage('latitude', event.getLatitude());
    addToMessage('longitude', event.getLongitude());
    addToMessage('altitude', event.getAltitude());
    addToMessage('didHitGlobe', event.getDidHitGlobe());
    addToMessage('altKey', event.getAltKey());
    addToMessage('ctrlKey', event.getCtrlKey());
    addToMessage('shiftKey', event.getShiftKey());
    addToMessage('timeStamp', event.getTimeStamp());

    // Prevent default balloon from popping up for marker placemarks
    event.preventDefault();

    alert(text);
  }
  // listen to the click event on the globe and window
  google.earth.addEventListener(ge.getGlobe(), 'click', eventHandler);
  google.earth.addEventListener(ge.getWindow(), 'click', eventHandler);

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

google.setOnLoadCallback(init);