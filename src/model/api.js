// 统一的接口管理

const API = {}

API.getUserInfo = '/getUserInfo'
API.getList = '/list'


// 如果是开发模式，为接口路径手动添加./dev前缀，用于proxy代理匹配
if (document.domain.indexOf('.com') === -1) {
	Object.keys(API).forEach(key => {
		API[key] = '/dev' + API[key]
	})
}

export default API
