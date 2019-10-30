
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
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,
                pathRewrite: {'^/api': ''},
            }
        }
    }
}