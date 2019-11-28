[TOC]

#Jenkins--CI/CD

**develop by fightingliu**

## 安装
进入官网下载对应的rpm包

https://pkg.jenkins.io/redhat-stable/

执行`yum  install  ***.pm`

或者直接运行
`yum install jenkins`

## 环境变量

执行
`vi /etc/init.d/jenkins`

然后替换其中的java路径

![](http://km.oa.com/files/photos/pictures/201911/1574846001_19_w568_h464.png)

## 启动

执行
`service jenkins start`


验证jenkins是否运行正常，通过访问http://localhost:8000


![](http://km.oa.com/files/photos/pictures/201911/1574908736_47_w977_h576.png)


这里有一个临时密码需要输入，在/var/lib/jenkins/secrets/initialAdminPassword里面

执行`vi /var/lib/jenkins/secrets/initialAdminPassword`

![](http://km.oa.com/files/photos/pictures/201911/1574908778_76_w625_h81.png)
复制里面的密码登录

## 插件

### 内网安装
需要配置代理
![](http://km.oa.com/files/photos/pictures/201911/1574907694_52_w1580_h532.png)
`devnet-proxy.oa.com：8080`

点击右下角的Continue按钮进入如下界面

![](http://km.oa.com/files/photos/pictures//20191128//1574908367_74.png)

这一步操作是让安装Jenkins的插件，有安装推荐的插件和自定义安装插件两个选项，我们选择安装推荐的插件，之后进入插件安装界面
![](http://km.oa.com/files/photos/pictures//20191128//1574908395_49.png)

### 手动安装

“系统管理” - “插件管理” - “高级”  - “上传插件”
```
https://updates.jenkins.io/download/plugins/git/
https://updates.jenkins.io/download/plugins/apache-httpcomponents-client-4-api/
https://updates.jenkins.io/download/plugins/matrix-project/
https://updates.jenkins.io/download/plugins/structs/
https://updates.jenkins.io/download/plugins/credentials/
https://updates.jenkins.io/download/plugins/jsch/
https://updates.jenkins.io/download/plugins/scm-api/
https://updates.jenkins.io/download/plugins/workflow-api/
https://updates.jenkins.io/download/plugins/display-url-api/
https://updates.jenkins.io/download/plugins/junit/
https://updates.jenkins.io/download/plugins/script-security/
https://updates.jenkins.io/download/plugins/workflow-scm-step/
https://updates.jenkins.io/download/plugins/git-client/
https://updates.jenkins.io/download/plugins/mailer/
https://updates.jenkins.io/download/plugins/ssh-credentials/
https://updates.jenkins.io/download/plugins/workflow-step-api/

https://updates.jenkins.io/download/plugins/nvm-wrapper/
https://updates.jenkins.io/download/plugins/nodejs/
```

这些插件直接互相有依赖关系，具体安装过程中可以了解。
其中**nvm**和**nodejs**插件就是前端构建的必备插件

## 构建

### 创建任务
![](http://km.oa.com/files/photos/pictures/201911/1574922624_75_w1131_h542.png)

### 实现git钩子功能

首先我们要实现一个git钩子功能，就是我们向github/码云等远程仓库push我们的代码时，jenkins能知道我们提交了代码，这是自动构建自动部署的前提，钩子的实现原理是在远端仓库上配置一个Jenkins服务器的接口地址，当本地向远端仓库发起push时，远端仓库会向配置的Jenkins服务器的接口地址发起一个带参数的请求，jenkins收到后开始工作。

打开刚创建的任务，选择配置，添加远程仓库地址，配置登录名及密码及分支。
![](http://km.oa.com/files/photos/pictures/201911/1574847951_33_w1434_h326.png)

###SSH配置
进入凭证管理

![](http://km.oa.com/files/photos/pictures//20191128//1574915099_43.png)

在Kind中选择SSH Username with private key，下面的Private Key选择Enter directly直接输入在Gitlab部署了public key对应的private key即可。一般public key是在~/.ssh/id_rsa.pub,而**private key是~/.ssh/id_rsa。**
点击OK，保存项目再次构建就好了。


### 安装nodejs
下载nodejs插件并配置

- 系统管理--->管理插件--->下载NodeJS插件
- 下载的插件在：$JENKINS_HOME/plugins目录下
- 系统管理--->Global Tool Configuration--->选择需要安装的nodejs版本
- 会从nodejs官网下载安装，nodejs安装包在：$JENKINS_HOME/tools目录下

![](http://km.oa.com/files/photos/pictures//20191127//1574848082_70.png)

**构建环境勾选 Provide Node & npm bin/folder to PATH**

- 每次build，都会首先执行环境构建，环境构建无误后，才会开始真正的构建过程

- 会下载nodejs并安装配置，并把node添加到当前PATH环境变量中，这样就支持node和npm命令

![将node添加到PATH中](http://km.oa.com/files/photos/pictures//20191127//1574848285_9.png)



**运行构建，查看构建结果**

![](http://km.oa.com/files/photos/pictures//20191127//1574848365_81.png)

- 可以看到构建的过程中jenkins会下载nodejs包，并且将node命令添加到当前构建环境中
- 可以看到nodejs包名： tools/jenkins.plugins.nodejs.tools.NodeJSInstallation



**jenkin容器中查看node**

- 虽然jenkins在线安装了nodejs但是并没有将其永久性添加到PATH中，所以仍然需要进入其安装目录查看。

```bash
# cd 打印node版本 
/var/lib/jenkins/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/nodejs_9.5.0

 # 可以正常的输出node版本
node -v    
```

### 构建配置
![](http://km.oa.com/files/photos/pictures/201911/1574922709_36_w349_h168.png)
![](http://km.oa.com/files/photos/pictures/201911/1574920235_28_w1419_h533.png)

构建脚本

```bash
#!/bin/bash
echo $PATH
npm config set --global proxy xxx
npm install
npm run build
```

### 打包结果
![构建日志](http://km.oa.com/files/photos/pictures/201911/1574920284_82_w1044_h567.png)
![构建成品](http://km.oa.com/files/photos/pictures/201911/1574920271_62_w609_h289.png)

------------

# 日志模块

**develop by fightingliu**

## aegis
### 官方文档
http://aegis.oa.com/guide/

### 管理后台
https://aegis.qq.com

### 模块封装

```javascript
import Aegis  from 'aegis-web-sdk';

const install = function (Vue) {
	Object.defineProperties(Vue.prototype, {
		$aegis: {
			get() {
				// sdk初始化
				const aegis = new Aegis({
					id: 887, // 在 aegis.ivwe.io 申请到的 id
				});
				return {
					/* 上报普通日志 */
					logI: msg => {
						aegis.info(msg);
					},
					/* 上报错误日志 */
					logE: msg => {
						aegis.report(msg);
					},
					/* 上报测速日志 */
					report: url => {
						aegis.reportSpeedLog({
							url, // 请求地址,
							method: 'get', // 请求方法
							duration: 1000, // 耗时 ms
							isHttps: true, // 请求地址是否https
							ret: 0, // cgi 的状态码，如果是图片或其他的，则没有该字段
							status: 200, // http 返回码
						});
					}
				}
			}
		}
	});
};

export default {
	install
};

```
### 页面使用

- 主入口配置

```bash
import $Aegis from '@/util/aegis';
// 使用Aegis
$vue.use($Aegis);
```

- 页面中使用

```javascript
this.$aegis.logE('aegis异常日志上报');
this.$aegis.logI('aegis普通日志上报')
```

## emonitor


日志模块采用公司内部已有的[emonitor](https://git.code.oa.com/news/emonitor "emonitor"),可将流水日志和异常日志上报到啄木鸟平台。
对给出的实例代码封装到src/mods/util/emonitor.js里,在vue中挂载使用

### 安装部署

这里需要设置全局变量**Vue.prototype.project**,在使用emonitor时读取这个配置变量

**项目入口 main.js配置**

```javascript
import $vue from 'vue';
import $Emontior from '@/mods/util/emontior';
$vue.prototype.project = 'vue-admin'; // 项目名称
```
###  逻辑封装
```javascript
iimport * as $emonitor from '@tencent/emonitor'

const install = function (Vue) {
	Object.defineProperties(Vue.prototype, {
		$emonitor: {
			get() {
				const bossInfo = {
					page: 'https://btrace.qq.com/kvcollect?BossId=6529&Pwd=1714580587',  // 页面质量上报
					error: 'https://btrace.qq.com/kvcollect?BossId=6527&Pwd=1102151080',  // 页面错误上报
					slowlog: 'https://btrace.qq.com/kvcollect?BossId=6523&Pwd=1202531240',  // 慢日志上报
					cgi: 'https://btrace.qq.com/kvcollect?BossId=6528&Pwd=96045012',  // cgi上报
					resource: 'https://btrace.qq.com/kvcollect?BossId=6958&Pwd=1123576360',  // 素材质量上报
					flowlog: '//btrace.qq.com/kvcollect?BossId=6526&Pwd=878966364',  // 流水日志上报,
				};
				let isTimingReported = false;
				const _MAXTIMEOUT = 10000;
				const nativeToString = Object.prototype.toString;
				const emonitorIns = $emonitor.create({
					baseUrl: bossInfo.error,
					name: Vue.prototype.project, // 注册项目英文名
					onBeforeSend: data => {
						console.log(data);
					},
					cgi: {
						baseUrl: bossInfo.cgi,
						sampling: 1 // 默认采样率 可根据实际情况调整
					},
					logs: {
						baseUrl: bossInfo.flowlog,
					},
				});
				console.log('当前项目名称:', Vue.prototype.project);
				return {
					// sdk初始化
					init: () => {
						// 慢日志上报&&页面错误上报
						setTimeout(()=> {
							if (!isTimingReported) {
								const _resources = $emonitor.getRcTiming();
								try {
									if (nativeToString.call(_resources) === '[object Array]') {
										const _resourcesLen = _resources.length;
										const _jsonEntries = [];
										for (let _i = 0; _i < _resourcesLen; _i++) {
											_jsonEntries.push(
											_resources[_i].starttime +
												'|' +
												_resources[_i].duration +
												'|' +
												_resources[_i].name
											);
										}
										// 慢日志上报
										emonitorIns.config({
											baseUrl: bossInfo.slowlog
										}).send({
											json_entries: JSON.stringify(_jsonEntries)
										}, true);
										// 页面错误日志上报
										emonitorIns.config({
											baseUrl: bossInfo.error
										});
									}
								} catch (err) {
									console.warn('emonitorIns send', err);
								}
							}
						}, _MAXTIMEOUT);

						// 页面质量上报&&页面错误上报
						window.addEventListener('load', () => {
							setTimeout(()=> {
								if (!isTimingReported) {
									// 页面质量上报
									emonitorIns.config({baseUrl: bossInfo.page}).send($emonitor.getPfTiming());
									// 页面错误日志上报
									emonitorIns.config({baseUrl: bossInfo.error});
									isTimingReported = true;
								} }, 0);
						}, false);
					},
					/**
					* 手动调用啄木鸟sdk实例上报
					* 错误日志只要通过 console.error 打印的话,就可以自动上报了，这里主要是手动进行流水日志上报
					* @param {Object} options
					* @param {Number} options.level 日志级别，建议按这几个级别区分：debug:0, info: 1, warn: 2, error: 3;
					* 这里啄木鸟官方实例是用string类型如'info'，但是他们的数据表设计有误，表里面是bigint类型，如果上报string类型，会导致根据日志级别过滤日志时有问题
					* @param {String} options.log 日志内容
					*/
					report: (level, log) => {
						// 日志级别，啄木鸟官方实例是用string类型，但是他们的数据表设计有误，表里面是bigint类型，如果上报string
						emonitorIns.log({level, log});
					},
				}
			}
		}
	});
};

export default {
	install
};


```

###  页面使用

**vue页面**

```javascript
<script>
export default {
methods: {
		emonitorReport() {
			// sdk初始化
			this.$emonitor.init();
			// 普通异常上报
			console.error('warn', '异常日志上报');
			// 流水日志上报
			this.$emonitor.report('warn', '流水日志上报');
		},
		init() {
			this.emonitorReport();
		}
	},
	created() {
		this.init();
	}
};
</script>

```
### 日志管理平台

主要用到[啄木鸟平台](http://lg.webdev.com/pecker/index## "啄木鸟平台")

#### 统计图表

- 页面耗时

![](http://km.oa.com/files/photos/pictures/201910/1572411566_98_w1669_h735.png)

- 日志分布
![](http://km.oa.com/files/photos/pictures/201910/1572419670_22_w1584_h780.png)


#### 上报日志

- 入口 [鹰眼平台](http://log2.webdev.com/mylog/logQuery/lid/1340 "鹰眼平台")

- 查询方法
![](http://km.oa.com/files/photos/pictures/201910/1572419678_37_w1697_h878.png)

- 日志数据
![](http://km.oa.com/files/photos/pictures/201910/1572420711_35_w578_h173.png)

# 一键切换开发环境

**develop by fightingliu**

常见的开发环境有mock/development/production三种，这里选择使用gulp执行task,然后通过命令行设置开发环境

**gulp主要读取config.json里的配置域名，然后根据命令行将域名添加到对应的prop.js里文件**


## 启动

**可使用yarn，这里使用npm示例**

- dev 开发环境
```bash
npm run dev
```

- dev mock环境
```bash
npm run mock
```

- dev 正式环境
```bash
npm run prod
```


- build 开发环境
```bash
npm run build-dev
```

- build mock环境
```bash
npm run build-mock
```

-   build 正式环境
```bash
npm run build-prod
```

## 环境配置文件
- package.json

```json
"scripts": {
   "dev": "gulp dev",
    "mock": "gulp mock",
    "prod": "gulp prod",
    "build-dev": "gulp build-dev",
    "build-mock": "gulp build-mock",
    "build-prod": "gulp build-prod",
    "upload": "gulp upload",
  },
```


-  gulpfile.js

```javascript
const $gulp = require('gulp');
const $execa = require('execa');
const gutil = require('gulp-util');
//生成filename文件，存入string内容
string_src=(filename, string) => {
	let src = require('stream').Readable({ objectMode: true })
	src._read = function () 
	{
		this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
		this.push(null);
	}	
	return src
}
//存入不同的联调模式
switchMode = mode =>{
	//读入config.json文件
	let myConfig = require('./config.json');
	//取出对应的配置信息
	let envConfig = myConfig[mode];
	let conConfig = JSON.stringify(envConfig);
	//生成config.js文件
	const content = `const prop = {};\rprop.domain = ${conConfig};\rprop.port = 8090;\rmodule.exports = prop;`;
	return string_src("./src/mods/model/prop.js", content).pipe($gulp.dest('./'))
}
// =================
// common tasks
// =================
$gulp.task('mock', ()=>{return switchMode('mock')});
$gulp.task('development', ()=>{return switchMode('development')});
$gulp.task('production', ()=>{return switchMode('production')});
$gulp.task('build', done => {
	$execa('vue-cli-service', [
		'build'
	], {
		stdio: 'inherit'
	});
	done();
});

$gulp.task('serve', done => {
	$execa('vue-cli-service', [
		'serve'
	], {
		stdio: 'inherit'
	});
	done();
});

// build 开发环境
$gulp.task('build-dev', $gulp.series(
	'development',
	'build'
));

// build mock环境
$gulp.task('build-mock', $gulp.series(
	'mock',
	'build'
));

// build 正式环境
$gulp.task('build-prod', $gulp.series(
	'production',
	'build'
));


// serve 开发环境
$gulp.task('dev', $gulp.series(
	'development',
	'serve'
));

// serve mock环境
$gulp.task('mock', $gulp.series(
	'mock',
	'serve'
));


// serve 正式环境
$gulp.task('prod', $gulp.series(
	'production',
	'serve'
));
$gulp.task('default', $gulp.series('serve'));
```

# http-proxy-middle使用

**develop by fightingliu**

middle中间件主要在webpack devserver中解决跨域问题,这里需要两个依赖

## 依赖脚本

```bash
npm install express
npm install http-proxy-middleware
```

## 代理配置

**vue.config.js**

```javascript
devServer: {
			port: $config.devServerPort,
			proxy: {
				'/': {
					target: $config.production, // 设置你调用的接口域名和端口号
					changeOrigin: true,
					pathRewrite: {
					  '^/api': '' // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'https://api.douban.com/user/add'，直接写‘/api/user/add’即可，此处的‘api’可以设置为自己想要设置的任何词语，符合规范即可
					},
					logLevel: 'debug' // 打开具体请求转发的日志
				}
			}
	},
```
## 网络配置

**request.js**

```javascript
import $axios from 'axios'; // 引入axios
import $qs from 'qs'; // 引入qs

const install = function (Vue) {
	Object.defineProperties(Vue.prototype, {
		$http: {
			get() {
				// 添加请求拦截器
				$axios.interceptors.request.use(config => {
					config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
					if (config.method === 'post') { // post请求时，处理数据
						config.data = $qs.stringify({ ...config.data }) }  // 后台数据接收这块需要以表单形式提交数据，而axios中post默认的提交是json数据,所以这里选用qs模块来处理数据，也有其他处理方式，但个人觉得这个方式最简单好用
						return config;
					}, error => {
						loadinginstace.close()
						return Promise.reject(error);
					})
					// 添加响应拦截器
					$axios.interceptors.response.use(response => {
						return response;
					}, error => {
						return Promise.reject(error);
				});
				return $axios;
			}
		}
	});
};

export default {
	install
};

```

**主程序入口引用**
```bash
import $request from '@/util/request';
// 配置网络请求模块
$vue.use($request);
```
## 测试结果

**页面中使用**
```javascript
async request() {
			// 以下为请求测试环境的get接口测试
			this.$http.get(this.HOST + '/v2/movie/imdb/tt0111161', {
				params: {
					"apikey": "0df993c66c0c636e29ecbb5344252a4a"
				}
			}).then((response) => {
				console.log("get:" + response.data);
			});
		},
```
**请求结果**
![](http://km.oa.com/files/photos/pictures/201910/1572493273_71_w863_h528.png)

![](http://km.oa.com/files/photos/pictures/201910/1572493285_94_w885_h257.png)

## 代理日志

**后台小哥提了一个需求
“前端用了http-proxy-middleware 后，浏览器是和本地服务请求的，再由这个中间件代理请求的，由于配置参数不同可能导致到达服务端的具体请求不同，所以看一下这个代理中间件能不能打开具体请求转发的日志”**

在[官网](https://www.npmjs.com/package/http-proxy-middleware "官网")中找到了
`option.logLevel: string, ['debug', 'info', 'warn', 'error', 'silent']. Default: 'info'`

这样就简单了，只需要在proxy中加入`logLevel: 'debug' `即可

结果如下
![](http://km.oa.com/files/photos/pictures/201910/1572512578_17_w865_h409.png)
![](http://km.oa.com/files/photos/pictures/201910/1572512584_78_w952_h95.png)
# CDN上传

**develop by fightingliu**

**执行命令**

```bash
npm run build-{联调环境参数}
npm run upload
```
## 存储结果

**在腾讯云官网搜索腾讯云cos(对象存储)产品，点击立即使用，进入存储桶查看对应的资源
**
## cdn配置
```javascript
//cdn上传配置
config.uploadConfig = {
	AppId: 'AppId',
	SecretId: 'SecretId',
	SecretKey: 'SecretKey',
	Bucket: 'Bucket',
	Region: 'Region',
	prefix: config.uploadUrl
};
```
## gulp任务
```javascript
// =================
// cdn upload  tasks
// 在开发网执行腾讯云上传可能需要启动 proxifier：
// windows: http://km.oa.com/articles/show/340701?kmref=search&from_page=1&no=1
// macs: http://km.oa.com/articles/show/321457?kmref=search&from_page=1&no=2
// =====
$gulp.task('upload', () => $gulp.src([
	'**/*.{js,css,ttf,woff,svg,eot,png,jpg,jpeg,gif}'
], {
	// 本地静态资源地址
	cwd: $config.dist,
	// 上传cdn的地址（附加在prefix后面） 注：如果不加，prefix后面，会默认读取本机的文件夹目录
	base: $config.dist
}).pipe(
	$gulpConfirm({
		question: $gulpUtil.colors.yellow('Start upload dist ? [y/n]'),
		input: '_key:y'
	})
).pipe(
	$qcloudUpload($config.uploadConfig)
));
```


------------


# eslint 使用

**develop by arczhang**

通过配置 eslint 来规范代码，使团队代码保持一致风格，便于阅读与修改。

## 本地 eslint 配置

安装依赖

```bash
npm install --save-dev eslint
```

删除`package.json`文件中的`eslintConfig`字段，然后在根目录创建一个`.eslintrc.js`文件。

```javascript
// .eslintrc.js
module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es6': true,
		'node': false
	},
	'parser': 'vue-eslint-parser',
	'extends': [
		'eslint:recommended',
		'plugin:vue/essential'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module',
		'parser': 'babel-eslint'
	},
	'plugins': [
		'vue'
	],
	'root': true,
	'rules': {
		'vue/max-attributes-per-line': [2, {
			'singleline': 10,
			'multiline': {
				'max': 1,
				'allowFirstLine': false
			}
		}],
		'accessor-pairs': 'off',
		'getter-return': [
			'off',
			{
				'allowImplicit': false
			}
		],
		...other_rules
	}
}
```

eslint 规则大部分借鉴 PCG 代码规范，可根据个人或团队喜好自行修改。

需要特别注意，在`parserOptions`字段中一定要配置`'parser': 'babel-eslint'`，否则无法识别`() => import('xxx')`这种语法。

配置完成后可以运行`npm run lint`对代码进行格式修复。

## dev 环境配置 eslint

安装依赖

```bash
npm install --save-dev eslint-loader
```

然后在`vue.config.js`中添加下面的内容：

```javascript
module.exports = {
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
```

接下来在 dev 模式下每次保存代码后都会执行 eslint 检查，如果 eslint 检查未通过，为使用一层遮罩层进行提示：
![](http://km.oa.com/files/photos/pictures/201910/1572340968_50_w817_h280.png)

## Git 提交 eslint 预检查

安装依赖
```bash
npm install --save-dev pre-commit
```
然后在`package.json`中增加：
```json
{
  "pre-commit": "lint"
}
```
之后的每次 Git 提交就会运行`scripts`中的`lint`命令，只有`lint`命令没有报错，才能成功提交，否则无法完成提交。

# Vue管理端种子项目

**develop by arczhang**

一套基于vue的轻量级管理端种子项目，包含默认布局、菜单导航、版权信息。

## 项目结构
```bash
.
├── configs
│   ├── _editorconfig
│   └── _eslintrc
├── public
├── src
│   ├── main.js // 入口文件
│   ├── App.vue // 页面布局模板
│   ├── assets // 静态资源文件夹
│   ├── components // vue组件文件夹
│   ├── mixin // vue插件
│   ├── model // 数据层
│   ├── pages // 页面文件夹
│   ├── router // 路由文件夹
│   ├── util // 工具函数文件夹
│   └── vuex
├── tools // 可生成页面和路由的工具函数文件夹
├── vue.config.js
├── gulpfile.js
├── package.json
├── README.md
├── babel.config.js
├── config.js
└── yarn.lock

```
## 页面布局

![](http://km.oa.com/files/photos/pictures/201911/1574831082_77_w773_h443.png)

蓝色部分相对于视窗是固定的，版权信息具有吸底的性质，当内容页高度不足是吸附在视窗底部，而当内容页高度太大时，版权信息会贴着内容页底部，随着内容页一起滚动。

## 请求模块

种子项目使用axios发送请求，并将常用的get、post、put、delete等方法整合进了vue组件的this中，可以在组件中通过`this.$get`, `this.$post`, `this.$put`, `this.$delete`快速发送请求，调用形式为：`this.$method(url: string, data: object)`，如果需要自定义请求头等信息，可以使用this.$request，使用方法同axios一样。

需要注意，这里对请求链接返回的数据有一定的格式要求：
```js
{
	code: Number,
	msg: String,
	data: Object
}
```
当`code`为0的时候，快捷方法会直接返回`data`的内容，即我们需要用来渲染的数据。当`code`不为0时，会弹窗警告msg或者请求过程中发生的其他错误。

### 错误码字典

在使用内置的快捷方式进行请求的时候，我们提供了一个可配置的错误码字典`src/model/errorDict.js`，形如：

```js
{
	404: Function,
	503: String,
	200: {
		3000: String,
		8000: Function
	}
}
```

字典第一层的数字表示本次请求返回的http状态码，第二层的数字表示服务器返回数据中的`code`字段。

当服务器返回的`code`不为0时，会根据这个字典匹配对应的状态，并执行相应的内容：如果是函数，则执行它；如果是字符串，则通过`Promise.rejcet`返回它以供后续的错误处理使用。
