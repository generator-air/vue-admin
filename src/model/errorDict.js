export default {
	/** 【未登录/登录过期处理demo】假如 403 为未登录/登录过期等错误，跳到登录页，执行重新登录。
	【Replace】根据实际情况对应错误码 & 替换登录页面 url
	*/
	403: () => location.href = 'http://mp.weixin.qq.com',
	404: () => console.log('%c404了~', 'color: blue'),
	200: {
		3000: '服务器返回了一个3000',
		/** 【接口无权访问处理demo】假如 200 && 3005 为无权访问接口错误，强制刷新页面，重新获取用户信息（包含权限信息）
		 * 【Replace】根据实际情况替换错误码 & 替换项目首页 url（强制刷新）
		 */
		3005: () => location.href = 'http://localhost:8090/#/login',
		8000: () => {
			console.log('服务器返回了8000')
		}
	}
}
