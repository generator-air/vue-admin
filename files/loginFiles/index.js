import $vue from 'vue'
import $vueRouter from 'vue-router'
import $Auth from 'authority-filter'
import $authDic from '../model/authDict'
import $request from '../mixin/request'
import $menus from '../model/menu'
import $store from '../vuex/index'
import $api from '../model/api'

const $home = () => import(/* webpackChunkName: "home" */ 'pages/home')
const $login = () => import(/* webpackChunkName: "login" */ 'pages/login.vue')
const $unAuth = () => import(/* webpackChunkName: "unAuth" */ 'pages/unAuth.vue')
const $notFound = () => import(/* webpackChunkName: "notFound" */ 'pages/notFound')

// 批量引入 @/router 下的所有文件
const routerContext = require.context('@/router', false, /\.js$/i)
// 存放所有路由
let routers = []
const importAllRouters = requireContext => requireContext.keys().forEach(
	item => {
		if (item.indexOf('index.js') > -1) {
			return
		}
		// 收集所有路由
		routers = routers.concat(requireContext(item).default)
	}
)
importAllRouters(routerContext)

// vue-router v3.1.x 版本，两次点击相同路由引起的报错问题处理
const originalPush = $vueRouter.prototype.push
$vueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

$vue.use($vueRouter)

const router = new $vueRouter({
	routes: [
		{
			path: '/login',
			component: $login
		},
		{
			path: '/unAuth',
			component: $unAuth
		}
	]
})

function getUserInfo() {
	// 拉取用户信息（【Replace】需替换为实际的接口地址）
	return $request.$get($api.getUserInfo).then(res => {
		if (res && res.data) {
			const userInfo = Object.assign({}, res.data)
			// 全局存储用户信息
			$store.commit('user/setUserInfo', userInfo)
			// 将权限字典 + roleId传入权限组件
			const auth = new $Auth($authDic, userInfo.roleId)
			// 全局存储 auth 对象
			$store.commit('user/setAuth', auth)
			// 获取经过权限过滤后的路由
			const routerList = auth.getRouterList(routers)
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
			const menuList = auth.getMenuList($menus)
			// 权限过滤后的菜单保存至vuex
			$store.commit('menu/setMenu', menuList)
			return userInfo
		}
	}).catch(err => {
		if (err.unLogin || err.unAuth) {
			// 全局存储 errorDict 构造的用户信息
			$store.commit('user/setUserInfo', err)
			// 如果当前用户无权访问
			return err
		}
	})
}

// 使用导航守卫，控制各种用户行为下的重定向
router.beforeEach((to, from, next) => {
	getUserInfo().then(userInfo => {
		if (userInfo && userInfo.unLogin) { // 当前未登录
			// 正常进入登录页
			if (to.path === '/login') {
				next()
			} else {
				next('/login')
			}
		} else if (userInfo && userInfo.unAuth) { // 已登录，无权访问系统
			// 正常进入无权访问页
			if (to.path === '/unAuth' || to.path === '/login') {
				next()
			} else {
				next('/unAuth')
			}
		} else if (userInfo) { // 已登录，有权访问系统
			// 用户手动访问登录页 / 无权访问页，重定向到首页
			if (to.path === '/login' || to.path === '/unAuth') {
				next('/')
			} else {
				next()
			}
		}
	})
	next()
})

export default router
