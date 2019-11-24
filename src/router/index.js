import $vue from 'vue'
import $vueRouter from 'vue-router'
import $Auth from '../util/authority'
import $authDic from '../model/authDictionary'
import $menu1 from './menu1'
import $menu2 from './menu2'
import $default from './default'
import $menus from '../model/menu'
import $store from '../vuex/index'
const $notFound = () => import(/* webpackChunkName: "notFound" */ 'pages/notFound')

$vue.use($vueRouter)

const router = new $vueRouter()

// 【勿删】根据权限的动态路由控制。setTimeout模拟拉取用户信息
setTimeout(() => {
	// 将权限字典 + roleId传入权限组件
	const auth = new $Auth($authDic, 101)
	// 获取经过权限过滤后的路由
	const routerList = auth.getRouterList([...$menu1, ...$menu2])
	router.addRoutes([
		...routerList,
		...$default,
		{
			path: '*',
			component: $notFound
		}
	])
	// 获取经过权限过滤后的菜单
	const menuList = auth.getMenuList($menus)
	// 权限过滤后的菜单保存至vuex
	$store.commit('menu/setMenu', menuList)
}, 2000)
// 以下，根据权限动态添加
// router.addRoutes($menu1)
// router.addRoutes($menu2)


export default router
