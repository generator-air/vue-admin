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
	template(v-for="menuItem in menuList")
		el-submenu(
			v-if="!menuItem.hidden && menuItem.submenu"
			:index="menuItem.title"
		)
			template(slot="title")
				svg-icon(:name="menuItem.icon")
				span.title {{menuItem.title}}
			template(
				v-for="submenuItem in menuItem.submenu"
			)
				el-submenu(
					v-if="submenuItem.submenu"
					:index="submenuItem.title"
				)
					template(slot="title")
						svg-icon(:name="submenuItem.icon")
						span.title {{submenuItem.title}}
					el-menu-item(
						v-for="item in submenuItem.submenu"
						:key="item.namespace || item.url"
						:index="item.namespace || item.url"
					)
						span.title(slot="title") {{item.title}}
				el-menu-item(
					v-else
					:key="submenuItem.namespace || submenuItem.url"
					:index="submenuItem.namespace || submenuItem.url"
				)
					span.title(slot="title") {{submenuItem.title}}
		el-menu-item(
			v-if="!menuItem.hidden && !menuItem.submenu"
			:index="menuItem.namespace || menuItem.url"
		)
			template(slot="title")
				svg-icon(:name="menuItem.icon")
				span.title {{menuItem.title}}
</template>

<script>
import { mapState } from 'vuex'
import { menus, namespace } from '../model/menu'

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
		menuList () {
			return menus
		},
		activeIndex () {
			let keyType = ''
			const arr = []
			if (namespace) {
				keyType = 'namespace'
			} else {
				keyType = 'url'
			}
			menus.forEach(menu => {
				this.getKeyWords(keyType, menu, arr)
			})
			return arr.filter(item => this.$route.path.indexOf(item) > -1)[0]
		}
	},
	methods: {
		// 点击左侧菜单的开关按钮
		toggle () {
			this.isCollapse = !this.isCollapse
			this.$emit('side-toggle', this.isCollapse)
		},
		getKeyWords(keyType, menuItem, arr) {
			if (menuItem[keyType]) {
				arr.push(menuItem[keyType])
			} else if (menuItem.submenu) {
				menuItem.submenu.forEach(item => {
					this.getKeyWords(keyType, item, arr)
				})
			}
		},
		// getUrls(menuItem, arr) {
		// 	if (menuItem.url) {
		// 		arr.push(menuItem.url)
		// 	} else if (menuItem.submenu) {
		// 		menuItem.submenu.forEach(item => {
		// 			this.getUrls(item, arr)
		// 		})
		// 	}
		// }
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
