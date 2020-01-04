// 统一的接口管理
const API = {
	getUserInfo: '/getUserInfo',
	getList: '/list',
	getDetail: '/getId',
	add: '/add',
	update: '/modify',
	batch: '/batch'
}

// 如果是开发模式，为接口路径手动添加./dev前缀，用于proxy代理匹配
if (process.env.NODE_ENV === 'development') {
	Object.keys(API).forEach(key => {
		API[key] = '/dev' + API[key]
	})
}

export default API
