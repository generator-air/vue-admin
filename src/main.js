import $vue from 'vue';
import $elementUI from 'element-ui';
import $axios from 'axios'; // 引入axios
import $qs from 'qs'; // 引入qs
import $app from '@/App.vue';
import $emontior from '@/util/emontior';
// import $store from './store' // 暂未使用，先注释
// import $router from './router' // 暂未使用，先注释

import 'element-ui/lib/theme-chalk/index.css';
import './mixin'
import './assets/icon'
import '../node_modules/normalize.css/normalize.css'

$vue.prototype.project = 'vue-admin'; // 项目名称

$vue.prototype.$http = $axios;
$vue.prototype.HOST = '/api' // 此处可根据个人习惯设置 此处的‘api’ 跟index.js中的‘api’一致，则所有的请求只需要使用this.HOST即可

$vue.prototype.project = 'vue-admin'; // 项目名称

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

$vue.use($elementUI);
// 使用emontior
$vue.use($emontior);

new $vue({
  el: '#app',
  render: h => h($app)
});
