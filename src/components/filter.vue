<template lang="pug">
.u-table-filter.v-filter
	el-form(
		:inline="true"
		label-position="left"
	)
		slot(
			:query="query"
			:change="onChange"
		)
</template>

<script>
export default {
	props: {
		channel: {
			type: String,
			default: ''
		}
	},
	data () {
		return {
			logger: 'view/filter',
			query: {}
		}
	},
	watch: {
		$route () {
			this.update()
		}
	},
	methods: {
		update () {
			let query = this.$route.query
			Object.keys(query).forEach(key => {
				let val = query[key]
				this.$set(this.query, key, val)
			})
		},
		onChange () {
			let query = Object.assign({}, this.query)
			query.page = 1
			this.setQuery(query)
		},
		// 供外部使用，配置同步路由的过滤参数
		setFilter (key, val) {
			let query = Object.assign({}, this.query)
			query[key] = val
			query.page = 1
			this.setQuery(query)
		},
		setQuery (query) {
			query = Object.assign({}, this.$route.query, query)
			this.$router.push({
				query
			})
		}
	},
	mounted () {
		// 没有在组件加载时立即更新
		// 因为过滤选项数据有可能是延迟加载的
		// 需要在选项数据加载完毕后再同步query
	}
}
</script>
