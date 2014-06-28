/* global google */

angular.module('map', [])
    .controller('MapCtrl', function($scope) {
        var Ctrl = this;
        Ctrl.test = "hello world";

        navigator.geolocation.getCurrentPosition(function (pos) {
            // Ctrl.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            // Ctrl.loading.hide();
            $scope.$apply(function() {
                Ctrl.myLocation = pos;
                console.log('my location is', pos);
            });
        }, function (error) {
            alert('Unable to get location: ' + error.message);
        });

        var initializeMap = function() {
            console.log("here");
            var mapOptions = {
                center: new google.maps.LatLng(-34.397, 150.644),
                zoom: 8
            };
            Ctrl.map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);
        };
        initializeMap();

        //google.maps.event.addDomListener(window, 'load', initializeMap);
    });
