const path = require('path')
const $config = require('./config')
const $env = require('./src/model/env')
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
		}
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
