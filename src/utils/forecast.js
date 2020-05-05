const request = require('request');
const forecast = (lat, lng, callback) => {
	api_key = `f12216020db90c9428eae214e49ca0d6`;
	request(
		{
			url: `http://api.weatherstack.com/current?access_key=${api_key}&query=${lat},${lng}&units=f`,
			json: true,
		},
		(error, response) => {
			const { err, current } = response.body;
			if (err) {
				callback('unable to connect to weather services', undefined);
			} else if (err) {
				callback(error.info, undefined);
			} else {
				// const { current } = response.body;
				callback(
					undefined,
					`${current.weather_descriptions[0]}.It is currently ${current.temperature} degrees out with humidity ${current.humidity}%. It feels like ${current.feelslike}`
				);
			}
		}
	);
};
module.exports = forecast;
