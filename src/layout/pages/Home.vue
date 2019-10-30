<template lang="pug">
#app1
	img(src="@/assets/logo.png")
	div
		p
			| If Element is successfully added to this project, you'll see an
			code(v-text="'<el-button>'")
			| below
		el-button el-button
		HelloWorld(msg="Welcome to Your Vue.js App")
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
