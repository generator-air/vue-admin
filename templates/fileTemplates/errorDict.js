module.exports = ({ toLoginHandler, notifyImport }) => `${notifyImport}
const dictionary = {
  404: '啊哦，404了',
  200: {
    // 构造无权访问情况，返回的用户信息
    3007: () => ({ unAuth: true })
  }
};

// 多个错误码，对应相同响应的处理demo
const toLogin = [3000, 3001, 3002, 3003];
const authError = [8000, 8001, 8002];
const errDict = {
  ${toLoginHandler}
  [authError]: '权限错误~'
};

Object.keys(errDict).forEach(arrString => {
  arrString.split(',').forEach(key => {
    dictionary[200][key] = errDict[arrString];
  });
});

export default dictionary;
`;
