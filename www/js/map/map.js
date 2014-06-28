/* global google */
angular.module('wtfai.controllers.map', [
    'map.styles',
    'map.neighborhoods',
    'wtfai.services.geoJsonHelpers'
])
    .controller('MapCtrl', function($scope, $timeout, mapStyles, mapService, neighborhoods, geoJsonHelpers) {
        var Ctrl = this;
        Ctrl.map = {};
        Ctrl.mapSettings = {
            center: {
                latitude: 37.759464,
                longitude: -122.439231
            },
            zoom: 11,
            options: {
                styles: mapStyles
            }
        };

        Ctrl.neighborhoods = neighborhoods;

        var deregister = $scope.$watch('MapCtrl.map', function() {
            if(typeof Ctrl.map.getGMap === 'function') {
                Ctrl.map.getGMap().data.addGeoJson(neighborhoods);
                deregister();
            }
        });



        Ctrl.wtfai = function() {
            mapService.getCurrentLocation()
            .then(function(pos) {
                Ctrl.currentPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                Ctrl.map.getGMap().panTo(Ctrl.currentPos);
                Ctrl.map.getGMap().setZoom(15);

                var point = {
                    type: 'Point',
                    coordinates: [
                        pos.coords.latitude,
                        pos.coords.longitude
                    ]
                };
                var found = geoJsonHelpers.pointInPolygon(point, {
                    "coordinates": [
                        [
                            [-122.391701, 37.794113],
                            [-122.39198, 37.793906],
                            [-122.391614, 37.793571],
                            [-122.391714, 37.793459],
                            [-122.388816, 37.791005],
                            [-122.388932, 37.790919],
                            [-122.388616, 37.790348],
                            [-122.388076, 37.790518],
                            [-122.388375, 37.790334],
                            [-122.388225, 37.790032],
                            [-122.385852, 37.790951],
                            [-122.385496, 37.790559],
                            [-122.387589, 37.789838],
                            [-122.387289, 37.789347],
                            [-122.385303, 37.789838],
                            [-122.38512, 37.789313],
                            [-122.387174, 37.788807],
                            [-122.387032, 37.788255],
                            [-122.385261, 37.788537],
                            [-122.385136, 37.788156],
                            [-122.38739, 37.787736],
                            [-122.387415, 37.787269],
                            [-122.3845, 37.787437],
                            [-122.384342, 37.785728],
                            [-122.387577, 37.785485],
                            [-122.38765, 37.784929],
                            [-122.385546, 37.785009],
                            [-122.385455, 37.784711],
                            [-122.387477, 37.784493],
                            [-122.387691, 37.784412],
                            [-122.387722, 37.783928],
                            [-122.385271, 37.784049],
                            [-122.38525, 37.78379],
                            [-122.38572, 37.783774],
                            [-122.38573, 37.78354],
                            [-122.386088, 37.783435],
                            [-122.387732, 37.783282],
                            [-122.387773, 37.782911],
                            [-122.388426, 37.781801],
                            [-122.388189, 37.784771],
                            [-122.388504, 37.785348],
                            [-122.389694, 37.786243],
                            [-122.39141, 37.785103],
                            [-122.39146, 37.7855],
                            [-122.393512, 37.784564],
                            [-122.394567, 37.783783],
                            [-122.396711, 37.785549],
                            [-122.398941, 37.783785],
                            [-122.400955, 37.785389],
                            [-122.399523, 37.786631],
                            [-122.39999, 37.787004],
                            [-122.401497, 37.785824],
                            [-122.403374, 37.787401],
                            [-122.403427, 37.787676],
                            [-122.393875, 37.795248],
                            [-122.392429, 37.793835],
                            [-122.391701, 37.794113]
                        ]
                    ],
                    "type": "Polygon"
                });
                console.log(found);

            });

            console.log(geoJsonHelpers);
        };
    });
