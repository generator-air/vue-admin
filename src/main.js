import $vue from 'vue';
import $elementUI from 'element-ui';

import $app from '@/App.vue';
import $emontior from '@/util/emontior';
import $request from '@/util/request';
import $Aegis from '@/util/aegis';
// import $store from './store' // 暂未使用，先注释
import $router from './router' // 暂未使用，先注释

import 'element-ui/lib/theme-chalk/index.css';
import './mixin'
import './assets/icon'
import '../node_modules/normalize.css/normalize.css'

$vue.prototype.project = 'vue-admin'; // 项目名称


$vue.prototype.HOST = '/api' // 此处可根据个人习惯设置 此处的‘api’ 跟index.js中的‘api’一致，则所有的请求只需要使用this.HOST即可

$vue.prototype.project = 'vue-admin'; // 项目名称


$vue.use($elementUI);
// 使用emontior
$vue.use($emontior);
// 使用Aegis
$vue.use($Aegis);
// 配置网络请求模块
$vue.use($request);

new $vue({
	router: $router,
  el: '#app',
  render: h => h($app)
});
