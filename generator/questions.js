const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: '请输入项目名称',
    default: 'my-project',
  },
  {
    type: 'list',
    name: 'loginType',
    message: '请选择项目使用的登录方式',
    choices: [
      {
        name: '第三方登录（默认推荐）',
        value: 'third',
      },
      {
        name: '本系统登录',
        value: 'self',
      },
    ],
  },
  {
    type: 'list',
    name: 'mockType',
    message: '请选择您期望使用的mock方式',
    choices: [
      {
        name: '在线mock（默认）',
        value: 'online',
      },
      {
        name: '本地mock',
        value: 'local',
      },
    ],
  },
];

module.exports = questions;
