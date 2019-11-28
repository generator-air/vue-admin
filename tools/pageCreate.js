const $inquirer = require('inquirer')
const $fse = require('fs-extra')
const $chalk = require('chalk')
const $template = require('../src/model/templates/templateVue')

$inquirer.prompt([
	{
		type: 'input',
		name: 'root',
		message: '请输入页面默认存放的根路径',
		default: 'src/pages'
	},
	{
		type: 'input',
		name: 'path',
		message: '请输入页面路径（相对于根路径）'
	}
]).then(answers => {
	if (answers.path.charAt(0) !== '/') {
		answers.path = '/' + answers.path
	}
	const url = answers.root + answers.path
	$inquirer.prompt([
		{
			type: 'confirm',
			name: 'confirm',
			message: `即将创建页面: ${$chalk.yellow(url)}，确认生成？`,
			default: true
		}
	]).then(answer => {
		if (answer.confirm) {
			$fse.readFile(`${url}.vue`, 'binary', function(err, data) {
				if (data) {
					console.log($chalk.red('页面已存在，不可重复创建'))
					return
				}
				const start = answers.path && answers.path.lastIndexOf('/')
				const index = answers.path && answers.path.lastIndexOf('.')
				const end = index > -1 && index || answers.path.length
				const pageName = answers.path.substring(start + 1, end)
				const template = $template.replace(/\$pageName\$/g, pageName)
				$fse.outputFile(`${url}.vue`, template, function(err) {
					if (err) {
						console.log($chalk.red(`文件创建发生错误: ${err}`))
						return
					}
					console.log($chalk.green('页面创建成功！^_^'))
				})
			})
		} else {
			console.log($chalk.red('已取消页面生成'))
		}
	})
});
