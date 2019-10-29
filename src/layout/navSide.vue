<template lang="pug">
el-menu.p-navSide(
	:default-active="activeIndex"
	:collapse="isCollapse"
	:unique-opened="true"
	text-color="#ffffff"
	background-color="#334654"
	active-text-color="#1bbc9c"
	router
)
	template(v-for="menu in navList")
		el-submenu(
			v-if="!menu.hidden && menu.subnav"
			:index="menu.title"
		)
			template(slot="title")
				svg.icon(:aria-hidden="true")
					use(:xlink:href="'#' + menu.icon")
				span.title {{menu.title}}
			el-menu-item(
				v-for="item in menu.subnav"
				:key="item.url"
				:index="item.url"
			)
				span.title(slot="title") {{item.title}}
		el-menu-item(
			v-if="!menu.hidden && !menu.subnav"
			:index="menu.url"
		)
			svg.icon(:aria-hidden="true")
				use(:xlink:href="'#' + menu.icon")
			span.title(slot="title") {{menu.title}}
</template>

<script>
import { mapState } from 'vuex'
import flattenDeep from 'lodash/flattenDeep'

const routeList = [
	{
		title: '菜单1',
		icon: 'clock',
		subnav: [
			{
				title: '子菜单1',
				url: '/about'
			}, {
				title: '子菜单2',
				url: '/submenu'
			}
		]
	},
	{
		title: '菜单2',
		icon: 'rili',
		subnav: [
			{
				title: '子菜单3',
				url: '/submenu2'
			}
		]
	}
]

// 只支持二级列表
// 二级列表的汇总菜单不携带链接
export default {
	data () {
		return {
			isCollapse: false
		}
	},
	computed: {
		...mapState('user', [
			'userInfo'
		]),
		navList () {
			return routeList
		},
		activeIndex () {
			const routes = flattenDeep(routeList.map(route => route.subnav))
			const activeRoute = routes.filter(
				route => {
					return this.$route.path.indexOf(route.url) >= 0
				}
			)
			if (activeRoute.length > 0) {
				return activeRoute[0].url
			}
			return '/'
		}
	},
	methods: {
		// 点击左侧菜单的开关按钮
		toggle () {
			this.isCollapse = !this.isCollapse
			this.$emit('side-toggle', this.isCollapse)
		}
	},
	mounted () {
		this.$emit('side-toggle', this.isCollapse)
	}
}
</script>

<style lang="less">
#app .p-navSide {
	border-right: none;
}
</style>
