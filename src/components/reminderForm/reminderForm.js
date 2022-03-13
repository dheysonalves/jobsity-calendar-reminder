import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { dateWeatherConditionsThunk, selectCalendar } from '../calendar/calendarSlice';
import { selectReminder, incrementReminder } from './reminderFormSlice';

import Button from '../button/Button';
import useCurrentDateTime from '../../hooks/useCurrentDateTime';
import './reminderForm.scss';

const Reminderform = () => {
	const { weather, weatherStatus } = useSelector(selectCalendar);
	const { reminders } = useSelector(selectReminder);

	const dispatch = useDispatch();
	const [reminder, updateReminder] = useState({
		reminder: '',
		city: '',
		date: '',
		time: '',
		color: '',
		weather: null
	});
	const { currentTime, endOfMonth, startOfMonth } = useCurrentDateTime();

	const handleInputChange = (event) => {
		event.preventDefault();
		const target = event.target;
		const value = target.value;
		const name = target.name;

		updateReminder({
			...reminder,
			[name]: value
		});
	};

	const handleSubmit = React.useCallback((event) => {
		event.preventDefault();

		dispatch(dateWeatherConditionsThunk(reminder.city));
		dispatch(incrementReminder({
			id: moment(reminder.date).format('DD'),
			...reminder,
			weather: weather[0],
		}));
		updateReminder({
			id: moment(reminder.date).format('DD'),
			...reminder,
			weather: weather[0],
		});
	}, [reminder, dateWeatherConditionsThunk, incrementReminder, weather]);

	React.useEffect(() => {
		console.log(weather, weatherStatus);
		console.log('local: ', reminder, 'store: ', reminders);
	}, [weather, reminder, reminders]);

	return (
		<form className='form-container' onSubmit={(e) => handleSubmit(e)}>
			<div className="wrapper">
				<div className='form-group'>
					<label htmlFor='reminder-input' className='form-label'>Reminder</label>
					<input type="text" id='reminder-input' className='form-input' placeholder='Place your reminder' max={30} maxLength={30} name="reminder" value={reminder.reminder || ''} onChange={(e) => handleInputChange(e)} />
				</div>
				<div className='form-group'>
					<label htmlFor='city-input' className='form-label'>City</label>
					<input type="text" id='city-input' className='form-input' placeholder='Place your city' name="city" value={reminder.city} onChange={(e) => handleInputChange(e)}/>
				</div>
				<div className='form-group'>
					<label htmlFor='date-input' className='form-label'>Date</label>
					<input type="date" min={startOfMonth} max={endOfMonth} id='date-input' className='form-input' placeholder='Place your date' name="date" value={reminder.date || ''} onChange={(e) => handleInputChange(e)}/>
				</div>
				<div className='form-group'>
					<label htmlFor='time-input' className='form-label'>Time</label>
					<input type="time" min={currentTime} max="00:00" id='time-input' className='form-input' placeholder='Place your time' name="time" value={reminder.time || ''} onChange={(e) => handleInputChange(e)} />
				</div>
				<div className='form-group' >
					<label className='form-label'>Color</label>
					<div className='row'>
						<input type="radio" id='color-green-input' className='form-input-radio' name="color" value="green" checked={reminder.color === 'green' || false} onChange={(e) => handleInputChange(e)}/>
						<label htmlFor='color-green-input' className='form-label'>Green</label>
					</div>
					<div className='row'>
						<input type="radio" id='color-yellow-input' className='form-input-radio' name="color" value="yellow" checked={reminder.color === 'yellow' || false} onChange={(e) => handleInputChange(e)}/>
						<label htmlFor='color-yellow-input' className='form-label'>Yellow</label>
					</div>
					<div className='row'>
						<input type="radio" id='color-red-input' className='form-input-radio' name="color" value="red" checked={reminder.color === 'red' || false} onChange={(e) => handleInputChange(e)}/>
						<label htmlFor='color-red-input' className='form-label'>Red</label>
					</div>
				</div>
			</div>
			<Button type="submit" text='SUBMIT' color='success' />
		</form>
	);
};

export default Reminderform;
