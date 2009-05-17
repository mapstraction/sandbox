function initialize() {
    var mapstraction = new Mapstraction('map_canvas','google');

    var myPoint = new LatLonPoint(37.4041960114344,-122.008194923401);
    mapstraction.setCenterAndZoom(myPoint, 3);
    mapstraction.addControls({zoom: 'large'});
    mapstraction.addOverlay("http://api.flickr.com/services/feeds/groups_pool.gne?id=322338@N20&format=rss_200&georss=1");
}