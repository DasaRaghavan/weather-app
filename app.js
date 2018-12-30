const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const yargs = require('yargs');

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


geocode.geocodeAddress(argv.a, (errorMessage, geoResults) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    weather.getWeather(geoResults.latitude, geoResults.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        var outputObject = {
          address: geoResults.address,
          latitude: geoResults.latitude,
          longitude: geoResults.longitude,
          temperature: weatherResults.temperature,
          apparentTemperature: weatherResults.apparentTemperature
        }
        console.log(JSON.stringify(outputObject, undefined, 2));
      }
    });
  }
});
