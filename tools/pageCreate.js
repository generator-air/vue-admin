const $path = require('path');
const $inquirer = require('inquirer');
const $fse = require('fs-extra');
const $chalk = require('chalk');

const projectRoot = process.cwd();

const $defaultTemplate = require(`${projectRoot}/src/model/pageTemplates/default`);
const $listTemplate = require(`${projectRoot}/src/model/pageTemplates/list`);
const $editTemplate = require(`${projectRoot}/src/model/pageTemplates/edit`);
const $detailTemplate = require(`${projectRoot}/src/model/pageTemplates/detail`);

const tempalteMap = {
  list: $listTemplate,
  edit: $editTemplate,
  detail: $detailTemplate,
};

const questions = [
  {
    type: 'input',
    name: 'root',
    message: '请输入页面存放的文件夹名称（必须是src的子文件夹）',
    default: 'pages',
  },
  {
    type: 'input',
    name: 'path',
    message: '请输入页面路径（相对于前面定义的文件夹。如: demo/demo.vue）',
  },
  {
    type: 'list',
    name: 'type',
    message: '请选择期望创建的页面类型',
    choices: [
      {
        name: '列表页',
        value: 'list',
      },
      {
        name: '编辑（新建）页',
        value: 'edit',
      },
      {
        name: '详情页',
        value: 'detail',
      },
      {
        name: '其他',
        value: 'default',
      },
    ],
  },
];

$inquirer.prompt(questions).then((answers) => {
  if (answers.path.charAt(0) !== '/') {
    answers.path = '/' + answers.path;
  }
  const url = `src/${answers.root}${answers.path}`;
  $inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `即将创建页面: ${$chalk.yellow(
          url
        )}，页面类型：${$chalk.yellow(answers.type)}，确认生成？`,
        default: true,
      },
    ])
    .then((answer) => {
      const pagePath = $path.resolve(projectRoot, url);
      if (answer.confirm) {
        $fse.readFile(pagePath, 'binary', function (err, data) {
          if (data) {
            return;
          }
          const start = answers.path && answers.path.lastIndexOf('/');
          const index = answers.path && answers.path.lastIndexOf('.');
          const end = (index > -1 && index) || answers.path.length;
          const pageName = answers.path.substring(start + 1, end);
          const template = tempalteMap[answers.type] || $defaultTemplate;
          const page = template.replace(/\$pageName\$/g, pageName);

          $fse.outputFile(pagePath, page, function (err) {
            if (err) {
              return;
            }
          });
        });
      }
    });
});
