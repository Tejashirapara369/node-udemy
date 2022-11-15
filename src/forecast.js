const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=2cda3e641de042644fc9d355616c8a96&query=" +
    latitude +
    "," +
    longitude;
  // "http://api.weatherstack.com/current?access_key=2cda3e641de042644fc9d355616c8a96&query=21.224516,72.855229&units=s";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        msg:
          " It is currently " +
          body.current.temperature +
          " degress out. There is a " +
          body.current.precip +
          "% chance of rain.",
        location: `${body.location.name}, ${body.location.region}, ${body.location.country}`,
        weather_icons: body.current.weather_icons,
      });
    }
  });
};

module.exports = forecast;
