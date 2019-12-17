const path = require('path')
const $config = require('./config')
const $env = require('./src/model/env')
// 解决内网代理问题。（如不需要代理，请删除以下两行代码）
const HttpsProxyAgent = require('https-proxy-agent')
// 由开发者指定本地环境变量的代理配置字段名。这里以读取 HTTP_PROXY 字段为例
const proxyServer = process.env.HTTP_PROXY;

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
