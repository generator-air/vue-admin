import Vue from 'vue'

const requireContext = require.context('@/mixin', false, /\.js$/i)
requireContext.keys().forEach(mix => {
	if (/index\.js$/.test(mix)) {
		return
	}
	Vue.use(requireContext(mix).default)
})
