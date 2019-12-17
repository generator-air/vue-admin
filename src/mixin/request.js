import axios from 'axios'
import type from '@/util/type'
import errorDict from '../model/errorDict'
import $notify from '@/util/notify'
import $env from '@/model/env'

let raw = false

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
	const msg = doWith(dictMatch) || spare
	$notify.error(msg)
	return Promise.reject(msg)
}

// 全局拦截器
axios.interceptors.request.use(config => {
	raw = !!config.source
	if (/^https?:\/\//.test(config.url)) {
		return config
	}
	config.url = $env.domain + config.url
	return config
})

axios.interceptors.response.use(({ data, status }) => {
	if (data.code === 0 && status === 200) {
		if (raw) {
			return data
		}
		// 没有错误的理想情况直接返回 payload
		return data.data || data
	}
	// 不是理想情况的，需要使用错误码字典
	return useDict(status, data.code, data.msg || data)
}, err => {
	if (err.response) {
		const { status, data } = err.response
		return useDict(status, data.code, data.msg || err.message)
	}
	$notify.error(err.message)
	return Promise.reject(err.message)
})

const exportObj = {
	$request: options => axios({
		headers: {
			// ajax 请求标识，部分服务器会区别对待 ajax 请求和普通请求
			'X-Requested-With': 'XMLHttpRequest'
		},
		...options
	}),
	$get: (url, params, source) => axios({
		url,
		params: typeof params === 'boolean' ? {} : params,
		source: typeof params === 'boolean' ? params : source,
		method: 'get',
		headers: {
			// ajax 请求标识，部分服务器会区别对待 ajax 请求和普通请求
			'X-Requested-With': 'XMLHttpRequest'
		},
		// 跨域携带cookie
		// withCredentials: true
	}),
	$post: (url, data, source) => axios({
		url,
		params: typeof data === 'boolean' ? {} : data,
		source: typeof data === 'boolean' ? data : source,
		method: 'post',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			// 标准 HTML form 格式
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		// 跨域携带cookie
		// withCredentials: true
	}),
	$put: (url, data, source) => axios({
		url,
		params: typeof data === 'boolean' ? {} : data,
		source: typeof data === 'boolean' ? data : source,
		method: 'put',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		// 跨域携带cookie
		// withCredentials: true
	}),
	$delete: (url, data, source) => axios({
		url,
		params: typeof data === 'boolean' ? {} : data,
		source: typeof data === 'boolean' ? data : source,
		method: 'delete',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		// 跨域携带cookie
		// withCredentials: true
	})
}

const install = Vue => {
	// 插件安装
	Object.keys(exportObj).forEach(method => {
		Vue.prototype[method] = exportObj[method]
	})
}

export default {
	install,
	...exportObj
}
