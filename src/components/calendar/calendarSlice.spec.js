/* eslint-disable no-undef */
import calendarReducer, {
	incrementReminder,
	deleteReminder,
} from './calendarSlice';

describe('counter reducer', () => {
	const initialState = {
		reminders: [],
		weatherStatus: 'idle',
	};

	const DATA = {
		"id": "04-11-2022",
		"reminder": "Voyager Emissions Dashboard Rain",
		"datetime": "2022-02-28T14:27",
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
		expect(calendarReducer(undefined, { type: 'unknown' })).toEqual({
			reminders: [],
			weatherStatus: 'idle',
		});
	});

	it('should handle incrementReminder', () => {
		const actual = calendarReducer(initialState, incrementReminder(DATA));

		expect(actual.reminders).toEqual([DATA]);
	});

	it('should handle deleteReminder', () => {
		const actual = calendarReducer(initialState, deleteReminder("04-11-2022"));
		expect(actual.reminders).toEqual([]);
	});

});
