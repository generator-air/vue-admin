// 获取有权访问的菜单
function getMenuList(allMenu) {
	// 开发模式下，关闭权限控制
	if (this.dev) {
		return allMenu
	}
	const authRouters = getAuthRouters(this.authList)
	const menuList = []
	menuFilter(allMenu, authRouters, menuList)
}
// 获取有权访问的路由
function getRouterList(allRouter) {
	// 开发模式下，关闭权限控制
	if (this.dev) {
		return allRouter
	}
	const authRouters = getAuthRouters(this.authList)
	const routerList = allRouter.filter(router => authRouters.includes(router.path))
	return routerList
}
// 获取指定路由下的操作权限
function getPageOperations() {

}

// 格式化 authList，拿到当前用户有权访问的所有路由，组成的一位数组
function getAuthRouters(authList) {
	const authRouters = new Set()
	authList.forEach(auth => {
		authRouters.add(auth.path)
	})
	return [...authRouters]
}


// 【参考】
// 递归获取可访问的 menuList
// privates.getMenuList = function (allMenuList, urls) {
// 	const all = JSON.parse(JSON.stringify(allMenuList));
// 	// 存放过滤后的menu列表（当传入的是一级菜单数组，menuList存放有权访问的一级菜单列表。当传入的是二级菜单数组，menuList存放有权访问的二级菜单列表。）
// 	const menuList = [];
// 	all.forEach(menuItem => {
// 		// 如果当前菜单在可访问列表里，则放入menuList数组
// 		if (menuItem.url && urls.includes(menuItem.url)) {
// 			menuList.push(menuItem);
// 		} else if (menuItem.submenu) {
// 			// 当前菜单存在子菜单时，将其全部子菜单列表传回当前方法。此时，传入的子菜单列表，也会被当作全部菜单列表，进行同样的处理
// 			const submenuList = privates.getMenuList(menuItem.submenu, urls);
// 			// 当前 menuItem.submenu 进行过滤后，发现存在可访问的 submenu。则手动设置 menuItem.submenu 为过滤后的 submenuList
// 			if (submenuList.length > 0) {
// 				menuItem.submenu = submenuList;
// 				// 将子菜单经过过滤的父菜单，放到父菜单数组
// 				menuList.push(menuItem);
// 			}
// 		}
// 	});
// 	// 返回过滤后的菜单列表
// 	return menuList;
// };


// 菜单过滤
function menuFilter(allMenu, authRouters) {
	const menus = allMenu.map(menuItem => {
		if (menuItem.url && authRouters.includes(menuItem.url)) {
			return menuItem
		} else if (menuItem.submenu) {
			const submenuItems = menuItem.submenu.map(submenuItem => {
				if (submenuItem.url && authRouters.includes(submenuItem.url)) {
					return submenuItem
				} else if (submenuItem.submenu) {
					const items = submenuItem.submenu.map(item => {
						if (item.url && authRouters.includes(item.url)) {
							return item
						}
					})
					if (items.length > 0) {
						return submenuItem
					}
				}
			})
			if (submenuItems.length > 0) {
				return menuItem
			}
		}
	})
	console.log('menus:', menus)
}

class Authority {
	constructor(dic, role, options) {
		// 判断用户是否具有多个角色
		if (Array.isArray(role)) {
			this.authList = []
			role.forEach(roleId => {
				this.authList = this.authList.concat(dic[roleId])
			})
		} else {
			this.authList = dic[role];
		}
		// this.dictionary = dic;
		// this.roleId = roleId;
		if (options) {
			this.dev = options.dev;
			// this.operations = options.operations;
		}
	}

	getMenuList = getMenuList

	getRouterList = getRouterList

	getPageOperations = getPageOperations
}

export default Authority;
