<template lang="pug">
	.p-page1-edit page1-edit
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
.p-page1-edit {

}
</style>
