import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import calendarReducer from '../components/calendar/calendarSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    calendar: calendarReducer,
  },
});
