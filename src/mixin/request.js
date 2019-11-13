import axios from 'axios'
import type from '@/util/type'
import get from 'lodash/get'

let errorDict = {}
/**
 * {
 * 	403: 'Error happened',
 *  404: () => jump(),
 *  203: {
 * 		3000: 'error code is 3000',
 * 		4000: () => console.log('error code is 4000')
 *  }
 * }
 */

const NET_ERROR_MSG = '请求失败，请检查网络 '
const URL_FORMAT_ERROR = '请求地址格式错误，请检查'
const REQUEST_PARAMETER_ERROR = '请求参数错误，请检查'
const ERROR_CODE_DICT_TYPE_ERROR = '错误码字典的类型必须是Object'

const reject = reason => Promise.reject(reason ? new Error(reason) : NET_ERROR_MSG)

const getMethod = opt => {
	let method = ''
	if (opt.method && type(opt.method) === 'string') {
		// 传过来的配置里有 method 项并且为字符串，则为用户手动指定 method
		method = opt.method.toLowerCase()
	} else {
		method = 'get'
	}
	return method
}

// 检查传入的 option 的 url 是否合法
const legalUrl = url => {
	let legal = false
	if (type(url) !== 'string') {
		legal = false
	} else {
		legal = /^https?:\/\//.test(url)
	}
	if (legal) {
		return url
	} else {
		throw new Error(URL_FORMAT_ERROR)
	}
}

const doWith = (sth, spare) => {
	// 处理多类型数据
	sth = sth || spare
	const sthType = type(sth)
	switch (sthType) {
		case 'string':
		case 'number':
			return sth
		case 'function':
			return sth()
		default:
			return 'TYPE ERROR'
	}
}

const useDict = (status, code, spare) => {
	let dictMatch = null
	if (code) {
		dictMatch = get(errorDict, [status, code])
	} else {
		dictMatch = get(errorDict, [status])
	}
	const result = doWith(dictMatch, spare)
	return result || NET_ERROR_MSG + status
}

// 需要保证请求的地址为绝对地址（http:// or https://）
function req (options) {
	let req = null
	const optType = type(options)
	if (optType === 'string') {
		// 直接过来一个 url 地址
		req = axios(legalUrl(options))
	} else if (optType === 'object') {
		// 参数是个 Obj
		const requestOption = {
			method: getMethod(options),
			data: options.data || {},
			url: options.url,
			// 处理跨域
			withCredentials: false,
			// 是否自定义错误处理流程
			customError: options.customError || false
		}
		legalUrl(options.url)
		if (requestOption.method === 'get') {
			requestOption.params = options.data || {}
		} else if (requestOption.method === 'post') {
			requestOption.params = options.data || {}
		}
		req = axios(requestOption)
	} else {
		// 参数错误(这里是直接return一个reject还是throw一个error比较好？)
		throw new Error(REQUEST_PARAMETER_ERROR)
	}
	return req.then(res => {
		console.log(JSON.stringify(res, null, 2))
		const { status, data: rowData } = res
		// 这里有点不明白 option 配置中的 customError 有什么用，栋哥写的还是 axios 的配置项？
		if (options.row || options.custom || options.customError) {
			return rowData
		}
		if (!rowData) {
			return reject(NET_ERROR_MSG + status)
		}
		if (status === 200 && Number(rowData.code) === 0) {
			return rowData.data
		}
		return reject(useDict(status, rowData.code, '请求失败：' + rowData.msg))
	}).catch(err => {
		if (err.response) {
			// status 为 200 以外的并且带有相应的情况
			// 如果跨域则不会有响应
			// 存在响应的时候，响应可以是 JSON，也可以是标签字符串等
			const status = err.response.status
			const code = get(err.response, 'data.code')
			return reject(useDict(status, code, NET_ERROR_MSG + status))
		}
		return Promise.reject(err)
	})
}

const request = Vue => {
	Vue.prototype.$request = req
	Vue.prototype.$setErrorDict = function (dict) {
		if (type(dict) !== 'object') {
			throw new Error(ERROR_CODE_DICT_TYPE_ERROR)
		}
		errorDict = dict
	}
	Vue.prototype.$get = function (url, params = {}) {
		return this.$request({
			url,
			params,
			method: 'get'
		})
	}
	Vue.prototype.$post = function (url, data = {}) {
		return this.$request({
			url,
			data,
			method: 'post'
		})
	}
}

export default request
