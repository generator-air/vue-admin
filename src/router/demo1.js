const pages_demo1_detail = () => import('pages/demo1/detail.vue')
const pages_demo1_edit = () => import('pages/demo1/edit.vue')
const pages_demo1_index = () => import('pages/demo1/index.vue')

const routerList = [
	{
		path: '/demo1/detail',
		component: pages_demo1_detail
	},
	{
		path: '/demo1/edit',
		component: pages_demo1_edit
	},
	{
		path: '/demo1',
		component: pages_demo1_index
	}
]

export default routerList
