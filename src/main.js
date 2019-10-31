import $vue from 'vue';
import $elementUI from 'element-ui';
import $app from '@/App.vue';
import $emontior from '@/util/emontior';
// import $store from './store' // 暂未使用，先注释
// import $router from './router' // 暂未使用，先注释

import 'element-ui/lib/theme-chalk/index.css';
import './mixin'
import './assets/icon'
import '../node_modules/normalize.css/normalize.css'

$vue.prototype.project = 'vue-admin'; // 项目名称

$vue.use($elementUI);
// 使用emontior
$vue.use($emontior);

new $vue({
  el: '#app',
  render: h => h($app)
});
