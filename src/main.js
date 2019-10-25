import $vue from 'vue'
import $app from '@/App.vue'

$vue.config.productionTip = false

new $vue({
  render: h => h($app),
}).$mount('#app')
