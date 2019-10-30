# vue-admin

## 项目安装

yarn命令也可以，这里示例用npm

```
npm install
```

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

See [emonitor](https://git.code.oa.com/news/emonitor)
