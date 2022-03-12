import React from 'react';
import moment from 'moment';

export default function Calendar() {
	const weekdayshort = moment.weekdaysShort();

	const weekdayshortname = weekdayshort.map(day => {
		return (
			<th key={day} className="week-day">
				{day}
			</th>
		);
	});

	return (
		<div>
			<table>
				<thead>
					<tr>
						{weekdayshortname}
					</tr>
				</thead>
			</table>
		</div>
	);
}
