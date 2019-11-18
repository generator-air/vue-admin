const $list = () => import('pages/menu1/list.vue');
const $edit = () => import('pages/menu1/edit.vue');

const routerList = [
	{
		path: '/menu1',
		component: $list
	},
	{
		path: '/menu1/edit',
		component: $edit
	}
];

export default routerList;
