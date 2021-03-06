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
config.externals = [
  {
    path: 'https://lib.baomitu.com/vue/2.6.10/vue.js',
    packageName: 'vue',
    variableName: 'Vue',
  },
  {
    path: 'https://lib.baomitu.com/vuex/3.1.2/vuex.js',
    packageName: 'vuex',
    variableName: 'Vuex',
  },
  {
    path: 'https://lib.baomitu.com/vue-router/3.1.3/vue-router.js',
    packageName: 'vue-router',
    variableName: 'VueRouter',
  },
  {
    path: 'https://lib.baomitu.com/axios/0.19.0/axios.js',
    packageName: 'axios',
    variableName: 'axios',
  },
  {
    path: 'https://lib.baomitu.com/element-ui/2.12.0/index.js',
    packageName: 'element-ui',
    variableName: 'ELEMENT',
  },
  {
    path: 'https://lib.baomitu.com/element-ui/2.12.0/theme-chalk/index.css',
  },
  {
    path: 'https://lib.baomitu.com/lodash.js/4.17.15/lodash.js',
    packageName: 'lodash',
    variableName: '_',
  },
];

// 在默认配置不满足需求时，开发者可以通过 vueConfig 对 vue.config.js 进行改写或扩展
config.vueConfig = {};

module.exports = config;
`;
