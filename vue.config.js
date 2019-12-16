const path = require('path')
const $config = require('./config')
const $env = require('./src/model/env')
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
