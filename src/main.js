import $vue from 'vue';
import $elementUI from 'element-ui';

import $app from '@/App.vue';
import $aegis from '@/util/aegis';

import $store from './store';
import $router from './router';

import 'element-ui/lib/theme-chalk/index.css';
import './mixin';
import './assets/icon';
import 'normalize.css';

$vue.prototype.project = 'vue-admin'; // 项目名称

$vue.prototype.HOST = '/api'; // 此处可根据个人习惯设置 此处的‘api’ 跟index.js中的‘api’一致，则所有的请求只需要使用this.HOST即可

$vue.prototype.project = 'vue-admin'; // 项目名称


$vue.use($elementUI);

// 使用Aegis
$vue.use($aegis);


new $vue({
	store: $store,
	router: $router,
	el: '#app',
	render: h => h($app)
});
