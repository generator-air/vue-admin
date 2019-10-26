<template lang="pug">
	el-breadcrumb
		el-breadcrumb-item 日志监控
</template>

<script>

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
			this.$log.report();
		}
	},
	created() {
		this.init();
	},
	mounted() {

	}
};
</script>
