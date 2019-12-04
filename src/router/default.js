const pages_about = () => import('pages/about.vue')
const pages_home = () => import('pages/home.vue')
const pages_demo = () => import('pages/demo.vue')
const pages_notFound = () => import('pages/notFound.vue')

const routerList = [
	{
		path: '/about',
		component: pages_about
	},
	{
		path: '/home',
		component: pages_home
	},
	{
		path: '/notFound',
		component: pages_notFound
	},
	{
		path: '/demo',
		component: pages_demo
	}
]

export default routerList
