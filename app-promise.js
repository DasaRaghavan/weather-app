const yargs = require('yargs');
const axios = require('axios');

const fs = require('fs');
const fileName = 'weatherData.txt';

const googleKey = require('./credentials/keys').googleKey;
const darkskyKey = require('./credentials/keys').darkskyKey;

const argv = yargs
  .options({
    a: {
      alias: 'address',
      describe: 'Address to fetch weather for',
      demandOption: true,
      string: true
    }}
  )
  .help()
  .alias('help', 'h')
  .argv;

var address = encodeURIComponent(argv.address);
var geoCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleKey}`;

var resultObject = {};
axios.get(geoCodeUrl).then((response)=>{
    resultObject = {
                    address: response.data.results[0].formatted_address,
                    latitude: response.data.results[0].geometry.location.lat,
                    longitude: response.data.results[0].geometry.location.lng
                    };
    var lat = resultObject.latitude;
    var lng = resultObject.longitude;
    var weatherUrl = `https://api.darksky.net/forecast/${darkskyKey}/${lat},${lng}`;
    return axios.get(weatherUrl);
}).then((response) => {
    resultObject.temperature = response.data.currently.temperature;
    resultObject.apparentTemperature = response.data.currently.apparentTemperature;
    // console.log(JSON.stringify(resultObject, undefined, 2));
    fs.appendFile(fileName, JSON.stringify(resultObject, undefined, 2), (err) => {
      if (err) throw err
      console.log(`${JSON.stringify(resultObject, undefined, 2)}, written to ${fileName}`);
    });
}).catch((e) => {
  console.log(e);
});
