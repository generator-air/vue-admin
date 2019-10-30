
const $config = require('./config');

module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    configureWebpack:
    {
        module:
        {
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
                changeOrigin: true,
                pathRewrite: {'/api': ''},
                logLevel: 'debug'
            }
        }
    }
}