import * as $emonitor from '@tencent/emonitor'

const install = function (Vue) {
	Object.defineProperties(Vue.prototype, {
		$emonitor: {
			get() {
				const bossInfo = {
					page: 'https://btrace.qq.com/kvcollect?BossId=6529&Pwd=1714580587',  // 页面质量上报
					error: 'https://btrace.qq.com/kvcollect?BossId=6527&Pwd=1102151080',  // 页面错误上报
					slowlog: 'https://btrace.qq.com/kvcollect?BossId=6523&Pwd=1202531240',  // 慢日志上报
					cgi: 'https://btrace.qq.com/kvcollect?BossId=6528&Pwd=96045012',  // cgi上报
					resource: 'https://btrace.qq.com/kvcollect?BossId=6958&Pwd=1123576360',  // 素材质量上报
					flowlog: '//btrace.qq.com/kvcollect?BossId=6526&Pwd=878966364',  // 流水日志上报,
				};
				let isTimingReported = false;
				const _MAXTIMEOUT = 10000;
				const nativeToString = Object.prototype.toString;
				const emonitorIns = $emonitor.create({
					baseUrl: bossInfo.error,
					name: 'vue-admin',
					onBeforeSend: data => {
						// 在数据上报前调用 可以用作数据过滤
						// (1)仅有return false 不上报数据；(2)当返回object对象，支持修改's_path', 's_traceid', 's_guid', 'hc_pgv_pvid', 's_omgid';
						// data.type 上报类型 console，link，script，ajax，fetch，promise，img，audio，video，cgi
						// data.url 请求链接
						// data.code 请求状态，默认为空
						// data.isErr 是否是异常上报
						// data.source 上报的原始数据
						// 应用场景: 日志管理, 白名单等
						// console.log('report data::::', data);
						// 简单的全日志存储方案
						// 通过返回对象，修改特定上报字段。生产环境，按需使用!。
						// return { s_path: '/test', s_traceid: '1111'}
						console.log(data);
					},
					cgi: {
						baseUrl: bossInfo.cgi,
						sampling: 1 // 默认采样率 可根据实际情况调整
					},
					logs: {
						baseUrl: bossInfo.flowlog,
					},
				});
				return {
					/**
					* @param {Object} options
					* @param {Number} options.level 日志级别，建议按这几个级别区分：debug:0, info: 1, warn: 2, error: 3;
					* 这里啄木鸟官方实例是用string类型如'info'，但是他们的数据表设计有误，表里面是bigint类型，如果上报string类型，会导致根据日志级别过滤日志时有问题
					* @param {String} options.log 日志内容
					*/
					normalReport: (level, message) => {
						// 日志级别，啄木鸟官方实例是用string类型，但是他们的数据表设计有误，表里面是bigint类型，如果上报string
						emonitorIns.log({level, message});
						console.error(level, message);
					},

					init: () => {
						// 慢日志上报&&页面错误上报
						setTimeout(()=> {
							if (!isTimingReported) {
								const _resources = $emonitor.getRcTiming();
								try {
									if (nativeToString.call(_resources) === '[object Array]') {
										const _resourcesLen = _resources.length;
										const _jsonEntries = [];
										for (let _i = 0; _i < _resourcesLen; _i++) {
											_jsonEntries.push(
											_resources[_i].starttime +
												'|' +
												_resources[_i].duration +
												'|' +
												_resources[_i].name
											);
										}
										// 慢日志上报
										emonitorIns.config({
											baseUrl: bossInfo.slowlog
										}).send({
											json_entries: JSON.stringify(_jsonEntries)
										}, true);
										// 页面错误日志上报
										emonitorIns.config({
											baseUrl: bossInfo.error
										});
									}
								} catch (err) {
									console.warn('emonitorIns send', err);
								}
							}
						}, _MAXTIMEOUT);

						// 页面质量上报&&页面错误上报
						window.addEventListener('load', () => {
							setTimeout(()=> {
								if (!isTimingReported) {
									// 页面质量上报
									emonitorIns.config({baseUrl: bossInfo.page}).send($emonitor.getPfTiming());
									// 页面错误日志上报
									emonitorIns.config({baseUrl: bossInfo.error});
									isTimingReported = true;
								} }, 0);
						}, false);
					}
				}
			}
		}
	});
};

export default {
	install
};
