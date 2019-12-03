const dictionary = {
	101: [
		{
			path: '/menu1',
			operations: ['create', 'edit', 'delete']
		},
		{
			path: '/menu2',
			operations: ['create', 'edit']
		},
		{
			path: '/menu3',
			operations: ['create', 'edit']
		},
		{
			path: '/about',
			operations: ['create']
		}
	],
	102: [
		{
			path: '/menu1/edit',
			operations: ['edit', 'delete']
		},
		{
			path: '/menu2'
		}
	]
}

export default dictionary;
