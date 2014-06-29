/* global google */
angular.module('wtfai.controllers.map', [
    'map.styles',
    'map.neighborhoods',
    'wtfai.services.geoJsonHelpers'
])
    .controller('MapCtrl', function($scope, $timeout, mapStyles, mapService, neighborhoods, geoJsonHelpers) {
        var Ctrl = this;
        Ctrl.map = {};
        Ctrl.currentHood = {};
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
                var map = Ctrl.map.getGMap();

                var point = {
                    type: 'Point',
                    coordinates: [
                        pos.coords.latitude,
                        pos.coords.longitude
                    ]
                };

                mapService.zoomToCurrentLocation(map, map.getZoom(), 15, Ctrl.currentPos);
                var marker = new google.maps.Marker({
                    position: Ctrl.currentPos,
                    map: map,
                    title: 'Where the fuck am I?!?!'
                });
            });
        };

        Ctrl.showHood = function(hood) {
            Ctrl.myHood = hood;
        };

        Ctrl.createClickHandler = function(hood) {
            return function() {
                $scope.$apply(function() {
                    Ctrl.currentHood = hood;
                });
            };
        };
    });
