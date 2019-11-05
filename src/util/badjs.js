import BJ_REPORT  from 'badjs-report';

const install = function (Vue) {
	Object.defineProperties(Vue.prototype, {
		$bj: {
			get() {
				// sdk初始化
				const bj = BJ_REPORT;
				bj.init({ id: 1 });
				return {
					/* 初始化*/
					init: config => {
						bj.init(config)
					},
					/* info上报，用于记录操作日志 */
					logI: msg => {
						bj.info(msg);
					},
					/* 主动上报错误日志 */
					logE: msg => {
						bj.report(msg);
					},
					/* 可以结合实时上报，跟踪问题; 不存入存储 */
					logD: msg => {
						bj.debug(msg);
					},
					/* 记录离线日志 */
					logOff: msg => {
						bj.offlineLog(msg);
					}
				}
			}
		}
	});
};

export default {
	install
};
