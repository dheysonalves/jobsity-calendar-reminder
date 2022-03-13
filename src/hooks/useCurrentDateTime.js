
import moment from 'moment';

function useCurrentDateTime() {
	const startOfMonth = moment().format('YYYY-MM-DD');
	const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
	const currentTime = moment().format('HH:mm');
	const currentMonthName = moment().format('MMMM');

	return {
		startOfMonth,
		endOfMonth,
		currentTime,
		currentMonthName
	};
}

export default useCurrentDateTime;
