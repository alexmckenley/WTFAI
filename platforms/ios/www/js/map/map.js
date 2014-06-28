angular.module('map', [])
    .controller('MapCtrl', function() {
        var Ctrl = this;
        Ctrl.test = "hello world";

        navigator.geolocation.getCurrentPosition(function (pos) {
            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            $scope.loading.hide();
            $scope.myLocation = pos;
        }, function (error) {
            alert('Unable to get location: ' + error.message);
        });
    });