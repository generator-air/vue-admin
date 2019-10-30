<template lang="pug">
	el-breadcrumb
		el-breadcrumb-item 日志监控
</template>

<script>

import $env from '@/mods/model/env';
import $apiMobile from '@/mods/io/demo';

export default {
	components: {
	},
	watch: {
		$route() {
			this.init();
		}
	},
	computed: {},
	data() { return {} },
	methods: {
		async request() {
			let rs = await $apiMobile.list();
			console.log(rs)
		},
		init() {
			console.log('当前请求域名', $env.domain);
			// sdk初始化
			this.$emonitor.init();
			// 普通异常上报
			console.error('warn', '手动流水日志上报')
			// 流水日志上报
			this.$emonitor.report('warn', '手动流水日志上报')
		}
	},
	created() {
		this.init();
	},
	mounted() {
		this.request();
	}
};
</script>
