import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import calendarReducer from '../components/calendar/calendarSlice';
import reminderReducer from '../components/reminderForm/reminderFormSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    calendar: calendarReducer,
    reminder: reminderReducer,
  },
});
