export default {
	403: () => console.log('403报错'),
	404: () => console.log('%c404了~', 'color: blue'),
	503: '发现503错误',
	200: {
		3000: '服务器返回了一个3000',
		8000: () => {
			console.log('服务器返回了8000')
		}
	}
}
