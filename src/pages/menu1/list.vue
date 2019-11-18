<template lang="pug">
	.p-page1 menu1 - page1
</template>

<script>
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState('user', [
			'userInfo'
		])
	},
	data() {
		return {}
	},
	methods: {

	},
	mounted() {

	}
}
</script>

<style lang="less">
.p-page1 {

}
</style>
