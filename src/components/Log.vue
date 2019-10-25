<template lang="pug">
	el-breadcrumb
		el-breadcrumb-item 日志监控
</template>

<script>
import * as $emonitor from '@tencent/emonitor'
import { setTimeout } from 'timers';

export default {
	components: {
	},
	
	watch: {
		$route() {
			this.init();
		}
	},
	computed: {
	},
	data() {
		return {
		
		};
	},
	methods: {
		init(){
			let isTimingReported = false;
			const _MAXTIMEOUT = 10000;
			const nativeToString = Object.prototype.toString;
			const bossInfo = {
				page: 'https://btrace.qq.com/kvcollect?BossId=6529&Pwd=1714580587', //页面质量上报
				error: 'https://btrace.qq.com/kvcollect?BossId=6527&Pwd=1102151080', // 页面错误上报
				slowlog: 'https://btrace.qq.com/kvcollect?BossId=6523&Pwd=1202531240', //慢日志上报
				cgi: 'https://btrace.qq.com/kvcollect?BossId=6528&Pwd=96045012', // cgi上报
				resource: 'https://btrace.qq.com/kvcollect?BossId=6958&Pwd=1123576360', // 素材质量上报
				flowlog: '//btrace.qq.com/kvcollect?BossId=6526&Pwd=878966364', // 流水日志上报,
			};
			const emonitorIns = $emonitor.create({
				baseUrl: bossInfo.error,
				name: '项目英文名称',
				onBeforeSend: function() {
				},
				cgi: {
					baseUrl: bossInfo.cgi,
					sampling: 1 // 默认采样率 可根据实际情况调整
				},
				logs: {
				baseUrl: bossInfo.flowlog,
				},
			});
			setTimeout(()=> {
				// 慢日志上报
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
					emonitorIns
						.config({
						baseUrl: bossInfo.slowlog
						})
						.send(
						{
							json_entries: JSON.stringify(_jsonEntries)
						},
						true
						);
					emonitorIns.config({
						baseUrl: bossInfo.error
					});
					}
				} catch (err) {
					//console.warn('emonitorIns send', err);
					}
				}
			}, _MAXTIMEOUT);
			window.addEventListener(
				'load',
				() => {
				setTimeout(()=> {
					if (!isTimingReported) {
						emonitorIns
						.config({
							baseUrl: bossInfo.page
						})
						.send($emonitor.getPfTiming());
						emonitorIns.config({
							baseUrl: bossInfo.error
						});
						isTimingReported = true;
					}
				}, 0);
				},
				false
			);
		}
	},
	created() {
		this.init();
	},
	mounted() {

	}
};
</script>
