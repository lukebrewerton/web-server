const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/e1b8ca647e7f800580664054e6241605/' +
    encodeURIComponent(latitude) +
    ',' +
    encodeURIComponent(longitude) +
    '?units=uk2';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services');
    } else if (body.error) {
      callback('Unable to find location');
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          ' It is currently ' +
          body.currently.temperature +
          ' degrees out. The high today is ' +
          body.daily.data[0].temperatureMax +
          ' degrees and the low today is ' +
          body.daily.data[0].temperatureMin +
          ' degrees. There is a ' +
          body.currently.precipProbability +
          '% chance of rain.'
      );
    }
  });
};

module.exports = forecast;
