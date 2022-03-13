import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	reminders: [],
};

export const reminderSlice = createSlice({
	name: 'reminder',
	initialState,
	reducers: {
		incrementReminder: (state, action) => {
			state.reminders.push(action.payload);
		},
		updateReminder: (state, action) => {
			state.reminders.find(action.payload);
		},
		deleteReminder: (state, action) => {
			const newReminders = state.reminders.filter(reminder => reminder.id !== action.payload);
			state.reminders = newReminders;
		}
	},
});

export const { deleteReminder, incrementReminder } = reminderSlice.actions;

export const selectReminder = (state) => state.reminder;

export default reminderSlice.reducer;
