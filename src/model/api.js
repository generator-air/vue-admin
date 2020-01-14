// 统一的接口管理
import config from '../../config'

const API = {
	getUserInfo: '/getUserInfo',
	getList: '/list',
	getDetail: '/getId',
	add: '/add',
	update: '/modify',
	batch: '/batch'
}
// 只有开发模式才会有APIMODE变量
if (process.env.APIMODE) {
	const prefix = process.env.APIMODE === 'mock' ? config.mock : '/dev'
	Object.keys(API).forEach(key => {
		API[key] = prefix + API[key]
	})
}

export default API
