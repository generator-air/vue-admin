# vue-admin

<!-- ## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
``` -->

## 项目启动
#### 1.启动命令
```bash
npm run dev --env --{param}
```
或
```bash
yarn dev --env --{param}
```

param:

mock:mock模式
production:线上环境
development:debug模式


#### 2.启动原理
执行gulp默认指令。详见gulpfile.js
本地启动两个服务：
1.spore-mock：用于管理本地 mock 数据，展示 demo 数据（端口号：8092）
2.vue-cli-service：用于开发（端口号：8090）
> vue-cli官网：
vue-cli-service serve 命令会启动一个开发服务器 (基于 webpack-dev-server) 并附带开箱即用的模块热重载 (Hot-Module-Replacement)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 日志模块

See [emonitor](https://git.code.oa.com/news/emonitor)
