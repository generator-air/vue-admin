# vue-admin

## 项目开发
```
yarn install
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

### Eslint相关

Eslint 规则主要参考了 PCG 代码规范中的 JavaScript 规范部分，略有修改。

Dev 模式下每次保存代码都会执行 eslint 检查。

Git commit 时会进行 eslint 检查，如果无法 commit，请检查代码是否能通过 eslint 检查。

如果需要修改 eslint 规则，请修改根目录下的`.eslintrc.js`文件。

### Element-ui 相关

本项目的 UI 库使用了 element-ui，为了减小打包体积，使用了按需引用的方式，在使用之前请确保使用到的组件被注册。

组件的注册参考`src/plugins/element.js`。

可注册的组件参考[这里](https://element.eleme.cn/#/zh-CN/component/quickstart#yin-ru-element)。



