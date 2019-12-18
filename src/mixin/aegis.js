import Aegis from 'aegis-web-sdk'
import $config from '../../config'
// 日志监控模块注入
const install = function (Vue) {
	Object.defineProperties(Vue.prototype, {
		$aegis: {
			get() {
				let aegis = {}
				if ($config.logReport) {
					aegis = new Aegis({
						id: this.projectId, // 在 aegis.qq.com 申请到的 id
					})
				}
				return {
					/* 上报普通日志 */
					logI: (msg, opened) => {
						if (opened && aegis) {
							aegis.info(msg)
						}
					},
					/* 上报错误日志 */
					logE: (msg, opened) => {
						if (opened && aegis) {
							aegis.report(msg)
						}
					},
					/* 上报测速日志 */
					report: (url, opened) => {
						if (opened && aegis) {
							aegis.reportSpeedLog({
								url, // 请求地址,
								method: 'get', // 请求方法
								duration: 1000, // 耗时 ms
								isHttps: true, // 请求地址是否https
								ret: 0, // cgi 的状态码，如果是图片或其他的，则没有该字段
								status: 200, // http 返回码
							})
						}
					}
				}
			}
		}
	})
}

export default {
	install
}
