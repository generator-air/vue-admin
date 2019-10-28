<template lang="pug">
	el-breadcrumb
		el-breadcrumb-item 日志监控
</template>

<script>

import $prop from '@/mods/model/prop';

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
			console.log($prop.domain);
			this.$log.slowReport();
			this.$log.loadReport();
		}
	},
	created() {
		this.init();
	},
	mounted() {

	}
};
</script>
