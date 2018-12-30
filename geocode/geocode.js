const request = require('request');

var geocodeAddress = ((address, callback) => {
  var address = encodeURIComponent(address);

  const googleKey = require('../credentials/keys').googleKey;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleKey}`;
  request({
    url,
    json: true
  },
    (error, response, body) => {
    // console.log('response: ', JSON.stringify(response, undefined, 2));

    if (error) {
      callback('Unable to connect to Google servers');
      // console.log('Unable to connect to Google servers');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to get the results for the address provided');
      // console.log('Unable to get the results for the address provided');
    } else if (body.status === 'OK') {
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });

        // console.log(`Address: ${JSON.stringify(body.results[0].formatted_address, undefined, 2)}`);
        // console.log(`lat:, ${JSON.stringify(body.results[0].geometry.location.lat, undefined, 2)}`);
        // console.log(`lng:, ${JSON.stringify(body.results[0].geometry.location.lng, undefined, 2)}`);
    } else {
        callback(`Error: ${response.statusCode}`);
        // console.log('Error: Code',response && response.statusCode);
    }

  });
});

module.exports.geocodeAddress = geocodeAddress;
