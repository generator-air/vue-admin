const menus = [
	{
		title: '菜单1',
		icon: 'clock',
		submenu: [
			{
				title: '子菜单1',
				url: '/home'
			},
			{
				title: '子菜单2',
				icon: 'clock',
				submenu: [
					{
						title: '三级菜单1',
						url: '/menu1'
					},
					{
						title: '三级菜单2',
						url: '/menu2'
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
				url: '/submenu'
			}
		]
	},
	{
		title: '菜单3',
		icon: 'clock',
		url: '/about'
	}
]

export default menus
