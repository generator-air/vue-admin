import $vue from 'vue';
import $ElementUI from 'element-ui';
import $App from '@/App.vue';
import 'element-ui/lib/theme-chalk/index.css';

import * as $emonitor from '@tencent/emonitor'

$vue.use($ElementUI);
$vue.use($emonitor);

new $vue({
  el: '#app',
  render: h => h($App)
});