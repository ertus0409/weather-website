const request = require('request');

/**
 * Fetch weather data for the given geolocation
 * 
 * @param longitude  - longitude coordinate
 * @param latitude  - latitude coordinate
 * @param callback - the callback function 
 * 
 */
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ef6644c80076df9bf5a6140addf0a8af/' + latitude + ',' + longitude +'?units=si';
    request({ url, json: true }, (error, { body }) => {
    
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const data = body.currently;
            callback(undefined, (`${body.daily.data[0].summary} It is currently ${data.temperature} degrees out. There is ${data.precipProbability}% chance of rain.
            The temperature will be high at ${body.daily.data[0].temperatureHigh} degrees and low at ${body.daily.data[0].temperatureLow} degrees today.`));
        }
        
    });    

}


module.exports = forecast;