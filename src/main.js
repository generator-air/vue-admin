import $vue from 'vue';
import $ElementUI from 'element-ui';
import $App from '@/App.vue';
import $Emontior from '@/mods/util/emontior';

import 'element-ui/lib/theme-chalk/index.css';

$vue.prototype.project = 'vue-admin'; // 项目名称

$vue.use($ElementUI);
// 使用emontior
$vue.use($Emontior);

new $vue({
  el: '#app',
  render: h => h($App)
});
