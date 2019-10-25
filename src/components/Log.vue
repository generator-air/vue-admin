<template lang="pug">
	el-breadcrumb
		el-breadcrumb-item 日志监控
</template>

<script>

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
		init(){}
	},
	created() {
		this.init();
	},
	mounted() {

	}
};
</script>
