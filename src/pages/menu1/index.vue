<template lang="pug">
	.p-page1 页面操作过滤demo
		.buttons
			el-button(v-if="operations.includes('create')") 创建
			el-button(v-if="operations.includes('edit')") 编辑
			el-button(v-if="operations.includes('delete')") 删除
</template>

<script>
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState('user', [
			'userInfo', 'auth'
		])
	},
	data() {
		return {
			operations: []
		}
	},
	methods: {

	},
	mounted() {
		this.operations = this.auth.getPageOperations(this.$route.path)
		console.log('this.operations:', this.operations)
	}
}
</script>

<style lang="less">
.p-page1 {

}
</style>
