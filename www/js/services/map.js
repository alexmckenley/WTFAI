angular.module('wtfai.services.map', [])
	.factory('mapService', function($q, $timeout) {
		return {
			getCurrentLocation: function() {
				var deferred = $q.defer();
	            navigator.geolocation.getCurrentPosition(function (pos) {
	                deferred.resolve(pos);
	            }, function (error) {
	                alert('Unable to get location: ' + error.message);
	            });
	            return deferred.promise;
			},

			zoomToCurrentLocation: function(map, startZoomValue, endZoomValue, pos) {
				var currentZoom = startZoomValue;
				var deferred = $q.defer();
				
				map.panTo(pos);
				var zoomOnce = function() {
					if (currentZoom < endZoomValue) {
						map.setZoom(currentZoom++);
						$timeout(function() {
							zoomOnce();
						}, 100);
					} else {
						deferred.resolve();
					}
				};
				zoomOnce();
	            return deferred.promise;
			}
		};
	});