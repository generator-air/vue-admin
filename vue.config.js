const path = require('path')

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
