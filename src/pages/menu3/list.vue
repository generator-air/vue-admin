<template lang="pug">
	.l-content.p-adlist
		.l-content-title
			el-breadcrumb
				el-breadcrumb-item 词汇管理
				el-breadcrumb-item 词汇查询
			.u-table-header
				h1.header-title 词汇查询
		.u-table-header
			v-search(
				ref="search"
				label="词汇缩写："
				name="search"
				placeholder="请输入搜索内容"
				:value="searchValue"
			)
			.header-aside
				el-button(
					type="primary"
					size="large"
					@click="search"
				) 查询
				el-button(
					size="large"
					@click="reset"
				) 重置
				el-button(
					type="info"
					size="large"
					@click="exportData"
				) 导出
		.u-tip
			span.tip-item 词汇量总计：{{this.dialogTable.total}} 条
			el-table.u-table(
				:data="dialogTable.list"
			)
				el-table-column(
					prop="id"
					label="名词编号"
					width="100"
					sortable
				)
				el-table-column(
					prop="brief"
					label="缩写"
					min-width="55"
					sortable
				)
					template(v-slot="{ row }")
						span(v-html="showData(row.brief)")
				el-table-column(
					prop="full"
					label="全称"
					min-width="100"
				)
					template(v-slot="{ row }")
						span(v-html="showData(row.full)")
				el-table-column(
					prop="mean"
					label="含义"
					min-width="100"
				)
					template(v-slot="{ row }")
						span(v-html="showData(row.mean)")
				el-table-column(
					prop="tips"
					label="备注"
					min-width="200"
				)
					template(v-slot="{ row }")
						span(v-html="showData(row.tips)")
				el-table-column(
					label="操作"
					width="200"
				)
					template(v-slot="{ row }")
						el-button.op-button(
							type="success"
							size="small"
							@click="edit(row)"
						) 编辑
						el-button.op-button(
							type="warning"
							size="small"
							@click="del(row)"
						) 删除
			.u-pagination
				el-pagination(
					@size-change="pageSizeChange"
					@current-change="pageChange"
					:page-sizes="[5, 10, 15, 20]"
					:page-size="limit"
					layout="total, sizes, prev, pager, next"
					:total="dialogTable.total"
				)
</template>

<script>
import $search from '@/components/search'
import $filter from '@/components/filter'
import $pagination from '@/components/pagination'
import $apiWord from '@/model/io/ad'

export default {
		components: {
				'v-search': $search,
				'v-filter': $filter,
				'v-pagination': $pagination
		},
		watch: {
				$route () {
						this.init()
				}
		},
		computed: {},
		data () {
				return {
						type: '',
						id: 0,
						api: $apiWord.getInfo,
						searchValue: '',
						total: 0,
						page: 0,
						limit: 5,
						dialogTable: {
								list: [],
								total: 0,
								page: 1
						}
				}
		},
		methods: {
				// 筛选变色
				showData(val) {
						val = val + '';
						if (this.checkPara(val, this.searchValue)) {
								// 如果搜索结果记录包含关键字中的任何一个，那么修改样式
								let reg = new RegExp(this.searchValue, 'gmi')
								if (val.match(reg).length > 0) {
										return val.replace(reg, '<span   style="color: #FF0000; ">'  + val.match(reg)[0] + '</span>')
								} else {
										return val.replace(this.searchValue, '<span   style="color: #FF0000; ">'  + this.searchValue + '</span>')
								}

						} else {
								return val // 不做任何修改
						}
				},
				// 判断搜索记录是否包含某个关键字
				checkPara(val, para) {
						val = val.toUpperCase()
						para = para.toUpperCase()
						if (val.indexOf(para) !== -1 && para !== '') {
								return true;
						} else {
								return false
						}
				},
				// 分页组件size变化
				pageSizeChange (limit) {
						// console.log('limit', limit)
						this.limit = limit
						this.dialogTable.page = 1
						this.init()
				},
				// 分页组件page变化
				pageChange (page) {
						// console.log('page', page)
						this.page = page
						this.dialogTable.page = page
						this.init()
				},
				// 查询
				async search () {
						this.searchValue = this.$refs.search.get()
						const para = {
								key: this.searchValue,
								pageNo: this.page,
								pageSize: this.limit
						}
						const data = await $apiWord.searchKey(para)
						if (data) {
								// 同步后端返回的dialog table列表数据
								this.dialogTable = JSON.parse(JSON.stringify(data))
						} else {
								this.message("没有搜索到相关词条")
						}
				},

				async getInfo () {
						const para = {
								key: '', // key为空全局搜索
								pageNo: this.page,
								pageSize: this.limit
						}
						const data = await $apiWord.searchKey(para)
						console.log(data)
						if (data) {
								// 同步后端返回的dialog table列表数据
								this.dialogTable = JSON.parse(JSON.stringify(data))
						}
				},
				// 重置
				reset () {
						this.$refs.search.clear()
						this.$router.push({ path: this.$route.path })
				},
				// 编辑
				edit (row) {
						this.$router.push({ path: '/word/edit', query: { id: row.id } })
				},
				// 删除
				del (row) {
						this.id = row.id
						this.confirm('确认删除？', this.delInfo)
				},
				async delInfo () {
						let rs = await $apiWord.delInfo(this.id)
						if (rs) {
								this.$message.success('名词删除成功')
								window.location.reload()
						} else {
								this.$message.error('名词删除失败')
								window.location.reload()
						}
				},
				// 弹窗提示
				confirm (confirmText, operation) {
						this.$confirm(confirmText, '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
						}).then(() => {
								operation()
						}).catch(() => {
						})
				},
				message (messageText) {
						this.$message({
								type: 'success',
								message: messageText
						})
				},
				onListChange (rs) {
						if (rs) {
								this.total = rs.total
						}
				},
				exportData() {
						if (this.dialogTable.list.length == 0) {
								this.$message.error("当前列表为空")
						} else {
								window.location.href = $apiWord.export
						}
				},
				init () {
						// 搜索项回显
						if (this.searchValue) {
								this.search()
						} else {
								this.getInfo()
						}
				}

		},
		// 当前list页面挂载前赋值this.api，保证table挂载时拿到指定的api
		created () {
				this.init()
		},
		mounted () {
				this.init()
		}
}
</script>

<style lang="less" scoped>
	.p-adlist {
		// 覆盖 el-ui 的默认样式（后面的元素会给一个 margin-left）
		tbody button.el-button {
			margin: 5px;
		}

		.button-box {
			display: inline-block;
			text-align: left;
			margin: -5px 0 0 -5px;
		}
		.el-table.th, .el-table.tr{
			display: none;
		}
		.el-date-table__row{
			.cell{
				display: none;
			}
		}
	}
</style>
