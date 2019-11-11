<template lang="pug">
	el-breadcrumb
		el-breadcrumb-item 日志监控
</template>

<script>

import $env from '@/model/env';
import $config from '../../config';
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
		ageisReport() {
			this.$aegis.logE('aegis异常日志上报');
			this.$aegis.logI('aegis普通日志上报')
		},
		init() {
			console.log('当前请求域名', $env.domain);
			if ($config.logReport) {
				this.ageisReport();
			}
		}
	},
	created() {
		this.init();
	},
	mounted() {}
};
</script>
