const $inquirer = require('inquirer')
const $fse = require('fs-extra')
const $chalk = require('chalk')

function isFolder(path) {
	const stat = $fse.lstatSync(path)
	return stat.isDirectory()
}

function createFile(items, rewrite) {
	items.forEach(item => {
		// 处理直接存放于 pages 下的 .vue 文件
		if (Array.isArray(item)) {
			$fse.pathExists('src/router/default.js', (err, exists) => {
				if (exists) {
					if (rewrite) {
						createDefaultFile(item)
					}
				} else {
						createDefaultFile(item)
				}
			})
		} else {
			// 处理一般情况（页面存放于 pages 下的 自定义目录下）
			$fse.pathExists(`src/router/${item}.js`, (err, exists) => {
				if (exists) {
					if (rewrite) {
						createFileContent('src/pages', item)
					}
				} else { // 一般情况，直接创建新的路由文件
					createFileContent('src/pages', item)
				}
			})
		}
	})
}

// default.js 创建
function createDefaultFile(fileNames) {
	let routerList = ''
	let imports = ''
	fileNames.forEach(fileName => {
		// fileName 截掉.vue
		const name = `pages_${fileName.substring(0, fileName.lastIndexOf('.'))}`
		// 构造 import 引入语句
		const importStr = `const ${name} = () => import('pages/${fileName}')\n`
		// 路由默认使用 pages 下的文件夹目录结构（将 path pages/ 及之前的路径截掉。将.vue字符截掉）
		const routerPath = fileName.substring(0, fileName.lastIndexOf('.'))
		// 构造路由描述字符串
		const routerStr = `{\n\tpath: '/${routerPath}',\n\tcomponent: ${name}\n},\n`
		// import 语句生成
		imports = imports + importStr
		// routerList 生成
		routerList = routerList + routerStr
	})
	// 截掉 routerList 最后一个逗号 + 最后一个换行符
	routerList = routerList.substring(0, routerList.length - 2)
	// 路由文件内容生成
	const contentStr = `${imports}\nconst routerList = [${routerList}]\n\nexport default routerList\n`
	// 执行文件创建与输出
	outputFile('default', contentStr)
}

// 生成指定路由文件（${folderName}.js）的内容 => pages下的 folderName 对应 router 下生成的 fileName
function createFileContent(rootPath, folderName) {
	const arr = []
	let routerList = ''
	let imports = ''
	// 拿到当前文件夹下，所有文件的路径
	getPagePaths(rootPath, folderName, arr)
	arr.forEach(path => {
		// 将路由的 / 替换成 _ ，作为页面组件变量名（页面路径不会重复，因此，这样的设计，可以防止变量重名）
		const formatPath = path.substring(4).replace(/\//g, '_')
		// 截掉路径上的.vue
		const name = formatPath.substring(0, formatPath.lastIndexOf('.'))
		// 构造 import 引入语句
		const importStr = `const ${name} = () => import('${path.substring(4)}')\n`
		// 获取.vue页面名称
		const fileName = name.substring(name.lastIndexOf('_') + 1)
		let routerPath = ''
		// list/index 页，路由设计：直接对应文件夹名称
		if (fileName !== 'list' && fileName !== 'index') {
			// 路由默认使用 pages 下的文件夹目录结构（将 path pages/ 及之前的路径截掉。将.vue字符截掉）
			routerPath = path.substring(9, path.lastIndexOf('.'))
		} else {
			// 默认 list/index 页为菜单对应的一级页面。路由直接对应所在文件夹名，以其作为一个命名空间。其下的编辑、详情等二级页面，均在这个命名空间下（设计规则如：/menu1，/menu1/edit）
			routerPath = `/${folderName}`
		}
		// 构造路由描述字符串
		const routerStr = `{\n\tpath: '${routerPath}',\n\tcomponent: ${name}\n},\n`
		// import 语句生成
		imports = imports + importStr
		// routerList 生成
		routerList = routerList + routerStr
	})
	// 截掉 routerList 最后一个逗号 + 最后一个换行符
	routerList = routerList.substring(0, routerList.length - 2)
	// 路由文件内容生成
	const contentStr = `${imports}\nconst routerList = [${routerList}]\n\nexport default routerList\n`
	// 执行文件创建与输出
	outputFile(folderName, contentStr)
}

// 获取所有的 vue page 文件的路径
function getPagePaths(rootPath, folderName, arr) {
	const data = $fse.readdirSync(`${rootPath}/${folderName}`, 'binary')
	data && data.forEach(item => {
		// 如果存在二级、三级...目录
		if (isFolder(`${rootPath}/${folderName}/${item}`)) {
			getPagePaths(`${rootPath}/${folderName}`, item)
		} else {
			arr.push(`${rootPath}/${folderName}/${item}`)
		}
	})
}

// 文件生成，输出
function outputFile(fileName, content) {
	$fse.outputFile(`src/router/${fileName}.js`, content, function(err) {
		if (err) {
			return
		}
	})
}

// 执行入口
$inquirer.prompt([
	{
		type: 'confirm',
		name: 'rewrite',
		message: $chalk.yellow('我们会根据pages的目录结构，全自动帮您生成router配置。请先确认：对于已存在的路由文件，是否执行覆盖？'),
		default: true
	},
	{
		type: 'confirm',
		name: 'confirm',
		message: $chalk.yellow('即将执行路由生成，请确认'),
		default: true
	}
]).then(answer => {
	if (answer.confirm) {
		$fse.readdir('src/pages', 'binary', function(err, data) {
			const folders = []
			const defaults = []
			data && data.forEach(pageItem => {
				// 遍历pages下的每一个文件/文件夹
				if (isFolder(`src/pages/${pageItem}`)) {
					folders.push(pageItem)
				} else {
					defaults.push(pageItem)
				}
			})
			if (defaults.length > 0) {
				folders.push(defaults)
			}
			createFile(folders, answer.rewrite)
		})
	}
})

