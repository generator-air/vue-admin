const path = require('path')
const $config = require('./config')
const $env = require('./src/model/env')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
// 解决内网代理问题
const HttpsProxyAgent = require('https-proxy-agent')
// 由开发者指定本地环境变量的代理配置字段名。这里以读取 HTTPS_PROXY/HTTP_PROXY 字段为例
const proxyServer = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;

function resolve (dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	lintOnSave: true,
	productionSourceMap: false,
	configureWebpack: {
		resolve: {
			alias: {
				'@': resolve('src'),
				'css': resolve('src/assets/css'),
				'pages': resolve('src/pages')
			}
		},
		module: {
			rules: [
					{
							enforce: 'pre',
							test: /\.(js|vue)$/,
							loader: 'eslint-loader',
							exclude: /node_modules/
					}
			]
		},
		plugins: [
			new HtmlWebpackTagsPlugin({
				usePublicPath: false,
				tags: [
					{
						// vue
						path: 'https://lib.baomitu.com/vue/2.6.10/vue.js',
						attributes: {
							crossorigin: 'anonymous'
						},
						external: {
							packageName: 'vue',
							variableName: 'Vue'
						},
					},
					{
						// vuex
						path: 'https://lib.baomitu.com/vuex/3.1.2/vuex.js',
						attributes: {
							crossorigin: 'anonymous'
						},
						external: {
							packageName: 'vuex',
							variableName: 'Vuex'
						},
					},
					{
						// vue-router
						path: 'https://lib.baomitu.com/vue-router/3.1.3/vue-router.js',
						attributes: {
							crossorigin: 'anonymous'
						},
						external: {
							packageName: 'vue-router',
							variableName: 'VueRouter'
						},
					},
					{
						// axios
						path: 'https://lib.baomitu.com/axios/0.19.0/axios.js',
						attributes: {
							crossorigin: 'anonymous'
						},
						external: {
							packageName: 'axios',
							variableName: 'axios'
						},
					},
					{
						// qs
						path: 'https://lib.baomitu.com/qs/6.9.1/qs.js',
						attributes: {
							crossorigin: 'anonymous'
						},
						external: {
							packageName: 'qs',
							variableName: 'Qs'
						},
					},
					{
						// lodash
						path: 'https://lib.baomitu.com/lodash.js/4.17.15/lodash.js',
						attributes: {
							crossorigin: 'anonymous'
						},
						external: {
							packageName: 'lodash',
							variableName: '_'
						},
					},
					{
						// element-ui
						path: 'https://lib.baomitu.com/element-ui/2.12.0/index.js',
						attributes: {
							crossorigin: 'anonymous'
						},
						external: {
							packageName: 'qs',
							variableName: 'Qs'
						},
					},
					{
						// element-ui-css
						path: 'https://lib.baomitu.com/element-ui/2.12.0/theme-chalk/index.css',
						attributes: {
							crossorigin: 'anonymous'
						}
					}
				]
			})
		]
	},
	devServer: {
			port: $config.devServerPort,
			proxy: {
				'/dev': {
					target: $env.domain,
					agent: new HttpsProxyAgent(proxyServer),
					changeOrigin: true,
					pathRewrite: {
						'^/dev': ''
					},
					logLevel: 'debug'
				}
			}
	},
	runtimeCompiler: true,
	pluginOptions: {
		svgSprite: {
			dir: 'src/assets/icon',
			test: /\.(svg)(\?.*)?$/,
			loaderOptions: {
				extract: false
			},
			pluginOptions: {
				plainSprite: false
			}
		}
	}
}
