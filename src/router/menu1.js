const pages_menu1_detail = () => import('pages/menu1/detail.vue')
const pages_menu1_edit = () => import('pages/menu1/edit.vue')
const pages_menu1_index = () => import('pages/menu1/index.vue')

const routerList = [{
	path: '/menu1/detail',
	component: pages_menu1_detail
},
{
	path: '/menu1/edit',
	component: pages_menu1_edit
},
{
	path: '/menu1',
	component: pages_menu1_index
}]

export default routerList
