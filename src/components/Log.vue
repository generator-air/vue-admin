<template lang="pug">
	el-breadcrumb
		el-breadcrumb-item 日志监控
</template>

<script>

import $env from '@/mods/model/env';
import $axios from 'axios';

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
			$axios.get("/api/admin/content/mobiles/", { withCredentials: true }).then(res=> console.log(res)).catch(err=>console.log(err));
		},
		emonitorReport() {
			// sdk初始化
			this.$emonitor.init();
			// 普通异常上报
			console.error('warn', '异常日志上报');
			// 流水日志上报
			this.$emonitor.report('warn', '流水日志上报');
		},
		init() {
			console.log('当前请求域名', $env.domain);
			this.emonitorReport();
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
