import axios from 'axios'
import type from '@/utils/type'

const NET_ERROR_MSG = '请求失败，请检查网络'

const reject = reason => Promise.reject(new Error(reason))

// 需要保证请求的地址为绝对地址（http:// or https://）
const request = options => {
	let req = null
	const optType = type(options)
	if (optType === 'string') {
		// 直接过来一个 url 地址
		req = axios(options)
	} else if (optType === 'object') {
		let data = null
		if (options.method && options.method.toLowerCase() === 'post') {
			data = {
				method: 'post',
				data: options.data || {}
			}
		} else {
			data = {
				method: 'get',
				params: options.data || {}
			}
		}
		data = {
			url: options.url,
			// 处理跨域
			withCredentials: false,
			// 是否自定义错误处理流程
			customError: false,
			...data
		}
		req = axios(data)
	} else {
		// 参数错误
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
