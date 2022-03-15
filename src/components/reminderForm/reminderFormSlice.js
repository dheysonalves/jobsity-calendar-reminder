import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	reminders: [],
};

export const reminderSlice = createSlice({
	name: 'reminder',
	initialState,
	reducers: {
		createReminder: (state, action) => {
			state.reminders.push(action.payload);
		},
		updateReminder: (state, action) => {
			const index = state.reminders.findIndex((reminder) => reminder.id === action.payload.id);
			state.reminders[index] = action.payload;
		},
		deleteReminder: (state, action) => {
			const newReminders = state.reminders.filter(reminder => reminder.id !== action.payload);
			state.reminders = newReminders;
		}
	},
});

export const { deleteReminder, createReminder, updateReminder } = reminderSlice.actions;

export const selectReminder = (state) => state.reminder;

export default reminderSlice.reducer;
