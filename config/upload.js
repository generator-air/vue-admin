const path = require('path');

// cdn部署路径
const cdnRoot = '//cdn.xx.yy.com/2020/test-project';

// cos上传配置
const cos = {
  // 在腾讯云申请的 AppId（见：https://cloud.tencent.com/document/product/436/7751#.E6.9C.AF.E8.AF.AD.E4.BF.A1.E6.81.AF）
  AppId: '',
  // 配置腾讯云 COS 服务所需的 SecretId
  SecretId: '',
  // 配置腾讯云 COS 服务所需的 SecretKey
  SecretKey: '',
  // COS服务配置的存储桶名称
  Bucket: '',
  // 地域名称
  Region: '',
  // 上传cos的路径。所有文件上传到这个路径下
  prefix: '',
  // 本地静态资源路径
  localPath: path.resolve(__dirname, '../src/assets'),
  // 上传cos的路径。所有文件上传到这个路径下
  // prefix: cdn.uploadUrl
};

module.exports = {
  cdnRoot,
  cos,
};
