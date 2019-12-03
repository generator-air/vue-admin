import $request from './request'
import $api from './api'

const Api = {}


// 根据字段查询,key为空全局搜索
Api.searchKey = para => $request({
	url: $api['ad-search-key'],
	method: 'get',
	params: para
}).then(
	rs => rs.data
).catch(
	err => console.error(err)
)

// 根据id查询
Api.searchId = id => $request({
	url: $api['ad-search-id'],
	method: 'get',
	params: {
		id
	}
}).then(
	rs => rs.data
).catch(
	err => console.error(err)
)

// 新增词条
Api.addInfo = para => $request({
	url: $api['ad-add'],
	method: 'post',
	params: para
}).then(
	rs => (rs.code === 0)
).catch(
	err => console.error(err)
)

// 更新词条
Api.updateInfo = para => $request({
	url: $api['ad-update'],
	method: 'post',
	params: para
}).then(
	rs => (rs.code === 0)
).catch(
	err => console.error(err)
)

// 根据id删除
Api.delInfo = id => $request({
	url: $api['ad-del'],
	method: 'post',
	params: {
		id
	}
}).then(
	rs => (rs.code === 0)
).catch(
	err => console.error(err)
)

// 导出excel
Api.export = $api['ad-export']

Api.upload = $api['ad-upload']

export default Api
