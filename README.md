# vue-admin

## 项目开发
## 项目安装

yarn命令也可以，这里示例用npm

```
npm install
```

### 启动开启热刷新的开发模式
```
yarn dev
```

### 打包并压缩项目
```
yarn build
```

### 打包并生成 JS 大小的分析报告
```
yarn report

### 编译

```bash
npm run build
```

### 测试

```bash
npm run test
```

### lint检查
```bash
npm run lint
```
## 项目启动

#### 1.切换联调环境


##### dev 开发环境
```bash
npm run dev
```

##### dev mock环境
```bash
npm run mock
```

##### dev 正式环境
```bash
npm run prod
```


##### build 开发环境
```bash
npm run build-dev
```

##### build mock环境
```bash
npm run build-mock
```

##### build 正式环境
```bash
npm run build-prod
```
然后查看 `dist/report.html`

### 检查代码格式并自动修复部分能自动修复的格式错误
```
yarn lint
```

### 项目自定义配置
查看 [Configuration Reference](https://cli.vuejs.org/config/).

## 使用注意

### Vue 相关

本项目默认开启 pug 和 less，在写 vue 组件时可以使用 pug 编写 HTML 模板，使用 less 编写 css。

本项目默认开启了 vuex 与 hash 路由。

想要改变网站图标，修改`public/favicon.ico`文件。

### Eslint相关

Eslint 规则主要参考了 PCG 代码规范中的 JavaScript 规范部分，略有修改。

Dev 模式下每次保存代码都会执行 eslint 检查。

Git commit 时会进行 eslint 检查，如果无法 commit，请检查代码是否能通过 eslint 检查。

如果需要修改 eslint 规则，请修改根目录下的`.eslintrc.js`文件。

### Element-ui 相关

本项目的 UI 库使用了 element-ui，为了减小打包体积，使用了按需引用的方式，在使用之前请确保使用到的组件被注册。

组件的注册参考`src/plugins/element.js`。

可注册的组件参考[这里](https://element.eleme.cn/#/zh-CN/component/quickstart#yin-ru-element)。


##### 导出配置文件
```
src/mods/model/env.js
```


#### 2.CDN打包上传

先执行build

```bash
npm run build-{联调环境参数}
npm run upload
```

#### 3.启动原理
执行gulp默认指令。详见gulpfile.js
vue-cli-service：用于开发（端口号：8090）
> vue-cli官网：
vue-cli-service serve 命令会启动一个开发服务器 (基于 webpack-dev-server) 并附带开箱即用的模块热重载 (Hot-Module-Replacement)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 日志模块

See [km](http://km.oa.com/group/35420/articles/show/400177)
