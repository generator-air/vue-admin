import $vue from 'vue';
import $ElementUI from 'element-ui';
import $App from '@/App.vue';
import $Log from '@/mods/util/emontior';

import 'element-ui/lib/theme-chalk/index.css';

$vue.use($ElementUI);
$vue.use($Log);

new $vue({
  el: '#app',
  render: h => h($App)
});