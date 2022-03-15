import React, { useState, useCallback } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import './Calendar.scss';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import Reminderform from '../reminderForm/reminderForm';
import { selectReminder } from '../reminderForm/reminderFormSlice';
import useCalendar from '../../hooks/useCalendar';
import { selectModal, handleShowModal } from '../modal/modalSlice';

export default function Calendar() {
	const [daySelected, updateDaySelected] = useState('');
	const { reminders } = useSelector(selectReminder);
	const { showModal } = useSelector(selectModal);
	const dispatch = useDispatch();

	const onDayClick = useCallback((_e, day) => {
		updateDaySelected(day);
		dispatch(handleShowModal(true));
	}, [dispatch]);

	const { weekdayshortname, daysinmonth } = useCalendar(reminders, onDayClick);

	const RenderModal = useCallback(() => {
		let specificReminder = null;

		if (daySelected) {
			specificReminder = reminders.find(item => item.id === daySelected);
		}

		return (
			<Modal handleShowModal={() => dispatch(handleShowModal(false))} showModal={showModal}>
				<Reminderform reminderData={specificReminder} />
			</Modal>
		);
	}, [reminders, showModal, daySelected, dispatch]);

	return (
		<div className="container">
			<RenderModal />
			<div className="button-container">
				<Button color='success' text='add reminder' type="button" onClick={() => dispatch(handleShowModal(true))} />
			</div>

			<table className='table-container'>
				<thead className="calendar-thead">
					<tr>
						{weekdayshortname}
					</tr>
				</thead>
				<tbody>{daysinmonth}</tbody>
			</table>
		</div>
	);
}

ReactModal.defaultStyles.overlay.backgroundColor = '#0006';
