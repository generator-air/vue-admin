import $request from '@/mixin/request'
import $api from './api'

const Api = {}


// 根据字段查询,key为空全局搜索
Api.list = para => $request.$get($api['list'], para).catch(
	err => console.error(err)
)
export default Api
