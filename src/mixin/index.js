import Vue from 'vue';

// 批量处理 @/mixin 下的所有文件
const requireContext = require.context('@/mixin', false, /\.js$/i);
requireContext.keys().forEach((mix) => {
  if (/index\.js$/.test(mix)) {
    return;
  }
  Vue.use(requireContext(mix).default);
});
