<template lang="pug">
	.p-page1 menu1 - page1
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
