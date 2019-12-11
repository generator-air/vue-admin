const pages_about = () => import('pages/about.vue')
const pages_home = () => import('pages/home.vue')
const pages_login = () => import('pages/login.vue')
const pages_notFound = () => import('pages/notFound.vue')

const routerList = [{
	path: '/about',
	component: pages_about
},
{
	path: '/home',
	component: pages_home
},
{
	path: '/login',
	component: pages_login
},
{
	path: '/notFound',
	component: pages_notFound
}]

export default routerList
