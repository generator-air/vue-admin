<template lang="pug">
#app
	.l-left(
		:class="{'l-main__hideLeft': leftStatus}"
	)
		v-logo(title="平台图标")
		v-side.left-side(@side-toggle="toggleLeftStatus")
	.l-right
		v-head.l-header(title="后台管理系统")
		.l-body
			.body-content
				v-demo
				.l-bread
					el-breadcrumb(
						separator="/"
						v-if="$route.meta.breadcrumb"
					)
						el-breadcrumb-item(
							v-for="bread in $route.meta.breadcrumb"
							:key="bread"
							:to="{ name: bread }"
						) {{bread}}
					h3 {{$route.name}}
				router-view.l-route
			v-copyright
</template>

<script>
import { mapState } from 'vuex'
import navHead from '@/layout/navHead'
import navSide from '@/layout/navSide'
import copyright from '@/layout/copyright'
import logo from '@/layout/logo'
import demo from '@/components/demo.vue'

export default {
	components: {
		'v-head': navHead,
		'v-side': navSide,
		'v-copyright': copyright,
		'v-logo': logo,
		'v-demo': demo
	},
	data () {
		return {
			authReady: false,
			userReady: false,
			leftStatus: false
		}
	},
	computed: {
		...mapState('user', [
			'userInfo'
		])
	},
	methods: {
		toggleLeftStatus (status) {
			this.leftStatus = status
		}
	},
	created () {
		// https://yapi.qqmylife.com/mock/227/rule/rules/clearing/final
		// 404 response
		// https://www.gamersky.com/news/201911/123w7764.shtml
		this.$setErrorDict({
			201: {
				3000: 'test with 3000',
				4000: () => console.log('do with 201 and 4000')
			},
			404: () => console.log('ttttt')
		})
		this.$get('https://www.gamersky.com/news/201911/123w7764.shtml')
			.then((e) => {
				console.log('ok', e)
			})
			.catch(e => {
				console.log('error', e)
			})
	}
}
</script>


<style lang="less">
@import "~css/color";

.svg-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
	margin-right: 6px;
}

#app{
	position: relative;
	width: 100%;
	height: 100vh;
	min-width: 1200px;
	overflow: hidden;
}
.l-left {
	width: 200px;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	overflow-y: auto;
	background: @menu-bg
}
.logo {
	width: 200px;
	height: 119px;
	background-color: @menu-bg
}
.left-side {
	height: calc(100% - 203px);
	overflow-y: auto;
	// 隐藏滚动条
	// IE 10+
	-ms-overflow-style: none;
	// Firefox
	overflow: -moz-scrollbars-none;
	// chrome 和 Safari
	&::-webkit-scrollbar {
		display: none;
	}
}
.l-right {
	position: relative;
	height: 100%;
	margin-left: 200px;
}
.l-header {
	position: absolute;
	top: 0;
	height: 60px;
	width: 100%;
}
.l-body {
	width: 100%;
	height: 100%;
	overflow-y: auto;
	box-sizing: border-box;
	border-top: 60px solid transparent;
	position: relative;
	padding: 0 20px;
}
.body-content {
	position: relative;
	width: 100%;
	min-height: calc(100% - 200px);
	overflow: auto;
	box-sizing: border-box;
}
.l-bread {
	background-color: #fff;
	padding: 20px 20px 15px;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	margin-bottom: 20px;
	h3 {
		margin: 10px 0 0;
	}
}
.l-route {
	border-radius: 10px;
	padding: 30px 20px;
	background-color: #fff;
	overflow: auto;
}
</style>
