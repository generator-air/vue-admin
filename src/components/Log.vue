<template lang="pug">
	el-breadcrumb
		el-breadcrumb-item 日志监控
</template>

<script>

import $env from '@/mods/model/env';

export default {
	components: {
	},
	watch: {
		$route() {
			this.init();
		}
	},
	computed: {},
	data() {return {}},
	methods: {
		init(){
			console.log('当前请求域名',$env.domain);
			// 页面上报
			this.$log.init();
			// 流水日志上报
			this.$log.normalReport(0, 'CLIENT|reqId=xxx| xxx')
		}
	},
	created() {
		this.init();
	},
	mounted() {}
};
</script>
