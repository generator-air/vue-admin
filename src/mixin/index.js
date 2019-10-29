import Vue from 'vue'
import Icon from '@/components/SvgIcon'

const requireContext = require.context('@/mixin', false, /\.js$/i)
requireContext.keys().forEach(mix => {
	if (/index\.js$/.test(mix)) {
		return
	}
	Vue.use(requireContext(mix).default)
})

Vue.component('svg-icon', Icon)
