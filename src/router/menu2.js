const $list = () => import('pages/menu2/list.vue');
const $edit = () => import('pages/menu2/edit.vue');

const routerList = [
	{
		path: '/menu2',
		component: $list
	},
	{
		path: '/menu2/edit',
		component: $edit
	}
];

export default routerList;
