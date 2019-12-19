const dictionary = {
	/**
	 * roleId : [{
	 * 	path: '/xxx',
	 * 	operations: ['aaa', 'bbb', 'ccc']
	 * }]
	 */
	101: [
		{
			path: '/demo1',
			operations: ['create', 'edit', 'delete']
		},
		{
			path: '/demo2',
			operations: ['create', 'edit']
		},
		{
			path: '/demo3',
			operations: ['create', 'edit', 'delete']
		},
		{
			path: '/demo3/edit',
			operations: ['create', 'edit']
		},
		{
			path: '/demo3/detail',
			operations: ['delete']
		}
	],
	102: [
		{
			path: '/demo1/edit',
			operations: ['edit', 'delete']
		},
		{
			path: '/demo2'
		}
	]
}

export default dictionary;
