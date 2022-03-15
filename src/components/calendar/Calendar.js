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
import useModal from '../../hooks/useModal';

export default function Calendar() {
	const [daySelected, updateDaySelected] = useState('');
	const { reminders } = useSelector(selectReminder);
	const { showModal } = useSelector(selectModal);
	const { handleModal, showLocalModal } = useModal();
	const dispatch = useDispatch();

	const onDayClick = useCallback((_e, day) => {
		updateDaySelected(day);
		dispatch(handleShowModal(true));
	}, [dispatch]);

	const { weekdayshortname, daysinmonth } = useCalendar(reminders, onDayClick);

	const RenderModalEdit = useCallback(() => {
		let specificReminder = null;

		if (daySelected) {
			specificReminder = reminders.find(item => item.id === daySelected);
		}

		return (
			<Modal handleShowModal={() => dispatch(handleShowModal(false))} showModal={showModal}>
				<Reminderform reminderData={specificReminder} isEdit={true} />
			</Modal>
		);
	}, [daySelected, showModal, reminders, dispatch]);

	const RenderModal = useCallback(() => {
		return (
			<Modal handleShowModal={() => handleModal(false)} showModal={showLocalModal}>
				<Reminderform isEdit={false} handleLocalModal={handleModal} />
			</Modal>
		);
	}, [showLocalModal, handleModal]);

	return (
		<div className="container">
			<RenderModalEdit />
			<RenderModal />
			<div className="button-container">
				<Button color='success' text='add reminder' type="button" onClick={() => handleModal(true)} />
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
