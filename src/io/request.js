import axios from 'axios'
import type from '@/util/type'

const NET_ERROR_MSG = '请求失败，请检查网络'

const reject = reason => Promise.reject(new Error(reason))

const getMethod = opt => {
	let method = ''
	if (opt.method && type(options) === 'string') {
		// 传过来的配置里有 method 项并且为字符串，则为用户手动指定 method
		method = options.method.toLowerCase()
	} else {
		method = 'get'
	}
	return method
}

// 需要保证请求的地址为绝对地址（http:// or https://）
const request = options => {
	let req = null
	const optType = type(options)
	if (optType === 'string') {
		// 直接过来一个 url 地址
		req = axios(options)
	} else if (optType === 'object') {
		req = axios({
			method: getMethod(options),
			data: options.data || {},
			url: options.url,
			// 处理跨域
			withCredentials: false,
			// 是否自定义错误处理流程
			customError: false
		})
	} else {
		// 参数错误(这里是直接return一个reject还是throw一个error比较好？)
		return reject('请求参数错误，请检查参数')
	}
	return req.then(res => {
		const data = res.data
		if (options.row || options.custom) {
			return res.data
		} else if (!data) {
			return reject(NET_ERROR_MSG + res.status)
		} else if (Number(data.code) === 0) {
			return data.data
		} else if (data.msg) {
			return reject('请求失败：' + data.msg)
		} else if (data.code) {
			return reject('请求失败：' + data.code)
		} else {
			return reject(NET_ERROR_MSG)
		}
	}).catch(err => {
		if (err && err.message) {
			return reject(err)
		}
	})
}

export default request
