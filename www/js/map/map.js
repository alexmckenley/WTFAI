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
//                var found = geoJsonHelpers.pointInPolygon(point, );
//                console.log(found);

            });

            console.log(geoJsonHelpers);
        };
    });
