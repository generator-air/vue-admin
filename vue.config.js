const path = require('path')
const $config = require('./config')
const $env = require('./src/model/env')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
// 解决内网代理问题。（如不需要代理，请删除以下两行代码）
const HttpsProxyAgent = require('https-proxy-agent')
// 由开发者指定本地环境变量的代理配置字段名。这里以读取 HTTP_PROXY 字段为例
const proxyServer = process.env.HTTP_PROXY;

function resolve (dir) {
	return path.join(__dirname, dir)
}

function createExternals () {
	const cdnBase = 'https://lib.baomitu.com'
	const externals = [
		{
			path: '/vue/2.6.10/vue.js',
			packageName: 'vue',
			variableName: 'Vue'
		},
		{
			path: '/vuex/3.1.2/vuex.js',
			packageName: 'vuex',
			variableName: 'Vuex'
		},
		{
			path: '/vue-router/3.1.3/vue-router.js',
			packageName: 'vue-router',
			variableName: 'VueRouter'
		},
		{
			path: '/axios/0.19.0/axios.js',
			packageName: 'axios',
			variableName: 'axios'
		},
		{
			path: '/qs/6.9.1/qs.js',
			packageName: 'qs',
			variableName: 'Qs'
		},
		{
			path: '/lodash.js/4.17.15/lodash.js',
			packageName: 'lodash',
			variableName: '_'
		},
		{
			path: '/element-ui/2.12.0/index.js',
			packageName: 'element-ui',
			variableName: 'ELEMENT'
		},
		{
			path: '/element-ui/2.12.0/theme-chalk/index.css'
		}
	]
	return externals.map(external => {
		const obj = {}
		obj.path = cdnBase + external.path
		obj.attributes = { crossorigin: 'anonymous' }
		if (external.packageName) {
			obj.external = {
				packageName: external.packageName,
				variableName: external.variableName
			}
		}
		return obj
	})
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
				tags: createExternals()
			})
		].concat(process.env.NODE_ENV === 'production' ? [new BundleAnalyzerPlugin()] : [])
	},
	devServer: {
			port: $config.devServerPort,
			proxy: {
				'/dev': {
					target: $env.domain,
					// 解决内网代理问题。（如不需要代理，请删除以下agent代码）
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
