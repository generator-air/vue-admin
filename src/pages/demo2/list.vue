<template lang="pug">
	#app1
		.u-style.u-table-header
			el-card(class="box-card")
				h3.u-style.header-title 组件调用示例
					div(class="text item")
						h5.u-style.header-title {{"测试时间: " +this.time}}
						h5.u-style.header-title {{"时间格式化(秒): "  +this.sec}}
						h5.u-style.header-title {{"天: " +this.day}}
						h5.u-style.header-title {{"标准时间: " +this.sect}}
						h5.u-style.header-title {{"年月日: " + this.quant}}
			.u-style.u-table-header
			el-card(class="box-card")
				h3.u-style.header-title 网络请求示例
					div(class="text item")
						h5.u-style.header-title {{"接口地址: " +this.url}}
						h5.u-style.header-title 返回数据：
						h5.u-style.header-title {{this.list}}
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
		data() {
				return {
						time: '',
						sec: '',
						day: '',
						sect: '',
						quant: '',
						list: {},
						url: '',
				}
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
										date = $date.formatSec(time);
										break;
								case 'day':
										date = $date.formatDay(time);
										break;
								case 'secText':
										date = $date.formatSecText(time);
										break;
								case 'quantum':
										date = $date.formatQuantum(time);
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
				this.url = 'https://yapi.qqmylife.com/mock/227/rule/rules/clearing/final';
				this.$get(this.url,)
						.then((e) => {
						    this.list = e;
								console.log('%c' + JSON.stringify(e, null, 2), 'color:violet')
						})
				/* aegis log demo */
				if ($config.logReport) {
						// 监控当前页面
						this.$aegis.logE('aegis异常日志上报')
						// 监控当前页面
						this.$aegis.logI('aegis普通日志上报')
				}
				this.time = '1575341866'
				this.sec = this.dateFormat(this.time, 'sec');
				this.day = this.dateFormat(this.time, 'day')
				this.sect = this.dateFormat(this.time, 'secText')
				this.quant = this.dateFormat(this.time, 'quantum')
		}
}
</script>
