const pages_demo2_common = () => import('pages/demo2/common.vue')
const pages_demo2_list = () => import('pages/demo2/list.vue')

const routerList = [{
	path: '/demo2/common',
	component: pages_demo2_common
},
{
	path: '/demo2',
	component: pages_demo2_list
}]

export default routerList
