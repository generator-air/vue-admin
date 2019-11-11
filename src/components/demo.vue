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
		async request() {
			// 以下为请求测试环境的get接口测试
			this.$http.get(this.HOST + '/v2/movie/imdb/tt0111161', {
				params: {
					"apikey": "0df993c66c0c636e29ecbb5344252a4a"
				}
			}).then((response) => {
				console.log("get:" + response.data);
			});
		},
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
	mounted() {
		this.request();
	}
};
</script>
