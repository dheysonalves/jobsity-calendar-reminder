import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	reminders: [],
	newReminders: []
};

export const reminderSlice = createSlice({
	name: 'reminder',
	initialState,
	reducers: {
		incrementReminder: (state, action) => {
			state.reminders.push(action.payload);
			state.newReminders = state.reminders.reduce((result, obj) => {
				(result[obj['id']] = result[obj['id']] || []).push(obj);
				return result;
			}, {});
		},
		updateReminder: (state, action) => {
			state.reminders = {
				...state.reminders,
				...action.payload,
			};
		},
		deleteReminder: (state, action) => {
			const newReminders = state.reminders.filter(reminder => reminder.id !== action.payload);
			state.reminders = newReminders;
		}
	},
});

export const { deleteReminder, incrementReminder, updateReminder } = reminderSlice.actions;

export const selectReminder = (state) => state.reminder;

export default reminderSlice.reducer;
