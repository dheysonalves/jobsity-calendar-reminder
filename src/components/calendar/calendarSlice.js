import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWeatherConditions } from '../../api/weather';

const initialState = {
	reminders: [],
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
	reducers: {
		incrementReminder: (state, action) => {
			state.reminders.push(action.payload);
		},
		deleteReminder: (state, action) => {
			const newReminders = state.reminders.filter(reminder => reminder.id !== action.payload);
			state.reminders = newReminders;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(dateWeatherConditionsThunk.pending, (state) => {
				state.weatherStatus = 'loading';
			})
			.addCase(dateWeatherConditionsThunk.fulfilled, (state) => {
				state.weatherStatus = 'idle';
			});
	},
});

export const { deleteReminder, incrementReminder } = calendarSlice.actions;

export const selectCalendar = (state) => state.calendar;

export default calendarSlice.reducer;
