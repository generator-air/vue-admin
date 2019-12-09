const menus = [
	{
		title: '一级菜单',
		icon: 'clock',
		url: '/demo1'
	},
	{
		title: '一级菜单',
		icon: 'gear',
		submenu: [
			{
				title: '二级菜单',
				url: '/demo2'
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
						url: '/demo3/list'
					}
				]
			}
		]
	},
]

export default menus
