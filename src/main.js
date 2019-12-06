import $vue from 'vue';
import $elementUI from 'element-ui';

import $app from '@/App.vue';
import $store from './vuex';
import $router from './router';
import '@/assets/index'
import 'element-ui/lib/theme-chalk/index.css';
import './mixin';
import './assets/icon';
import 'normalize.css';

$vue.config.productionTip = false

$vue.prototype.projectId = '887'; // 日志上报项目id

$vue.prototype.HOST = '/api'; // 此处可根据个人习惯设置 此处的‘api’ 跟index.js中的‘api’一致，则所有的请求只需要使用this.HOST即可

$vue.use($elementUI);

new $vue({
	store: $store,
	router: $router,
	el: '#app',
	render: h => h($app)
});
