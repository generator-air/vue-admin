const mockServerTask = `// json-server 启动
$gulp.task('json-server', done => {
  $execa('node', [
    './mock/mock-server.js'
  ], {
    stdio: 'inherit'
  });
  done();
});`;

const loginPageImport = `const $login = () => import(/* webpackChunkName: "login" */ 'pages/login.vue');`;

const authDicImport = "import $authDic from '../model/authDict';";

const allMenusImport = "import $allMenus from '../model/menu';";

const loginPageRoute = `
    {
      path: '/login',
      component: $login
    },`;

const thirdLoginRedirectHandler = `
function doLogin() {
  $notify.error('身份验证失败，请重新登录');
  setTimeout(() => {
    // 【自定义】跳转到第三方登录，地址由开发者与后端确认
    location.href = 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=APPID&agentid=AGENTID&redirect_uri=REDIRECT_URI';
  }, 2000);
}

// 导航守卫重定向逻辑
function redirect(userInfo, to, next, getRouteAndMenu) {
  if (userInfo && userInfo.unLogin) { // 未登录/登录过期
    doLogin()
  } else if (userInfo && userInfo.unAuth) { // 已登录，无权访问系统
    if (to.path === '/unAuth') {
      next();
    } else {
      next('/unAuth');
    }
  } else if (userInfo) { // 已登录，有权访问系统
    if (to.path === '/unAuth') {
      next('/');
    } else {
      next();
    }
    // 【注意顺序】要在导航守卫逻辑后，添加 addRoutes 逻辑。否则 addRoutes 的路由，无法正常加载
    getRouteAndMenu && getRouteAndMenu(userInfo);
  } else {
    next();
  }
}
`;

const selfLoginRedirectHandler = `
function redirect(userInfo, to, next, getRouteAndMenu) {
  if (userInfo && userInfo.unLogin) { // 当前未登录
    // 正常进入登录页
    if (to.path === '/login') {
      next();
    } else {
      next('/login');
    }
  } else if (userInfo && userInfo.unAuth) { // 已登录，无权访问系统
    // 正常进入无权访问页
    if (to.path === '/unAuth' || to.path === '/login') {
      next();
    } else {
      next('/unAuth');
    }
  } else if (userInfo) { // 已登录，有权访问系统
    // 用户手动访问登录页 / 无权访问页，重定向到首页
    if (to.path === '/login' || to.path === '/unAuth') {
      next('/');
    } else {
      next();
    }
    // 【注意顺序】要在导航守卫逻辑后，添加 addRoutes 逻辑。否则 addRoutes 的路由，无法正常加载
    getRouteAndMenu && getRouteAndMenu(userInfo);
  } else {
    next();
  }
}
`;

module.exports = {
  mockServerTask,
  loginPageImport,
  authDicImport,
  allMenusImport,
  loginPageRoute,
  thirdLoginRedirectHandler,
  selfLoginRedirectHandler
};
