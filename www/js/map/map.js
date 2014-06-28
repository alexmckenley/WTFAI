/* global google */

angular.module('map', [])
    .controller('MapCtrl', function($scope) {
        var Ctrl = this;
        Ctrl.test = "hello world";

        Ctrl.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };

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
    });
