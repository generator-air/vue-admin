import $vue from 'vue';
import $app from '@/App.vue';
import $store from './vuex';
import $router from './router';
import './mixin';
import 'normalize.css';

// 引入全局静态资源（svg + common less）
const staticFiles = [
	require.context('@/assets/icon/', false, /\.svg$/),
	require.context('@/assets/css/', false, /\.less$/)
]

const importAll = requireContext => requireContext.keys().forEach(requireContext)
staticFiles.forEach(staticFile => importAll(staticFile))

$vue.config.devtools = process.env.NODE_ENV === 'development'

new $vue({
	store: $store,
	router: $router,
	el: '#app',
	render: h => h($app)
});
