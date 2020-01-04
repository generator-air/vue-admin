import $notify from '@/util/notify'

export default {
	404: '啊哦，404了',
	200: {
		// 未登录情况处理demo
		3000: () => {
			$notify.error('身份验证失败，请重新登录')
			setTimeout(() => {
				// 【自定义】跳转到第三方登录，地址自定义
				location.href = 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=APPID&agentid=AGENTID&redirect_uri=REDIRECT_URI'
			}, 2000)
		},
		// 构造无权访问情况，返回的用户信息
		3007: () => ({ unAuth: true })
	}
}
