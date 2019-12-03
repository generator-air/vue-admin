import $request from '@/mixin/request'
import $api from './api'
import $notify from '@/util/notify'
const Api = {}


// 根据字段查询,key为空全局搜索
Api.list = para =>$request.$get($api['list'], para).catch(
	err => $notify.error(err)
)
export default Api
