const pages_menu2_edit = () => import('pages/menu2/edit.vue')
const pages_menu2_list = () => import('pages/menu2/list.vue')

const routerList = [{
	path: '/menu2/edit',
	component: pages_menu2_edit
},
{
	path: '/menu2/list',
	component: pages_menu2_list
}]

export default routerList
