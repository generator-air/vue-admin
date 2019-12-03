import $request from './request'
import $api from './api'

const Api = {}


// 根据字段查询,key为空全局搜索
Api.list = para => $request({
	url: $api['list'],
	method: 'get',
	params: para
}).then(
	rs => rs.data
).catch(
	err => console.error(err)
)


export default Api
