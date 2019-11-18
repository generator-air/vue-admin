/**
 * （1）不使用namespace：叶子菜单的 url，作为一个命名空间。路由设计要求：值唯一，且不可重复。菜单栏的选中回显，根据url是否包含叶子菜单的路由判断
 * （2）使用namespace：url 可自由设计，但需要包含 namespace。菜单栏的选中回显，根据url是否包含namespace判断
 */
const namespace = true // 开发者手动指定
const menus = [
	{
		title: '菜单1',
		icon: 'clock',
		submenu: [
			{
				title: '子菜单1',
				url: '/home',
				namespace: 'home'
			},
			{
				title: '子菜单2',
				icon: 'clock',
				submenu: [
					{
						title: '三级菜单1',
						url: '/menu1',
						namespace: 'menu1'
					},
					{
						title: '三级菜单2',
						url: '/menu2',
						namespace: 'menu2'
					}
				]
			}
		]
	},
	{
		title: '菜单2',
		icon: 'gear',
		submenu: [
			{
				title: '子菜单3',
				url: '/submenu',
				namespace: 'submenu'
			}
		]
	},
	{
		title: '菜单3',
		icon: 'clock',
		url: '/about',
		namespace: 'about'
	}
]

export {
	menus,
	namespace
}
