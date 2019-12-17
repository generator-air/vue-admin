<template lang="pug">
	#app1
		.display-block
			el-card(class="box-card")
				h3.header-title 时间工具示例
					div(class="text item")
						h5.header-title {{"当前时间格式化: " +this.time}}
						h5.header-title {{"秒: "  +this.sec}}
						h5.header-title {{"天: " +this.day}}
						h5.header-title {{"标准: " +this.sect}}
						h5.header-title {{"年月日: " + this.quant}}
		.display-block
			h3.header-title 日志开关
			el-switch(
				style="display: block"
				v-model="isOpened"
				active-color="#13ce66"
				active-text="开启"
				inactive-text="关闭"
				@change='handleSwitch')
			.display-block
			el-card(class="box-card")
				h3.header-title 网络请求示例
					div(class="text item")
						h5.header-title {{"接口地址: " +this.url}}
						h5.header-title 返回数据：
						h5.header-title {{this.list}}
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import $date from '@/util/date'
import $env from '@/model/env'
import $config from  '../../../config'
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
						quant: '',
						sect: '',
						list: {},
						url: '',
						isOpened: false,
						interval: ''
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
				init() {
						/* 网络请求接口示例，也可以参考table.vue中的update*/
						this.url = $env.domain + '/list',
						this.$get(this.url,)
								.then((rs) => {
										this.list = rs
								})
						/* 时间处理工具类示例 */
						this.time = Date.parse(new Date()) / 1000
						const time = this.time
						this.sec = $date.formatSec(time)
						this.day = $date.formatDay(time)
						this.sect = $date.formatSecText(time)
						this.quant = $date.formatQuantum(time)
				},
				/* 日志上报系统 aegis，详见 aegis.ivweb.io */
				handleSwitch(value) {
						if (value && $config.logReport) {
								/* 日志监听结果在日志/项目实时日志中选择开始监听 */
								this.interval = setInterval(() => {
										this.$aegis.logE('aegis异常日志上报', value)
										// 监控当前页面
										this.$aegis.logI('aegis普通日志上报', value)
								}, 1000)
						} else {
								clearInterval(this.interval)
						}
				}
		},
		created() {},
		mounted() {
				this.init()
		}
}
</script>
<style lang="less">
	.p-edit {
		.display-block {
			display: flex;
			justify-content: flex-start;
			margin-bottom: 20px;
		}
	}
</style>
