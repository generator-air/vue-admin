import $vue from 'vue'
import $vueRouter from 'vue-router'
import $Auth from 'authority-filter'
import $request from '../mixin/request'
import $authDic from '../model/authDict'
import $demo1 from './demo1'
import $demo2 from './demo2'
import $demo3 from './demo3'
import $allMenus from '../model/menu'
import $store from '../vuex/index'
import $api from '../model/api'

const $home = () => import(/* webpackChunkName: "home" */ 'pages/home')
const $notFound = () => import(/* webpackChunkName: "notFound" */ 'pages/notFound')

// vue-router v3.1.x 版本，两次点击相同路由引起的报错问题处理
const originalPush = $vueRouter.prototype.push
$vueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

$vue.use($vueRouter)

const router = new $vueRouter()

// 拉取用户信息（【Replace】需替换为实际的接口地址）
$request.$get($api.getUserInfo).then(res => {
	if (res && res.data) {
		// 全局存储用户信息
		$store.commit('user/setUserInfo', res.data)
		// 将权限字典 + roleId传入权限组件
		const auth = new $Auth($authDic, res.data.roleId)
		// 全局存储 auth 对象
		$store.commit('user/setAuth', auth)
		// 获取经过权限过滤后的路由
		const routerList = auth.getRouterList([...$demo1, ...$demo2, ...$demo3])
		router.addRoutes([
			...routerList,
			{
				path: '/',
				redirect: '/home'
			},
			{
				path: '/home',
				component: $home
			},
			{
				path: '*',
				component: $notFound
			}
		])
		// 获取经过权限过滤后的菜单
		const menuList = auth.getMenuList($allMenus)
		// 权限过滤后的菜单保存至vuex
		$store.commit('menu/setMenu', menuList)
	}
})

export default router
