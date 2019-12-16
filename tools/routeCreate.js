// 只对pages下的文件夹下的.vue文件，生成路由。直接位于pages下的.vue，由开发者手动在router/index.js配置
const $inquirer = require('inquirer')
const $fse = require('fs-extra')
const $chalk = require('chalk')

function isFolder(path) {
	const stat = $fse.lstatSync(path)
	return stat.isDirectory()
}

// 生成指定路由文件（${folderName}.js）的内容 => pages下的 folderName 对应 router 下生成的 fileName
function createFile(rootPath, folderName, overwrite) {
	const arr = []
	let routerList = ''
	let imports = ''
	// 已存在路由文件的内容字符串
	let fileStr = ''
	if (!overwrite) {
		fileStr = $fse.readFileSync(`src/router/${folderName}.js`).toString()
	}
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
		const routerStr = `\t{\n\t\tpath: '${routerPath}',\n\t\tcomponent: ${name}\n\t},\n`
		if (!overwrite) {
			if (fileStr.indexOf(importStr) === -1) {
				// 在原有路由文件头部，增加import语句
				fileStr = importStr + fileStr
				const strArr = fileStr.split('[')
				// 截掉routerStr最后一个换行
				strArr[0] = (strArr[0] + '[\n' + routerStr).slice(0, -1)
				fileStr = strArr.join('')
			}
		} else {
			// import 语句生成
			imports = imports + importStr
			// routerList 生成
			routerList = routerList + routerStr
		}
	})
	if (!overwrite) {
		// 执行文件创建与输出
		outputFile(folderName, fileStr)
	} else {
		// 截掉 routerList 最后一个逗号 + 最后一个换行符
		routerList = routerList.slice(0, -2)
		// 路由文件内容生成
		const contentStr = `${imports}\nconst routerList = [\n${routerList}\n]\n\nexport default routerList\n`
		// 执行文件创建与输出
		outputFile(folderName, contentStr)
	}
}

// 获取所有的 vue page 文件的路径
function getPagePaths(rootPath, folderName, arr) {
	const data = $fse.readdirSync(`${rootPath}/${folderName}`, 'binary')
	data && data.forEach(item => {
		// 如果存在二级、三级...目录
		if (isFolder(`${rootPath}/${folderName}/${item}`)) {
			getPagePaths(`${rootPath}/${folderName}`, item, arr)
		} else {
			arr.push(`${rootPath}/${folderName}/${item}`)
		}
	})
}

// 文件生成，输出
function outputFile(fileName, content) {
	$fse.outputFile(`src/router/${fileName}.js`, content, function(err) {
		if (err) {
			console.log($chalk.red('\n啊哦~文件生成出错 T_T\n'))
		}
	})
}

// 执行入口
$inquirer.prompt([
	{
		type: 'confirm',
		name: 'rewrite',
		message: '我们会根据pages的目录结构，全自动帮您生成router配置。请选择：对于已存在的路由文件，是否执行覆盖？',
		default: true
	},
	{
		type: 'confirm',
		name: 'confirm',
		message: '即将执行路由生成，请确认',
		default: true
	}
]).then(answer => {
	if (answer.confirm) {
		$fse.readdir('src/pages', 'binary', function(err, data) {
			data && data.forEach(pageItem => {
				// 遍历pages下的每一个文件夹
				if (isFolder(`src/pages/${pageItem}`)) {
					// 判断当前文件夹对应路由文件是否存在
					$fse.pathExists(`src/router/${pageItem}.js`, (err, exists) => {
						// 如果路由文件已存在
						if (exists) {
								createFile('src/pages', pageItem, answer.rewrite)
						} else {
							// 不存在，直接创建新的路由文件
							createFile('src/pages', pageItem, true)
						}
					})
				}
			})
		})
	} else {
		console.log($chalk.yellow('\n结束路由创建\n'))
	}
})

