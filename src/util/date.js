import $dateFormat from 'spore-kit-date/format';

const date = {};

date.formatSec = timestamp => $dateFormat(timestamp * 1000, {
	template: '{{YYYY}}.{{MM}}.{{DD}} {{hh}}:{{mm}}:{{ss}}'
});

date.formatDay = timestamp => $dateFormat(timestamp * 1000, {
	template: '{{YYYY}}.{{MM}}.{{DD}}'
});

date.formatSecText = timestamp => $dateFormat(timestamp * 1000, {
	template: '{{YYYY}}年{{MM}}月{{DD}}日 {{hh}}:{{mm}}:{{ss}}'
});

date.formatQuantum = timestamp => $dateFormat(timestamp * 1000, {
	template: '{{YYYY}}年{{MM}}月{{DD}}日'
});
export default date;
