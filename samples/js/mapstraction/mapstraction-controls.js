function initialize() {
    var mapstraction = new Mapstraction('map_canvas','google');
    var myPoint = new LatLonPoint(37.404196,-122.008194);
    mapstraction.setCenterAndZoom(myPoint, 9);

/* args = {
 *     pan:      true,
 *     zoom:     'large' || 'small',
 *     overview: true,
 *     scale:    true,
 *     map_type: true,
 * }
 */
    mapstraction.addControls({
        pan: true, 
        zoom: 'small',
        map_type: true 
    });
}