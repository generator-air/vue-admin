<template lang="pug">
	#app1
		span 组件调用示例
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import $config from '../../../config'
import $date from '@/util/date'
export default {
		computed: {
				...mapState('user', [
						'userInfo'
				])
		},
		methods: {
				...mapMutations('user', [
						'setUserInfo'
				]),
				changeUser() {
						this.setUserInfo({
								name: 'Adam'
						})
				},
				dateFormat(time, type) {
						let date = {}
						switch (type) {
								case 'sec':
										date = 	$date.formatSec(time);
										break;
								case 'day':
										date = 	$date.formatDay(time);
										break;
								case 'secText':
										date = 	$date.formatSecText(time);
										break;
								case 'quantum':
										date = 	$date.formatQuantum(time);
										break;
								default:
										break;
						}
						return date
				}
		},
		created() {
				// https://yapi.qqmylife.com/mock/227/rule/rules/clearing/final
				// 404 response
				// https://www.gamersky.com/news/201911/123w7764.shtml
				/* req demo */
				this.$get('https://yapi.qqmylife.com/mock/227/rule/rules/clearing/final')
						.then((e) => {
								console.log('%c' + JSON.stringify(e, null, 2), 'color:violet')
						})
				/* aegis log demo */
				if ($config.logReport) {
						// 监控当前页面
						this.$aegis.logE('aegis异常日志上报')
						// 监控当前页面
						this.$aegis.logI('aegis普通日志上报')
				}
				const testTime = '1575341866'
				console.log('时间格式化\n秒：' + this.dateFormat(testTime, 'sec')
						+ '\n天：' + this.dateFormat(testTime, 'day')
						+ '\n标准时间：' + this.dateFormat(testTime, 'secText')
						+ '\n年月日：' + this.dateFormat(testTime, 'quantum'))
		}
}
</script>
