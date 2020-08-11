module.exports = ({ mockHost }) => `const config = {};

// 开发服务端口
config.devServerPort = 8090;

config.debug = 'http://127.0.0.1:8000';

config.mock = '${mockHost}';

/**
 * 解决内网代理问题。一般用于公司内网无法访问外部在线mock的情况。
 * 如需要配置内网环境代理，请先配置本地环境变量，指明HTTPS_PROXY，并将下方useProxyAgent置为true
 * 如mac:
 * （1）vim ~/.bash_profile 添加:
 * export HTTPS_PROXY=http://xxx.xxx.xxx:123
 * （2）添加后执行: source ~/.bash_profile
 * 如不需要，这里可以删除。
 */
config.useProxyAgent = false;

// 需要外部引入的版本库路径配置
/**
 * example:
 * config.externals = [
 *   {
 *     path: '/vue/2.6.10/vue.js',
 *     packageName: 'vue',
 *     variableName: 'Vue',
 *   }
 * ]
 */
config.externals = [];

// 在默认配置不满足需求时，开发者可以通过 vueConfig 对 vue.config.js 进行改写或扩展
config.vueConfig = {};

module.exports = config;
`;
