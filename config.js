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

// 开发服务端口
config.devServerPort = 8090;
// 本地mock服务端口
config.mockServerPort = 8091;


config.logReport = false; // 日志监控开关

config.mock = "https://tmock.qq.com/mock/271";

config.production = "https://api.douban.com"; // 线上域名,这里用豆瓣api举例

config.development = "http://localhost:" + config.devServerPort;


// cdn部署路径
config.cdnBase = '//cdn.xx.yy.com'; // 使用cdn的域名，以//开头，自动匹配站点协议
config.uploadUrl = '/2019/test-project'; // 上传cdn的路径
config.cdnRoot = $urlJoin(config.cdnBase, config.uploadUrl);

// cdn上传配置模板
config.uploadConfig = {
	// 在腾讯云申请的 AppId
	AppId: '',
	// 配置腾讯云 COS 服务所需的 SecretId
	SecretId: '',
	// 配置腾讯云 COS 服务所需的 SecretKey
	SecretKey: '',
	// COS服务配置的存储桶名称
	Bucket: '',
	// 地域名称
	Region: '',
	// 上传cdn的路径。所有文件上传到这个路径下
	prefix: config.uploadUrl
};

module.exports = config;
