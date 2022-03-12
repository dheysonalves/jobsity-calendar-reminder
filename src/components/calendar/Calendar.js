import React, { useState } from 'react';
import moment from 'moment';

import './Calendar.scss';

export default function Calendar() {
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
				<td className="calendar-day empty">{""}</td>
			);
		}
		return blanks;
	});

	const getMonthsDaysFields = (() => {
		let daysInMonth = [];
		for (let day = 1; day <= monthDays(); day++) {
			let current = day == currentDay() ? "today" : "";

			daysInMonth.push(
				<td key={day} className={`calendar-day ${current}`}>
					{day}
				</td>
			);
		}
		return daysInMonth;
	});

	const monthDaysSlots = (() => {
		var totalSlots = [...getBlanksFields(), ...getMonthsDaysFields()];
		let rows = [];
		let cells = [];

		totalSlots.forEach((row, i) => {
			if (i % 7 !== 0) {
				cells.push(row); // if index not equal 7 that means not go to next week
			} else {
				rows.push(cells); // when reach next week we contain all td in last week to rows
				cells = []; // empty container
				cells.push(row); // in current loop we still push current row to new container
			}
			if (i === totalSlots.length - 1) { // when end loop we add remain date
				rows.push(cells);
			}
		});

		return rows;
	});

	let daysinmonth = monthDaysSlots().map((day, index) => {
		return <tr key={index}>{day}</tr>;
	});

	return (
		<div className="container">
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