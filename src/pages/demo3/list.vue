<template lang="pug">
	.u-style.l-content.p-demo3
		.u-style.l-content-title
			el-breadcrumb
				el-breadcrumb-item 数据管理
				el-breadcrumb-item 数据列表
			.u-style.u-table-header
				h1.u-style.header-title 数据列表
		.u-style.u-table-header
			v-search(
				ref="search"
				label="数据编号："
				name="search"
				placeholder="请输入"
				:value="searchValue"
			)
			v-filter(
				ref="filter"
			)
				template(v-slot="{ query, change }")
					el-form-item(label="状态：")
						el-select(
							v-model="query.state"
							size="small"
							placeholder="请选择"
							style="width: 120px;"
							@change="change"
						)
							el-option(
								v-for="item in stateOptions"
								:label="item.label"
								:key="item.label"
								:value="item.id"
							)
			.u-style.header-aside
				el-button.u-style.u-button(
					type="primary"
					size="large"
					@click="search"
				) 查询
				el-button.u-style.u-button.btn-filter(
					size="large"
					@click="reset"
				) 重置
		.u-style.u-button-group
			router-link(
				:to="`/home`"
			)
				el-button.u-style.u-button(
					type="primary"
					icon="el-icon-plus"
					size="large"
				) 新建
			el-dropdown(@command="batchHandler" trigger="click")
				el-button( type="primary" :disabled="operations.length === 0 ? true : false") 批量操作
					i.el-icon-arrow-down.el-icon--right
				el-dropdown-menu(slot="dropdown")
					el-dropdown-item(v-for="operation in operations" :command="operation.method" :key="operation.id") {{operation.label}}
		.u-style.u-tip
			span.tip-item 已选择 {{this.selectCount}} 项
			span.tip-item  总计：{{this.total}} 条
		v-table(
			:api="api"
			ref="list"
			@change="onListChange"
			:onSelectionChange="selectionChangeHandler"
		)
			el-table-column(
				type="selection"
				width="55"
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
				width="100"
				sortable
			)
			el-table-column(
				prop="full"
				label="全称"
				min-width="55"
			)
			el-table-column(
				prop="mean"
				label="含义"
				min-width="55"
			)
			el-table-column(
				prop="tips"
				label="备注"
				min-width="200"
			)
			el-table-column(
				label="操作"
				width="180"
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

		v-pagination
</template>

<script>
import { mapState } from 'vuex';
import $search from '@/components/list/search'
import $filter from '@/components/list/filter';
import $pagination from '@/components/list/pagination'
import $table from '@/components/list/table'
import $env from '@/model/env'

export default {
		components: {
				'v-search': $search,
				'v-filter': $filter,
				'v-table': $table,
				'v-pagination': $pagination,
		},
		watch: {
				$route() {
						this.init();
				}
		},
		computed: {
				...mapState('user', {
						auth: state => state.auth
				})
		},
		data() {
				return {
						type: '',
						id: 1,
						selectCount: 0,
						selectRead: 0,
						api: $env.domain + '/admin/list',
            stateOptions: {
                0: '草稿',
                1: '待审核',
                2: '已发布',
                3: '审核拒绝',
                4: '已撤回'
            },
						operations: [],
						tableSelections: [],
						searchValue: '',
						total: 0,
						page: 0,
						limit: 5,
				};
		},
		methods: {
				// 查询
				search() {
						this.$refs.search.search();
				},
				// 重置
				reset() {
						this.$refs.search.clear();
						this.$router.push({ path: this.$route.path });
				},
				// 编辑
				edit(row) {
						alert('编号:' + row.id + ' , 编辑操作')
				},
				// 删除
				del(row) {
						alert('编号:' + row.id + ' , 删除操作')
				},
        // 提交
        async submit(row) {
            this.operationHandler(row, 'submit');
        },
				operationHandler(row, operation) {
						let confirmText = '';
						let messageText = '';
						if (operation === 'submit') {
								confirmText = '确认要提交审核？';
								messageText = '数据已提交审核';
						} else {
								confirmText = '确认要撤回数据？';
								messageText = '数据已撤回';
						}
						this.$confirm(confirmText, '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
						}).then(async () => {
								let rs = {};
								if (operation === 'submit') {
										alert('提交操作')
								} else {
                    alert('撤回操作')
								}
								if (rs) {
										this.$message({
												type: 'success',
												message: messageText
										});
										// 刷新列表
										this.$refs.list.update();
								}
						}).catch(() => {});
				},
				batchHandler(command) {
						let operationName = '';
						let confirmText = '';
						let messageText = '';
						const ids = [];
						// 操作名称确认
						if (command.name.includes('submit')) {
								operationName = 'submit';
								confirmText = '确认要提交审核？';
								messageText = '数据已提交审核';
						} else {
								operationName = 'withdraw';
								confirmText = '确认要撤回数据？';
								messageText = '数据已撤回';
						}
						// 操作数据id整合
						this.tableSelections.forEach(item => {
								ids.push(item.qid);
						});
						this.$confirm(confirmText, '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
						}).then(async () => {
								let rs = {};
								if (operationName === 'submit') {
										alert('批量提交')
								} else {
                    alert('批量撤回')
								}
								if (rs) {
										this.$message({
												type: 'success',
												message: messageText
										});
										// 刷新列表
										this.$refs.list.update();
								}
						}).catch(() => {});
				},
				// 列表选中项变更
				selectionChangeHandler(val) {
						let countCommandOne = 0;
						let countCommandTwo = 0;
						this.selectCount = val.length;
						// 没有选中时清空一下数据
						let selectRead = 0;
						val.forEach(item => {
								if (item.id) {
										// 第一类操作命令
										++countCommandOne;
								} else {
										// 第二类操作命令
										++countCommandTwo;
								}
								selectRead += item.id;
						});
						if (val.length > 0) {
								if (countCommandOne === val.length) {
										this.operations = [{ id: 'submit', method: this.submit, label: '提交审核' }];
								} else if (countCommandTwo === val.length) {
										this.operations = [{ id: 'withdraw', method: this.withdraw, label: '撤回数据' }];
								} else {
										this.operations = [];
								}
						} else {
								this.operations = [];
						}
						this.tableSelections = val;
						this.selectRead = selectRead / 10000;
				},
				// 列表数据变更
				onListChange(rs) {
						if (rs) {
								this.total = rs.total;
						}
				},
				notify($title, $message, $type) {
						this.$notify({
								title: $title,
								message: $message,
								type: $type
						});
				},
				init() {
						// 搜索项回显
						this.searchValue = this.$route.query.search;
				}
		},
		// 当前list页面挂载前赋值this.api，保证table挂载时拿到指定的api
		created() {
				this.init();
		},
		mounted() {
				// 过滤项回显。mounted前无法通过 this.$refs 访问组件
				this.$refs.filter.update();
		}
};
</script>

<style lang="less" scoped>
	.p-demo3 {
		// 覆盖 el-ui 的默认样式（后面的元素会给一个 margin-left）
		tbody button.el-button {
			margin: 5px;
		}
		.button-box {
			display: inline-block;
			text-align: left;
			margin: -5px 0 0 -5px;
		}
	}
</style>
