import $vue from 'vue';

import $app from '@/App.vue';
import $store from './vuex';
import $router from './router';
import './mixin';
import './assets/icon';
import 'normalize.css';
// 引入项目通用样式
import 'css/common.less'

$vue.config.productionTip = false
// user老老实实用就行了莫乱搞事
$vue.config.devtools = process.env.NODE_ENV === 'development'

$vue.prototype.projectId = '887'; // 日志上报项目id

$vue.prototype.HOST = '/api'; // 此处可根据个人习惯设置 此处的‘api’ 跟index.js中的‘api’一致，则所有的请求只需要使用this.HOST即可

new $vue({
	store: $store,
	router: $router,
	el: '#app',
	render: h => h($app)
});
