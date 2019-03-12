import moment from 'moment';

// 取的兩個時間的
export const getDuration = (startTime = moment(), endTime = moment()) => {
	if (!moment.isMoment(startTime)) {
		console.error(
			'startTime must be valid moment object in getDuration, ',
			startTime
		);
		return false;
	}

	if (!moment.isMoment(endTime)) {
		console.error(
			'endTime must be valid moment object in getDuration, ',
			endTime
		);
		return false;
	}
	const diffYear = endTime.diff(startTime, 'years');
	const diffMonth = Math.floor(endTime.diff(startTime, 'months', true));

	// 最小的單位
	if (diffYear === 0 && diffMonth === 0) {
		return '未滿1個月';
	}

	let text = '';
	// 計算年
	if (diffYear > 0) {
		text += `${diffYear}年`;
	}

	// 計算月
	if (diffMonth % 12 > 0) {
		text += `${diffMonth % 12}個月`;
	}

	return text;
};
