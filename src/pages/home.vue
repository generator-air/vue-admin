<template lang="pug">
#app1
	img(src="@/assets/logo.png")
	div
		p
			| If Element is successfully added to this project, you'll see an
			code(v-text="'<el-button>'")
			| below
		el-button(@click="changeUser") el-button
		p state of user: {{ userInfo.name }}
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
		...mapState('user', [
			'userInfo'
		])
	},
	methods: {
		...mapMutations('user', [
			'setUserInfo'
		]),
		changeUser () {
			this.setUserInfo({
				name: 'Adam'
			})
		}
	}
}
</script>
