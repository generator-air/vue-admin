
const $prop = require('./src/mods/model/prop');
const $express = require('express');
const $proxyMiddleware = require('http-proxy-middleware')
const $app = $express();

const config = {};

config.lintOnSave = true;

config.productionSourceMap = false;

config.configureWebpack =
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
};

config.devServer =
{
    port: $prop.port,
    // 反向代理示例
    // 到 http://127.0.0.1:8090/api 的请求，都会转发到$prop.domain/api 
    proxy:
    {
      '/api':  
        {
            target: $prop.domain, //【注】tmock的请求可以拿到结果，不属于未知请求，因此不会走代理。
            ws: true,
            changeOrigin: true,
            pathRewrite:
            {
              '/api': ''
            },
            logLevel: 'debug'
        }
    }
};

const proxyTable = config.devServer.proxy;

Object.keys(proxyTable).forEach(context => {
  const options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  $app.use($proxyMiddleware(context, options))
})

module.exports = config;
