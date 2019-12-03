const menus = [
	{
		title: '一级菜单',
		icon: 'clock',
		url: '/menu1'
	},
	{
		title: '一级菜单',
		icon: 'gear',
		submenu: [
			{
				title: '二级菜单',
				url: '/menu2'
			}
		]
	},

	{
		title: '一级菜单',
		icon: 'clock',
		submenu: [
			{
				title: '二级菜单',
				icon: 'clock',
				submenu: [
					{
						title: '三级菜单',
						url: '/menu3'
					}
				]
			}
		]
	},
]

export default menus
