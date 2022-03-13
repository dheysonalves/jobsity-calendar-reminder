/* eslint-disable no-undef */
import WeatherMapInstance from "./config/WeatherMapInstance";

const getWeatherConditions = async (cityName) => {
	if (cityName === undefined) throw Error();
	try {
		const response = await WeatherMapInstance.get(`/weather`, {
			params: {
				q: cityName,
				appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY
			}
		});

		return response.data.weather;
	} catch (error) {
		console.log(error.toJSON());
	}
};


export {
	getWeatherConditions
};
