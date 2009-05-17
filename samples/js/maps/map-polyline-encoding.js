function initialize() {
  if (GBrowserIsCompatible()) {
    var map = new GMap2(document.getElementById("map_canvas"));
    map.setCenter(new GLatLng(40.71213418976525, -73.96785736083984), 15);
    map.addControl(new GSmallMapControl());
    map.addControl(new GMapTypeControl());       
    map.setMapType(G_SATELLITE_MAP);

    // Add an encoded polyline.
    var encodedPoints = "iuowFf{kbMzH}N`IbJb@zBpYzO{dAvfF{LwDyN`_@`NzKqB|Ec@|L}BKmBbCoPjrBeEdy@uJ`Mn@zoAer@bjA~Xz{JczBa]pIps@de@tW}rCdxSwhPl`XgikCl{soA{dLdAaaF~cCyxCk_Aao@jp@kEvnCgoJ`]y[pVguKhCkUflAwrEzKk@yzCv^k@?mI";
    var encodedLevels = "B????????????????????????????????????B";

    var encodedPolyline = new GPolyline.fromEncoded({
      color: "#3333cc",
      weight: 10,
      points: encodedPoints,
      levels: encodedLevels,
      zoomFactor: 32,
      numLevels: 4
    });
    map.addOverlay(encodedPolyline);
  }
}
