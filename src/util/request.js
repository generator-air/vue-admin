import $axios from 'axios'; // 引入axios
import $qs from 'qs'; // 引入qs

const install = function (Vue) {
	Object.defineProperties(Vue.prototype, {
		$http: {
			get() {
				// 添加请求拦截器
				$axios.interceptors.request.use(config => {
					config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
					if (config.method === 'post') { // post请求时，处理数据
						config.data = $qs.stringify({ ...config.data }) }  // 后台数据接收这块需要以表单形式提交数据，而axios中post默认的提交是json数据,所以这里选用qs模块来处理数据，也有其他处理方式，但个人觉得这个方式最简单好用
						return config;
					}, error => {
						loadinginstace.close()
						return Promise.reject(error);
					})
					// 添加响应拦截器
					$axios.interceptors.response.use(response => {
						return response;
					}, error => {
						return Promise.reject(error);
				});
				return $axios;
			}
		}
	});
};

export default {
	install
};
