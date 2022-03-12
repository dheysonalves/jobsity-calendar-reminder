/* eslint-disable no-undef */
import WeatherMapInstance from "./config/WeatherMapInstance";

const getWeatherConditions = ((cityName) => {
		if (cityName === undefined) throw Error();
		WeatherMapInstance.get(`/weather`, {
			params: {
				q: cityName,
				appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY
			}
		}).then(function (response) {
			return response.data.weather;
		}).catch(function (error) {
			console.log(error.toJSON());
		});
});


export {
	getWeatherConditions
};
