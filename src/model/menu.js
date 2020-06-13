const menus = [
	{
		title: '工具示例',
		icon: 'gear',
		submenu: [
			{
				title: '使用示例',
				url: '/demo1'
			}
		]
	},
	{
		title: '组件示例',
		icon: 'clock',
		submenu: [
			{
				title: '数据管理',
				icon: 'clock',
				submenu: [
					{
						title: '数据列表',
						url: '/demo2'
					}
				]
			}
		]
	},
	// 按钮访问权限控制示例，如开启权限控制，可参考
	// {
	// 	title: '操作过滤',
	// 	icon: 'clock',
	// 	url: '/demo3'
	// }
]

export default menus
