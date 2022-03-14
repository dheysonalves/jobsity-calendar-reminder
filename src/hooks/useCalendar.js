import React, { useState, useCallback } from 'react';
import moment from 'moment';

function useCalendar(reminders, onDayClick) {
	const [dateObject] = useState(moment());
	const weekdayshort = moment.weekdaysShort();

	const weekdayshortname = weekdayshort.map(day => {
		return (
			<th key={day} className="week-day">
				{day}
			</th>
		);
	});

	const monthDays = (() => {
		return dateObject.daysInMonth();
	});

	const currentDay = () => {
		return dateObject.format("D");
	};

	const firstDayOfMonth = (() => {
		let firstDay = moment(dateObject)
			.startOf("month")
			.format("d");
		return firstDay;
	});

	const getBlanksFields = (() => {
		let blanks = [];
		for (let index = 0; index < firstDayOfMonth(); index++) {
			blanks.push(
				<td className="calendar-day empty" key={`${index}-empty`}>{""}</td>
			);
		}
		return blanks;
	});

	const getMonthsDaysFields = useCallback(() => {
		let daysInMonth = [];
		for (let day = 1; day <= monthDays(); day++) {
			let current = day == currentDay() ? "today" : "";

			// let reminder = reminders.find((item) => item.id === day.toString());

			daysInMonth.push(
				<td key={day} id={`calendar-day-${day}`} className={`calendar-day ${current}`} onClick={e =>
					onDayClick(e, day)
				}>
					{day}
				</td>
			);
		}
		return daysInMonth;
	}, [onDayClick]);

	const monthDaysSlots = (() => {
		var totalSlots = [...getBlanksFields(), ...getMonthsDaysFields()];

		let rows = [];
		let cells = [];

		totalSlots.forEach((row, index) => {
			if (index % 7 !== 0) {
				cells.push(row); // if index not equal 7 that means not go to next week
			} else {
				rows.push(cells); // when reach next week we contain all td in last week to rows
				cells = []; // empty container
				cells.push(row); // in current loop we still push current row to new container
			}
			if (index === totalSlots.length - 1) { // when end loop we add remain date
				rows.push(cells);
			}
		});

		return rows;
	});

	let daysinmonth = monthDaysSlots().map((day, index) => {
		return <tr key={index}>{day}</tr>;
	});

	return {
		weekdayshortname,
		daysinmonth,
	};
}

export default useCalendar;
