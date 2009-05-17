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

  // Sample KML taken from
  //   http://code.google.com/apis/kml/documentation/kml_tut.html#polygons
  var pentagon = ge.parseKml(
          '<?xml version="1.0" encoding="UTF-8"?>' +
          '<kml xmlns="http://www.opengis.net/kml/2.2">' +
          '  <Placemark>' +
          '    <name>The Pentagon</name>' +
          '    <Polygon>' +
          '      <extrude>1</extrude>' +
          '      <altitudeMode>relativeToGround</altitudeMode>' +
          '      <outerBoundaryIs>' +
          '        <LinearRing>' +
          '          <coordinates>' +
          '            -77.05788457660967,38.87253259892824,100 ' +
          '            -77.05465973756702,38.87291016281703,100 ' +
          '            -77.05315536854791,38.87053267794386,100 ' +
          '            -77.05552622493516,38.868757801256,100 ' +
          '            -77.05844056290393,38.86996206506943,100 ' +
          '            -77.05788457660967,38.87253259892824,100' +
          '          </coordinates>' +
          '        </LinearRing>' +
          '      </outerBoundaryIs>' +
          '      <innerBoundaryIs>' +
          '        <LinearRing>' +
          '          <coordinates>' +
          '            -77.05668055019126,38.87154239798456,100 ' +
          '            -77.05542625960818,38.87167890344077,100 ' +
          '            -77.05485125901024,38.87076535397792,100 ' +
          '            -77.05577677433152,38.87008686581446,100 ' +
          '            -77.05691162017543,38.87054446963351,100 ' +
          '            -77.05668055019126,38.87154239798456,100' +
          '          </coordinates>' +
          '        </LinearRing>' +
          '      </innerBoundaryIs>' +
          '    </Polygon>' +
          '  </Placemark>' +
          '</kml>');

  ge.getFeatures().appendChild(pentagon);

  // Fly to the Pentagon
  var la = ge.createLookAt('');
  la.set(38.867, -77.0565, 500, ge.ALTITUDE_RELATIVE_TO_GROUND, 0, 45, 900);
  ge.getView().setAbstractView(la);

  document.getElementById('installed-plugin-version').innerHTML =
      ge.getPluginVersion().toString();
}

function failureCB(errorCode) {
}

google.setOnLoadCallback(init);