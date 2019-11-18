const pages_menu1_edit = () => import('pages/menu1/edit.vue')
const pages_menu1_list = () => import('pages/menu1/list.vue')

const routerList = [{
	path: '/menu1/edit',
	component: pages_menu1_edit
},
{
	path: '/menu1/list',
	component: pages_menu1_list
}]

export default routerList
