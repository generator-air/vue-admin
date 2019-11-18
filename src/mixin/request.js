import axios from 'axios'
import type from '@/util/type'
import errorDict from '../model/errorDict'

const doWith = sth => {
	const sType = type(sth)
	if (sType === 'string') {
		return sth
	} else if (sType == 'function') {
		return sth()
	} else {
		return false
	}
}

const useDict = (status, code, spare) => {
	let dictMatch = errorDict[status]
	const statusType = type(dictMatch)
	if (statusType === 'object') {
		dictMatch = errorDict[status][code]
	}
	return Promise.reject(doWith(dictMatch) || spare)
}

// 全局拦截器
axios.interceptors.response.use(({ data, status }) => {
	if (data.code === 0 && status === 200) {
		// 没有错误的理想情况直接返回 payload
		return data.data
	}
	// 不是理想情况的，需要使用错误码字典
	return useDict(status, data.code, data.msg || data)
}, err => {
	if (err.response) {
		const { status, data } = err.response
		return useDict(status, data.code, data.msg || err.message)
	}
	return Promise.reject(err.message)
})


// put delete 咋办 restful method
const request = Vue => {
	Vue.prototype.get = (url, params) => axios({
		url,
		params,
		method: 'get',
		headers: {
			// ajax 请求标识，部分服务器会区别对待 ajax 请求和普通请求
			'X-Requested-With': 'XMLHttpRequest'
		}
	}),
	Vue.prototype.post = (url, data) => axios({
		url,
		data,
		method: 'post',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			// 标准 HTML form 格式
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

export default request
