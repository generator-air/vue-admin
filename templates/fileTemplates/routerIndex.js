module.exports = ({ notifyImport, loginPageImport, loginPageRoute, redirectHandler }) => `import $vue from 'vue';
import $vueRouter from 'vue-router';
import $Auth from 'authority-filter';
import $authDic from '../model/authDict';
import $allMenus from '../model/menu';
import $api from '../model/api';
import $request from '../mixin/request';
import $store from '../vuex/index';
${notifyImport}

${loginPageImport}
const $home = () => import(/* webpackChunkName: "home" */ 'pages/home');
const $unAuth = () => import(/* webpackChunkName: "unAuth" */ 'pages/unAuth');
const $notFound = () => import(/* webpackChunkName: "notFound" */ 'pages/notFound');

const isDev = process.env.NODE_ENV === 'development'

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

const router = new $vueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: $home
    },
    {
      path: '/unAuth',
      component: $unAuth
    },${loginPageRoute}
  ]
});

function getUserInfo() {
  // 拉取用户信息
  return $request.$get($api.getUserInfo).then(res => {
    if (res && res.data) {
      // 全局存储用户信息
      $store.commit('user/setUserInfo', res.data);
      return res.data;
    }
  }).catch(err => {
    if (err.unLogin || err.unAuth) {
      // 全局存储 errorDict 构造的用户信息
      $store.commit('user/setUserInfo', err);
      // 如果当前用户无权访问
      return err;
    }
  });
}

function getRouteAndMenu(user) {
  // 将权限字典 + roleId传入权限组件（{ dev: true }开发使用。跳过权限过滤，开启所有权限。正式环境删除即可）
  const auth = new $Auth($authDic, user.roleId, { dev: isDev });
  // 全局存储 auth 对象
  $store.commit('user/setAuth', auth);
  // 获取经过权限过滤后的路由
  const routerList = auth.getRouterList(routers);
  // 添加过滤后的路由
  router.addRoutes([
    ...routerList,
    {
      path: '*',
      component: $notFound
    }
  ]);
  // 获取经过权限过滤后的菜单
  const menuList = auth.getMenuList($allMenus);
  // 权限过滤后的菜单保存至vuex
  $store.commit('menu/setMenu', menuList);
}
${redirectHandler}
// 导航守卫入口
router.beforeEach((to, from, next) => {
  const userInfo = $store.state.user.userInfo;
  // 如果已存在全局的用户信息
  if (userInfo) {
    redirect(userInfo, to, next);
  } else {
    getUserInfo().then(res => {
      redirect(res, to, next, getRouteAndMenu);
    })
  }
})

export default router;
`;
