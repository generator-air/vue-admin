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
							target: $config.production, // 【注】tmock的请求可以拿到结果，不属于未知请求，因此不会走代理。
							ws: true,
							secure: false,  // 如果是https接口，需要配置这个参数
							changeOrigin: true,
							pathRewrite: { '^/api': '' },
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
