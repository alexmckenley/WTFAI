/* global google */
angular.module('wtfai.controllers.map', [
    'map.neighborhoods',
    'wtfai.services.geoJsonHelpers',
    'wtfai.services.initialMapSettings'
])
    .controller('MapCtrl', function($scope, mapService, neighborhoods, initialMapSettings) {
        var Ctrl = this;
        Ctrl.map = {};
        Ctrl.thisHood = {};
        Ctrl.neighborhoods = neighborhoods;

        //san francisco setting
        Ctrl.mapSettings = initialMapSettings;

        // triggered when footer is clicked
        // if there is a neighborhood already, clear it and display button
        // if not:
            // find current location, zoom to it
            // display current neighborhood and color
        Ctrl.wtfai = function() {
            if (Ctrl.thisHood.name) {
                Ctrl.thisHood = {};
                return;
            } else {
                var map = Ctrl.map.getGMap();
                mapService.displayCurrentLocation(map)
                .then(function(hood) {
                    hood.isCurrent = true;
                    Ctrl.thisHood = hood;
                });
            }
        };

        // handles click events on neighborhoods
        Ctrl.createClickHandler = function(hood) {
            return function() {
                $scope.$apply(function() {
                    Ctrl.thisHood = hood;
                });
            };
        };
    });
