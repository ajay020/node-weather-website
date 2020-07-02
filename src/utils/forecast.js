const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ea789e4b498453be5d37a73d794c0578&query=' + encodeURIComponent(latitude) + ',' + decodeURIComponent(longitude)+'&unit=f';

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather api', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        }else{
            let forecastData = `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degree out. There is ${body.current.precip} % chance of rain.`;
            callback(undefined, forecastData);

        }
    })
}

module.exports = forecast;