import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWeatherConditions } from '../../api/weather';

const initialState = {
	weather: null,
	weatherStatus: 'idle'
};

export const dateWeatherConditionsThunk = createAsyncThunk(
	'calendar/fetchWeatherConditions',
	async (city) => {
		const response = await getWeatherConditions(city);

		return response;
	}
);

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(dateWeatherConditionsThunk.pending, (state) => {
				state.weatherStatus = 'loading';
			})
			.addCase(dateWeatherConditionsThunk.fulfilled, (state, action) => {
				state.weatherStatus = 'idle';
				state.weather = action.payload;
			});
	},
});

export const selectCalendar = (state) => state.calendar;

export default calendarSlice.reducer;
