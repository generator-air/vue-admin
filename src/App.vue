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
import logo from '@/layout/LOGO'

export default {
	components: {
		'v-head': navHead,
		'v-side': navSide,
		'v-copyright': copyright,
		'v-logo': logo
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
	}
}
</script>

<style lang="less">
@import "~css/color";

html {
	line-height: 1.15;
}

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
	min-height: 100%;
	overflow: auto;
	margin-bottom: -200px;
	padding-bottom: 200px;
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
