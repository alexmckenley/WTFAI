/* global google */
angular.module('map', ['map.styles'])
    .controller('MapCtrl', function($scope, $timeout, mapStyles) {
        var Ctrl = this;
        Ctrl.map = {};
        Ctrl.mapSettings = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 1,
            options: {
                styles: mapStyles
            }
        };

        Ctrl.wtfai = function() {
	        navigator.geolocation.getCurrentPosition(function (pos) {
	    		Ctrl.currentPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
				Ctrl.map.getGMap().panTo(Ctrl.currentPos);
	        	Ctrl.map.getGMap().setZoom(15);
	        }, function (error) {
	            alert('Unable to get location: ' + error.message);
	        });
        };
    });
