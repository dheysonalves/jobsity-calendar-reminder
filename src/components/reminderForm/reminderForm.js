import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from "prop-types";

import { dateWeatherConditionsThunk, selectCalendar } from '../calendar/calendarSlice';
import { selectReminder, incrementReminder, updateReminder } from './reminderFormSlice';

import Button from '../button/Button';
import useCurrentDateTime from '../../hooks/useCurrentDateTime';
import useForm from '../../hooks/useForm';
import './reminderForm.scss';

const Reminderform = ({ reminderData }) => {
	const dispatch = useDispatch();
	const { weather } = useSelector(selectCalendar);
	const { reminders, newReminders } = useSelector(selectReminder);
	const { currentTime, endOfMonth, startOfMonth } = useCurrentDateTime();
	const { data, setData, handleSubmit, handleInputChange, errors } = useForm({
		validations: {
			reminder: {
				required: {
					value: true,
					message: 'Reminder field is required',
				},
				custom: {
					isValid: (value) => value.length < 30,
					message: 'The reminder needs to have 30 caractheres',
				},
			},
			city: {
				required: {
					value: true,
					message: 'City field is required',
				},
			},
			date: {
				required: {
					value: true,
					message: 'Date field is required',
				},
			},
			time: {
				required: {
					value: true,
					message: 'Time field is required',
				},
			},
			color: {
				required: {
					value: true,
					message: 'Color field is required',
				},
			}
		},
		initialValues: { // used to initialize the data
			reminder: '',
			city: '',
			date: '',
			time: '',
			color: '',
			weather: null
		},
	});

	const updateSubmit = React.useCallback(async () => {
		await dispatch(dateWeatherConditionsThunk(data.city));
		await dispatch(updateReminder({
			id: moment(data.date).format('DD'),
			...data,
			weather: weather[0] !== null ? weather[0] : null,
		}));
	}, [data, updateReminder, dispatch, dateWeatherConditionsThunk, weather]);

	const incrementSubmit = React.useCallback(async () => {
		await dispatch(dateWeatherConditionsThunk(data.city));
		await dispatch(incrementReminder({
			id: moment(data.date).format('DD'),
			...data,
			weather: weather[0] !== null ? weather[0] : null,
		}));
		setData({
			id: moment(data.date).format('DD'),
			...data,
			weather: weather[0] !== null ? weather[0] : null,
		});
	}, [data, dateWeatherConditionsThunk, dispatch, incrementReminder, weather]);

	React.useEffect(() => {
		if (reminderData) {
			setData(reminderData);
		}
	}, [reminderData, setData]);

	React.useEffect(() => {
		console.log('reminders: ', reminders, newReminders, errors);
	}, [reminders, newReminders, errors]);

	return (
		<form className='form-container' onSubmit={(e) => reminderData ? handleSubmit(e, updateSubmit) : handleSubmit(e, incrementSubmit)}>
			<div className="wrapper">
				<div className='form-group'>
					<label htmlFor='reminder-input' className='form-label'>Reminder</label>
					<input type="text" id='reminder-input' className='form-input' placeholder='Place your reminder' max={30} maxLength={30} name="reminder" value={data.reminder || ''} onChange={(e) => handleInputChange(e)} />
					{errors.reminder && <p className="form-error">{errors.reminder}</p>}
				</div>
				<div className='form-group'>
					<label htmlFor='city-input' className='form-label'>City</label>
					<input type="text" id='city-input' className='form-input' placeholder='Place your city' name="city" value={data.city} onChange={(e) => handleInputChange(e)} />
					{errors.city && <p className="form-error">{errors.city}</p>}
				</div>
				<div className='form-group'>
					<label htmlFor='date-input' className='form-label'>Date</label>
					<input type="date" min={startOfMonth} max={endOfMonth} id='date-input' className='form-input' placeholder='Place your date' name="date" value={data.date || ''} onChange={(e) => handleInputChange(e)} />
					{errors.date && <p className="form-error">{errors.date}</p>}
				</div>
				<div className='form-group'>
					<label htmlFor='time-input' className='form-label'>Time</label>
					<input type="time" min={currentTime} max="00:00" id='time-input' className='form-input' placeholder='Place your time' name="time" value={data.time || ''} onChange={(e) => handleInputChange(e)} />
					{errors.time && <p className="form-error">{errors.time}</p>}
				</div>
				<div className='form-group' >
					<label className='form-label'>Color</label>
					<div className='row'>
						<input type="radio" id='color-green-input' className='form-input-radio' name="color" value="green" checked={data.color === 'green' || false} onChange={(e) => handleInputChange(e)} />
						<label htmlFor='color-green-input' className='form-label'>Green</label>
					</div>
					<div className='row'>
						<input type="radio" id='color-yellow-input' className='form-input-radio' name="color" value="yellow" checked={data.color === 'yellow' || false} onChange={(e) => handleInputChange(e)} />
						<label htmlFor='color-yellow-input' className='form-label'>Yellow</label>
					</div>
					<div className='row'>
						<input type="radio" id='color-red-input' className='form-input-radio' name="color" value="red" checked={data.color === 'red' || false} onChange={(e) => handleInputChange(e)} />
						<label htmlFor='color-red-input' className='form-label'>Red</label>
					</div>
					{errors.color && <p className="form-error">{errors.color}</p>}
				</div>
			</div>
			<Button type="submit" text='SUBMIT' color='success' />
		</form>
	);
};

Reminderform.propTypes = {
	reminderData: PropTypes.object
};

export default Reminderform;
