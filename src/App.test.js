/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

const setup = () => {
	const utils = render(
		<Provider store={store}>
			<App />
		</Provider>
	);
	const createReminderButton = utils.getByLabelText('button-add-reminder');
	// const modalContainer = utils.getByTestId('modal-container');
	// const reminderInput = utils.getByLabelText('reminder-input');
	// const reminderCity = utils.getByLabelText('city-input');
	// const reminderDate = utils.getByLabelText('date-input');
	// const reminderTime = utils.getByLabelText('time-input');
	// const reminderColor = utils.getByLabelText('color-input');
	// const reminderFormSubmit = utils.getByAltText('submit-create-reminder');
	// const reminderDayCalendar = utils.getByAltText(`calendar-day-${day}`);

	return {
		createReminderButton,
		...utils,
	};
};

describe('Create a new reminder and show on calendar', () => {
	it('should render a moda component', () => {
		const { getByText } = setup();

		expect(getByText(/ADD REMINDER/i)).toBeInTheDocument();
	});

	// test('renders calendar component and remindersw', async () => {
	// 	const { getByText, createReminderButton, reminderDayCalendar, modalContainer } = setup();

	// 	expect(getByText(/ADD REMINDER/i)).toBeInTheDocument();

	// 	fireEvent.click(createReminderButton);

	// 	await waitForElement(() => modalContainer());

	// 	fireEvent.change(reminderInput, { target: { value: 'Code Challenge' } });
	// 	fireEvent.change(reminderCity, { target: { value: 'London' } });
	// 	fireEvent.change(reminderDate, { target: { value: '23' } });
	// 	fireEvent.change(reminderTime, { target: { value: '14:32' } });
	// 	fireEvent.doubleClick(reminderColor);

	// 	fireEvent(reminderFormSubmit, new MouseEvent('click', { bubbles: true }));

	// 	expect(reminderDayCalendar).toBeInTheDocument();

	// });
});


