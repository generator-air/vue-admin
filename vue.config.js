const path = require('path')
const $config = require('./config')

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
				'css': resolve('src/assets/css')
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
				'/api': {
					target: $config.production, // 设置你调用的接口域名和端口号
					changeOrigin: true,
					pathRewrite: {
					  '^/api': '' // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'https://api.douban.com/user/add'，直接写‘/api/user/add’即可，此处的‘api’可以设置为自己想要设置的任何词语，符合规范即可
					}
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
