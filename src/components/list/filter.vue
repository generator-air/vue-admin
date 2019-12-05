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
	data() {
		return {
			logger: 'view/filter',
			query: {}
		}
	},
	watch: {
		$route() {
			this.update()
		}
	},
	methods: {
		update() {
			const query = this.$route.query
			const keys = Object.keys(query)
			if (keys.length > 0) {
				keys.forEach(key => {
					let val = query[key]
					this.$set(this.query, key, val)
				})
			} else {
				this.reset()
			}
		},
		reset() {
			// 当query为{}时，为保证页面选择框回显正确，手动重置query（适配机场文章，多页面使用相同路由的情况）
			this.query = {}
		},
		onChange() {
			let query = Object.assign({}, this.query)
			query.page = 1
			this.setQuery(query)
		},
		// 供外部使用，配置同步路由的过滤参数
		setFilter(key, val) {
			let query = Object.assign({}, this.query)
			query[key] = val
			query.page = 1
			this.setQuery(query)
		},
		setQuery(query) {
			query = Object.assign({}, this.$route.query, query)
			this.$router.push({
				query
			})
		}
	}
}
</script>
