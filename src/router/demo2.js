const pages_menu2_edit = () => import('pages/demo2/edit.vue')
const pages_menu2_list = () => import('pages/demo2/list.vue')

const routerList = [{
	path: '/demo2/edit',
	component: pages_menu2_edit
},
{
	path: '/demo2',
	component: pages_menu2_list
}]

export default routerList
