import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from '../components/calendar/calendarSlice';
import reminderReducer from '../components/reminderForm/reminderFormSlice';
import modalReducer from '../components/modal/modalSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    reminder: reminderReducer,
    modal: modalReducer
  },
});
