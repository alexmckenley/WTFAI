/* global google */
angular.module('wtfai.controllers.map', [
    'map.styles',
    'map.neighborhoods'
])
    .controller('MapCtrl', function($scope, $timeout, mapStyles, mapService, neighborhoods) {
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
            });
        };
    });
