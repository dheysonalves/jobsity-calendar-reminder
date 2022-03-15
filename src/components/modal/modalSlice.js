import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	showModal: false,

};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		handleShowModal: (state, action) => {
			state.showModal = action.payload;
		},
	},
});

export const { handleShowModal } = modalSlice.actions;

export const selectModal = (state) => state.modal;

export default modalSlice.reducer;
