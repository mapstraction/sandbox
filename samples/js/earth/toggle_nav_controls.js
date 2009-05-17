var ge;
google.load("earth", "1");

function init() {
  // Create toggle buttons.
  var content = document.getElementById('content');
  var inputHTML = '<div>Navigation Control Visibility</div>' +
                  '<input type="button" onclick="visShow()" value="Show"/>' +
                  '<input type="button" onclick="visAuto()" value="Auto Show/Hide"/>' +
                  '<input type="button" onclick="visHide()" value="Hide"/>' +
                  '<div>Position</div>' +
                  '<input type="button" onclick="posTopLeft()" value="TL"/>' +
                  '<input type="button" onclick="posTopRight()" value="TR"/><br/>' +
                  '<input type="button" onclick="posBottomLeft()" value="BL"/>' +
                  '<input type="button" onclick="posBottomRight()" value="BR"/>';
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

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

// visibility
function visShow() {
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_SHOW);
}

function visAuto() {
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);
}

function visHide() {
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_HIDE);
}

// position
function posTopLeft() {
  ge.getNavigationControl().getScreenXY().setXUnits(ge.UNITS_PIXELS);
  ge.getNavigationControl().getScreenXY().setYUnits(ge.UNITS_INSET_PIXELS);
}

function posTopRight() {
  ge.getNavigationControl().getScreenXY().setXUnits(ge.UNITS_INSET_PIXELS);
  ge.getNavigationControl().getScreenXY().setYUnits(ge.UNITS_INSET_PIXELS);
}

function posBottomLeft() {
  ge.getNavigationControl().getScreenXY().setXUnits(ge.UNITS_PIXELS);
  ge.getNavigationControl().getScreenXY().setYUnits(ge.UNITS_PIXELS);
}

function posBottomRight() {
  ge.getNavigationControl().getScreenXY().setXUnits(ge.UNITS_INSET_PIXELS);
  ge.getNavigationControl().getScreenXY().setYUnits(ge.UNITS_PIXELS);
}

google.setOnLoadCallback(init);