/* global google */
angular.module('wtfai.controllers.map', ['map.styles'])
    .controller('MapCtrl', function($scope, $timeout, mapStyles, mapService) {
        var Ctrl = this;
        Ctrl.map = {};
        Ctrl.mapSettings = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 2,
            options: {
                styles: mapStyles
            }
        };

        Ctrl.wtfai = function() {
            mapService.getCurrentLocation()
            .then(function(pos) {
                Ctrl.currentPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                Ctrl.map.getGMap().panTo(Ctrl.currentPos);
                Ctrl.map.getGMap().setZoom(15);
            });
        };
    });
