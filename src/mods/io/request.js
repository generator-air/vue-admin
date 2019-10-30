import $axios from 'axios';
import $bus from '@/mods/mixin/bus';
import $logger from '@/mods/util/logger';

let logger = $logger('io/request');

const request = options => {
	let conf = Object.assign({
		url: '',
		method: 'get',
		responseType: 'text',
		// 是否自定义错误处理流程
		customError: false,
		withCredentials: true
	}, options);
	logger.info('conf:', conf);

	$bus.emit('progress-start');

	const netErrMsg = '请求失败，请检查网络';

	let pm = $axios(conf).then(xhr => {
		$bus.emit('progress-end');
		logger.info('xhr:', xhr);
		if (xhr) {
			if (xhr.data) {
				let rs = xhr.data;
				if (conf.customError || rs.code === 0) {
					return rs;
				}
				if (rs.msg) {
					return Promise.reject(rs.msg);
				}
				return Promise.reject(new Error(`请求失败(${rs.code})`));
			}
			return Promise.reject(new Error(`${netErrMsg}(${xhr.status})`));
		}
		return Promise.reject(new Error(`${netErrMsg}(未取得xhr对象)`));
	}).catch(err => {
		$bus.emit('progress-fail');
		logger.info('err:', err.response);
		let msg = '';
		let statusMsg = netErrMsg;
		// 登录认证失败，返回403，走catch
		if (err && err.response) {
			const code = err.response.data.code;
			// 未登录/登录过期
			if (code === 3000) {
				statusMsg = '身份认证失败，请登录';
				// 保证跳转发生在$notify提示语之后
				setTimeout(() => $bus.emit('require-signin'), 2000);
			} else if (code === 3001) {
				statusMsg = '账号或密码错误';
			} else if (code === 3002) {
				statusMsg = '验证码错误';
			} else if (code === 3003) {
				statusMsg = '当前用户权限发生变更，请重新登录';
				// 保证跳转发生在$notify提示语之后
				setTimeout(() => $bus.emit('require-signin'), 2000);
			}
		} else if (typeof err === 'string') {
			statusMsg = err;
		} else if (err && err.message) {
			statusMsg = err.message;
		}
		msg = `${statusMsg}`;
		return Promise.reject(msg);
	});

	return pm;
};

export default request;
