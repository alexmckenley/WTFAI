angular.module('wtfai.services.initialMapSettings', ['map.styles'])
.factory('initialMapSettings', function(mapStyles) {
	//san francisco
	return {
	    center: {
            latitude: 37.759464,
            longitude: -122.439231
        },
        zoom: 11,
        options: {
            styles: mapStyles
        }
	};
});
