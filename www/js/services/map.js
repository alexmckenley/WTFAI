angular.module('wtfai.services.map', [])
	.factory('mapService', function($q, $timeout, geoJsonHelpers, neighborhoods) {
		var finalZoomValue = 15;
		var marker = null;
		return {

			//display the current location
			displayCurrentLocation: function(map) {
				var deferred = $q.defer();
				var that = this;
				that.getCurrentLocation().then(function(currentPos) {

                //zoom to current location
                that.zoomToCurrentLocation(map, currentPos)
                .then(function() {
                	//if there is already a pin, clear it
                	if (marker) {
                		marker.setMap(null);
                	}
                    // create/drop marker for current location
                    marker = that.dropCurrentMarker(map, currentPos);

                    // find current neighborhood
                    deferred.resolve(that.findCurrentHood(currentPos, neighborhoods));
                	});
            	});
            	return deferred.promise;
			},

			getCurrentLocation: function() {
				var deferred = $q.defer();
	            navigator.geolocation.getCurrentPosition(function (pos) {
                	var currentPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
	                deferred.resolve(currentPos);
	            }, function (error) {
	                alert('Unable to get location: ' + error.message);
	            });
	            return deferred.promise;
			},

			zoomToCurrentLocation: function(map, pos) {
				var currentZoom = map.getZoom();
				var deferred = $q.defer();
				
				map.panTo(pos);
				var zoomOnce = function() {
					if (currentZoom < finalZoomValue) {
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
			},

			findCurrentHood: function(point, neighborhoods) {
				var currPoint = {
					type: 'Point',
					coordinates: [point.A, point.k]
				};

				var myNeighborhood = {
					name: 'middle of nowhere'
				};
				_.each(neighborhoods, function(neighborhood) {
					if (geoJsonHelpers.pointInPolygon(currPoint, neighborhood.geojson)) {
						myNeighborhood = neighborhood;
					}
				});
				return myNeighborhood;
			},

			dropCurrentMarker: function(map, pos) {
				return new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: 'Where the fuck am I?!?!',
                    animation: google.maps.Animation.BOUNCE
                });
			}
		};
	});