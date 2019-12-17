import axios from 'axios'
import type from '@/util/type'
import errorDict from '../model/errorDict'
import $notify from '@/util/notify'

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
	return Promise.reject(msg)
}

axios.interceptors.response.use(({ data, status }) => {
	if (data.code === 0 && status === 200) {
		// 没有错误的理想情况直接返回 payload
		return data
	}
	// 不是理想情况的，需要使用错误码字典
	return useDict(status, data.code, data.msg || '网络错误')
}, err => {
	if (err.response) {
		const { status, data } = err.response
		return useDict(status, data.code, data.msg || err.message)
	}
	return Promise.reject(err.message)
})

function $request(options) {
	return axios({
		headers: {
			// ajax 请求标识，部分服务器会区别对待 ajax 请求和普通请求
			'X-Requested-With': 'XMLHttpRequest'
		},
		...options
	}).catch($notify.error)
}

const postHeaders = {
	'X-Requested-With': 'XMLHttpRequest',
	// 标准 HTML form 格式
	'Content-Type': 'application/x-www-form-urlencoded'
}

const exportObj = {
	$get: (url, params) => $request({
		url,
		params: typeof params === 'boolean' ? {} : params,
		method: 'get',
		// 跨域携带cookie
		// withCredentials: true
	}),
	$post: (url, data) => $request({
		url,
		params: typeof data === 'boolean' ? {} : data,
		method: 'post',
		headers: postHeaders,
		// 跨域携带cookie
		// withCredentials: true
	}),
	$put: (url, data) => $request({
		url,
		params: typeof data === 'boolean' ? {} : data,
		method: 'put',
		headers: postHeaders,
		// 跨域携带cookie
		// withCredentials: true
	}),
	$delete: (url, data) => $request({
		url,
		params: typeof data === 'boolean' ? {} : data,
		method: 'delete',
		headers: postHeaders,
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
	$request,
	...exportObj
}
