import $vue from 'vue';
import $ElementUI from 'element-ui';
import $App from '@/App.vue';
import 'element-ui/lib/theme-chalk/index.css';

$vue.use($ElementUI);

new $vue({
  el: '#app',
  render: h => h($App)
});