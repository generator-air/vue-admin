import axios from 'axios'
import type from '@/util/type'
import get from 'lodash/get'

let errorDict = {}
/**
 *  {
			3000: ‘身份验证不通过’,
			3001: {
				action: () => {
					location.href=“www.baidu.com”
				},
				message: ‘登录过期，请重新登录’
			}
		}
 */

const NET_ERROR_MSG = '请求失败，请检查网络'
const URL_FORMAT_ERROR = '请求地址格式错误，请检查'
const REQUEST_PARAMETER_ERROR = '请求参数错误，请检查'
const ERROR_CODE_DICT_TYPE_ERROR = '错误码字典的类型必须是Object'

const reject = reason => Promise.reject(new Error(reason))

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
	if (type(url) !== 'string') {
		return false
	}
	return /^https?:\/\//.test(url)
}

const doWith = sth => {
	// 处理多类型数据
	const sthType = type(sth)
	switch (sthType) {
		case 'string':
			return sth
		case 'function':
			return sth()
		case 'object':
			sth.message && console.log(sth.message)
			if (type(sth.action) === 'function') {
				sth.action()
				return sth.message
			} else {
				throw new Error('action 的类型应该是 function')
			}
		default:
			return ''
	}
}

const useDict = (code, spare) => {
	const item = errorDict[code]
	if (type(item) === 'undefined') {
		// 没有字典内容
		return doWith(spare)
	} else {
		return doWith(item)
	}
}

// 需要保证请求的地址为绝对地址（http:// or https://）
function req (options) {
	let req = null
	const optType = type(options)
	if (optType === 'string') {
		// 直接过来一个 url 地址
		if (legalUrl(options)) {
			req = axios(options)
		} else {
			throw new Error(URL_FORMAT_ERROR)
		}
	} else if (optType === 'object') {
		const requestOption = {
			method: getMethod(options),
			data: options.data || {},
			url: options.url,
			// 处理跨域
			withCredentials: false,
			// 是否自定义错误处理流程
			customError: options.customError || false
		}
		// 参数是个 Obj
		if (!legalUrl(options.url)) {
			throw new Error(URL_FORMAT_ERROR)
		}
		if (requestOption.method === 'get') {
			requestOption.params = options.data || {}
		} else if (requestOption.method === 'post') {
			requestOption.params = options.data || {}
		}
		req = axios(requestOption)
	} else {
		// 参数错误(这里是直接return一个reject还是throw一个error比较好？)
		return reject(REQUEST_PARAMETER_ERROR)
	}
	return req.then(res => {
		const rowData = res.data
		// 这里有点不明白 option 配置中的 customError 有什么用，栋哥写的还是 axios 的配置项？
		if (options.row || options.custom || options.customError) {
			return rowData
		} else if (!rowData) {
			// 优先返回用户定义的错误字典内的信息
			return reject(useDict([res.status], NET_ERROR_MSG + res.status))
		} else if (Number(rowData.code) === 0) {
			return rowData.data
		} else if (rowData.msg) {
			return reject('请求失败：' + rowData.msg)
		} else if (rowData.code) {
			// 优先返回用户定义的错误字典内的信息
			return reject(useDict([rowData.code], '请求失败：' + rowData.code))
		} else {
			return reject(NET_ERROR_MSG)
		}
	}).catch(err => {
		console.log('test')
		let error = null
		const code = Number(get(err, 'response.status'))
    if (code) {
			error = doWith(errorDict[code])
		} else {
			error = err.msg
		}
		return Promise.reject(error)
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
