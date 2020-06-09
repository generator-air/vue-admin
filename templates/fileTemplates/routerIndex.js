module.exports = ({ loginPageImport, loginHandler }) => `import $vue from 'vue';
import $vueRouter from 'vue-router';
import $Auth from 'authority-filter';
import $authDic from '../model/authDict';
import $allMenus from '../model/menu';
import $api from '../model/api';
import $request from '../mixin/request';
import $store from '../vuex/index';

${loginPageImport}
const $home = () => import(/* webpackChunkName: "home" */ 'pages/home');
const $unAuth = () => import(/* webpackChunkName: "unAuth" */ 'pages/unAuth');
const $notFound = () => import(/* webpackChunkName: "notFound" */ 'pages/notFound');

// 批量引入 @/router 下的所有文件
const routerContext = require.context('@/router', false, /\.js$/i);
// 存放所有路由
let routers = [];
const importAllRouters = requireContext => requireContext.keys().forEach(
  item => {
    if (item.indexOf('index.js') > -1) {
      return;
    }
    // 收集所有路由
    routers = routers.concat(requireContext(item).default);
  }
);
importAllRouters(routerContext);

// vue-router v3.1.x 版本，两次点击相同路由引起的报错问题处理
const originalPush = $vueRouter.prototype.push;
$vueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

$vue.use($vueRouter);

${loginHandler}

export default router;
`;
