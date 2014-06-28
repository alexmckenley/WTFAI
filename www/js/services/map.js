angular.module('wtfai.services.map', [])
	.factory('mapService', function($q) {
		return {
			getCurrentLocation: function() {
				var deferred = $q.defer();
	            navigator.geolocation.getCurrentPosition(function (pos) {
	                deferred.resolve(pos);
	            }, function (error) {
	                alert('Unable to get location: ' + error.message);
	            });
	            return deferred.promise;
			}
		};
	});