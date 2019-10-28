module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: {
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
  }
}
