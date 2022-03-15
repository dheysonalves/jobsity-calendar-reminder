/* eslint-disable no-undef */
import reminderReducer, {
	createReminder,
	updateReminder,
	deleteReminder,
} from './reminderFormSlice';

describe('counter reducer', () => {
	const initialState = {
		reminders: [],
	};

	const DATA = {
		"id": "1a683d51-f093-4397-b8ce-49b737f250ca",
		"reminder": "Voyager Emissions Dashboard Rain",
		"date": "2022-02-28",
		"day": "28",
		"time": "14:27",
		"city": "London",
		"color": "blue",
		"weather": {
			"id": 500,
			"main": "Rain",
			"description": "light rain",
			"icon": "10n"
		}
	};

	it('should handle initial state', () => {
		expect(reminderReducer(undefined, { type: 'unknown' })).toEqual({
			reminders: [],
		});
	});

	it('should handle createReminder', () => {
		const actual = reminderReducer(initialState, createReminder(DATA));

		expect(actual.reminders).toEqual([DATA]);
	});

	it('should handle updateReminder', () => {
		const customInitialState = {
			reminders: [DATA],
		};

		const updateReminders = {
			"id": "1a683d51-f093-4397-b8ce-49b737f250ca",
			"reminder": "Voyager Emissions Dashboard Rain",
			"date": "2022-02-29",
			"day": "29",
			"time": "14:29",
			"city": "London",
			"color": "blue",
			"weather": {
				"id": 500,
				"main": "Rain",
				"description": "light rain",
				"icon": "10n"
			}
		};

		const actual = reminderReducer(customInitialState, updateReminder(updateReminders));

		expect(actual.reminders).toEqual([updateReminders]);
	});

	it('should handle deleteReminder', () => {
		const actual = reminderReducer(initialState, deleteReminder("04-11-2022"));
		expect(actual.reminders).toEqual([]);
	});

});
