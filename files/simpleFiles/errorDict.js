export default {
	/** 【未登录/登录过期处理demo】假如 403 为未登录/登录过期等错误，跳到登录页，执行重新登录。
	【Replace】根据实际情况对应错误码 & 替换登录页面 url
	*/
	403: () => location.href = 'http://mp.weixin.qq.com',
	404: '啊哦，404了',
	200: {
		3000: '服务器返回了一个3000',
		/** 【接口无权访问处理demo】假如 200 && 3005 为无权访问接口错误，跳转到第三方登录页（以企业微信登录为例）
		 * 【Replace】根据实际情况替换错误码 & 第三方登录地址
		 */
		3005: () => location.href = 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=APPID&agentid=AGENTID&redirect_uri=REDIRECT_URI&'
	}
}
