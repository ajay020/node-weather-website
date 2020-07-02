const request = require('request');

const geocode = (place, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(place) +'.json?access_token=pk.eyJ1IjoiZnJlYWs0MzIiLCJhIjoiY2tienl0MTN1MTk4OTJ4bzRxdjQxcW1neiJ9.O3bpIpcAZPTzqzE3udbLcg';
    request({ url: geocodeUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect geo api', undefined);
        } else if (response.body.error || response.body.features.length === 0) {
            callback('Unable to find location, Search for other location', undefined);
        } else {
            console.log( "Response",response.body);
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location:response.body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;
