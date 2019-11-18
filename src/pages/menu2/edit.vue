<template lang="pug">
	.p-page2 page2
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
.p-page2 {

}
</style>
