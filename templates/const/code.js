const mockServerTask = `// json-server 启动
$gulp.task('json-server', done => {
  $execa('node', [
    './mock/mock-server.js'
  ], {
    stdio: 'inherit'
  });
  done();
});`;

const notifyImport = "import $notify from '@/util/notify';";

const loginPageImport = `const $login = () => import(/* webpackChunkName: "login" */ 'pages/login.vue');`;

const thirdToLoginHandler = `// 未登录情况处理demo
  [toLogin]: () => {
    $notify.error('身份验证失败，请重新登录');
    setTimeout(() => {
      // 【自定义】跳转到第三方登录，地址自定义
      location.href = 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=APPID&agentid=AGENTID&redirect_uri=REDIRECT_URI';
    }, 2000);
  },`;

const localToLoginHandler = `// 构造未登录情况（以及其他需要跳转到登录页的情况，如登录过期），返回的用户信息
  [toLogin]: () => ({ unLogin: true }),`;

const thirdLoginHandler = `const router = new $vueRouter();

// 拉取用户信息（【Replace】需替换为实际的接口地址）
$request.$get($api.getUserInfo).then(res => {
  if (res && res.data) {
    // 全局存储用户信息
    $store.commit('user/setUserInfo', res.data);
    // 将权限字典 + roleId传入权限组件（{ dev: true }开发使用。跳过权限过滤，开启所有权限。正式环境删除即可）
    const auth = new $Auth($authDic, res.data.roleId, { dev: true });
    // 全局存储 auth 对象
    $store.commit('user/setAuth', auth);
    // 获取经过权限过滤后的路由
    const routerList = auth.getRouterList(routers);
    router.addRoutes([
      ...routerList,
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        component: $home
      },
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
}).catch(err => {
  if (err.unAuth) {
    // 全局存储 errorDict 构造的用户信息
    $store.commit('user/setUserInfo', err);
    router.addRoutes([
      {
        path: '*',
        redirect: '/unAuth'
      },
      {
        path: '/unAuth',
        component: $unAuth
      }
    ]);
  }
});`;

const selfLoginHandler = `// 定义初始路由
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
      path: '/login',
      component: $login
    },
    {
      path: '/unAuth',
      component: $unAuth
    }
  ]
});

// 进行权限过滤
function authFilter(userInfo) {
  // 将权限字典 + roleId传入权限组件（{ dev: true }开发使用。跳过权限过滤，开启所有权限。正式环境删除即可）
  const auth = new $Auth($authDic, userInfo.roleId, { dev: true });
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

// 拉取用户信息
function getUserInfo() {
  // 拉取用户信息
  return $request.$get($api.getUserInfo).then(res => {
    if (res && res.data) {
      const userInfo = Object.assign({}, res.data);
      // 全局存储用户信息
      $store.commit('user/setUserInfo', userInfo);
      return userInfo;
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

// 导航守卫重定向逻辑
function redirect(userInfo, to, next, filter) {
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
    filter && filter(userInfo);
  } else {
    next();
  }
}

// 导航守卫入口
router.beforeEach((to, from, next) => {
  const userInfo = $store.state.user.userInfo;
  // 如果已存在全局的用户信息
  if (userInfo) {
    redirect(userInfo, to, next);
  } else {
    getUserInfo().then(res => {
      redirect(res, to, next, authFilter);
    });
  }
});`;

module.exports = {
  mockServerTask,
  notifyImport,
  thirdToLoginHandler,
  localToLoginHandler,
  loginPageImport,
  thirdLoginHandler,
  selfLoginHandler
};
