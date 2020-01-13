const date = {};

const format = (timestamp, fmt = 'yyyy-MM-dd hh:mm:ss') => {
	const date = new Date(timestamp * 1000)
	var o = {
		'M+': date.getMonth() + 1, // 月份
		'd+': date.getDate(), // 日
		'h+': date.getHours(), // 小时
		'm+': date.getMinutes(), // 分
		's+': date.getSeconds(), // 秒
		'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
		'S': date.getMilliseconds() // 毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
		}
	}
	return fmt;
}

date.formatSec = timestamp => format(timestamp, 'yyyy.MM.dd hh:mm:ss');

date.formatDay = timestamp => format(timestamp, 'yyyy.MM.dd');

date.formatSecText = timestamp => format(timestamp, 'yyyy年MM月dd日 hh:mm:ss')

date.formatQuantum = timestamp => format(timestamp, 'yyyy年MM月dd日')

export default date;
