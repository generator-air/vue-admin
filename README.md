# vue-admin

## 项目安装
```
npm install
```
或
```bash
yarn install
```

### 编译

```bash
npm run build
```
或
```bash
yarn run build
```

### 测试

```bash
npm run test
```
或
```bash
yarn run test
```

### lint检查
```bash
npm run lint
```
或
```bash
yarn run lint
```
## 项目启动

#### 1.切换联调环境

##### mock环境
```bash
npm run mock 
```
或
```bash
yarn mock
```

##### 开发环境
```bash
npm run dev
```
或
```bash
yarn dev
```

##### 正式环境
```bash
npm run prod
```
或
```bash
yarn prod
```

##### 生成的接口路由配置

```bash
src/mods/model/prop.js
```

#### 2.启动原理
执行gulp默认指令。详见gulpfile.js
vue-cli-service：用于开发（端口号：8090）
> vue-cli官网：
vue-cli-service serve 命令会启动一个开发服务器 (基于 webpack-dev-server) 并附带开箱即用的模块热重载 (Hot-Module-Replacement)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 日志模块

See [emonitor](https://git.code.oa.com/news/emonitor)
