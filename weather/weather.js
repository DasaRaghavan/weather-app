const request = require('request');
const darkskyKey = require('../credentials/keys').darkskyKey;

var getWeather = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/${darkskyKey}/${lat},${lng}`;
  request({
    url,
    json: true
  }, (error, response, body) => {
    if (error) {
        callback('Unable to connect to weather servers');
    } else if (!error & response.statusCode === 200 ){
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
        // console.log(JSON.stringify(body.currently.temperature, undefined, 2));
    } else {
        callback(`Unable to get the weather for the location specified ${response.statusCode}`);
    }
  });
};

module.exports.getWeather = getWeather;
