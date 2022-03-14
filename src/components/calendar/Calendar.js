import React, { useState, useCallback } from 'react';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';

import './Calendar.scss';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import Reminderform from '../reminderForm/reminderForm';
import { selectReminder } from '../reminderForm/reminderFormSlice';
import useModal from '../../hooks/useModal';
import useCalendar from '../../hooks/useCalendar';

export default function Calendar() {
	const { handleShowModal, showModal } = useModal();
	const [daySelected, updateDaySelected] = useState(0);
	const { reminders } = useSelector(selectReminder);

	const onDayClick = useCallback((e, day) => {
		updateDaySelected(day);
		handleShowModal(true);
	}, [daySelected, handleShowModal, showModal]);

	const { weekdayshortname, daysinmonth } = useCalendar(reminders, onDayClick);

	const RenderModal = useCallback(() => {
		let specificReminder = null;

		return (
			<Modal handleShowModal={() => handleShowModal(false)} showModal={showModal}>
				<Reminderform reminderData={specificReminder} />
			</Modal>
		);
	}, [handleShowModal, showModal, daySelected, reminders]);


	return (
		<div className="container">
			<RenderModal />
			<div className="button-container">
				<Button color='success' text='add reminder' type="button" onClick={() => handleShowModal(true)} />
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
