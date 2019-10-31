const $urlJoin = require('url-join');
const $path = require('path');

const config = {};

// 任务运行时环境，保存任务执行期间一些环境参数
config.context = {};
config.root = $path.resolve(__dirname);

// 源代码路径
config.src = 'src';
// 初步构建生成路径
config.dist = 'dist';
// 版本库忽略目录的路径，也作为构建流程的临时目录
config.ignore = 'ignore';
// 版本库外部引入文件路径
config.externals = 'externals';
// cdn部署路径
config.cdnBase = '//cdn.jia.qq.com';
// 创建项目后，需要更改这个属性，规则需要遵循前端资源映射规范
config.uploadUrl = '/2019/vue-admin';
config.cdnRoot = $urlJoin(config.cdnBase, config.uploadUrl);

// 开发服务端口
config.devServerPort = 8090;
// 本地mock服务端口
config.mockServerPort = 8091;


config.mock = "https://tmock.qq.com/mock/271";

config.production = "https://api.douban.com"; // 线上域名,这里用豆瓣api举例

config.development = "http://localhost:" + config.devServerPort;


// cdn上传配置
config.uploadConfig = {
	AppId: '1256737511',
	SecretId: 'AKID02ub8UafZJsHZQDqLfomfT6YpyxlRwIU',
	SecretKey: 'AAyc8TcaQEwUs570iFbmneJn6EF5lGb4',
	Bucket: 'qlink',
	Region: 'ap-chengdu',
	prefix: config.uploadUrl
};

module.exports = config;
