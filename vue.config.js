
const $config = require('./config');

module.exports={
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
    devServer:
    {
        port: $config.devServerPort,
        // 反向代理示例
        // 到 http://127.0.0.1:8090/api 的请求，都会转发到$prop.domain/api 
        proxy:$config.production
    }
}