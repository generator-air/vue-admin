<template lang="pug">
	.l-content.p-questionnaire
		.l-content-title
			el-breadcrumb
				el-breadcrumb-item 问卷管理
				el-breadcrumb-item 问卷列表
			.u-table-header
				h1.header-title 问卷列表
		.u-table-header
			v-search(
				ref="search"
				label="问卷编号："
				name="search"
				placeholder="请输入"
				:value="questionNo"
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
			.header-aside
				el-button.u-button(
					type="primary"
					size="large"
					@click="search"
				) 查询
				el-button.u-button.btn-filter(
					size="large"
					@click="reset"
				) 重置
		.u-button-group
			router-link(
				v-show="userOperation.create"
				:to="`/content/questionnaire/create`"
			)
				el-button.u-button(
					type="primary"
					icon="el-icon-plus"
					size="large"
				) 新建
			el-dropdown(@command="batchHandler" trigger="click")
				el-button(v-show="userOperation.batch" type="primary" :disabled="operations.length === 0 ? true : false") 批量操作
					i.el-icon-arrow-down.el-icon--right
				el-dropdown-menu(slot="dropdown")
					el-dropdown-item(v-for="operation in operations" :command="operation.method" :key="operation.id") {{operation.label}}
		.u-tip
			span.tip-item 已选择 {{this.selectCount}} 项
			span.tip-item 阅读量总计：{{this.selectRead}} 万
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
				prop="qid"
				label="问卷编号"
				width="150"
			)
			el-table-column(
				prop="title"
				label="问卷标题"
				min-width="100"
			)
			el-table-column(
				prop="pv"
				label="阅读量"
				min-width="100"
				sortable
			)
			el-table-column(
				prop="recycle_count"
				label="回收量"
				min-width="100"
				sortable
			)
			el-table-column(
				prop="stateName"
				label="状态"
				min-width="100"
			)
				template(v-slot="{row}")
					span {{ row.stateName }}
						el-tooltip(class="item" effect="dark" :content="row.reason" placement="bottom")
							i(class="el-icon-question" style="margin-left: 10px" v-if="row.state === 3")
			el-table-column(
				prop="publish_at"
				label="最后发布时间"
				min-width="140"
				:formatter="dateFormat"
				sortable
			)
			el-table-column(
				prop="creator"
				label="发布者"
				min-width="100"
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
						v-if="row.showEdit"
					) 编辑

		v-pagination
		//- 【勿删】
		//- v-preview(
		//- 	ref="preview"
		//- 	template="code"
		//- 	:content="previewContent"
		//- )
				template(#footer-btn)
						el-button(type="primary") 审核
</template>

<script>
    import { mapState } from 'vuex';
    import $search from '@/components/search'
    import $filter from '@/components/filter';
    import $pagination from '@/components/pagination'
    import $table from '@/components/table'
    import $date from '@/util/date'
    import $apiQuest from '@/model/io/demo'
    import $selectOptions from '@/util/selectOptions'
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
                // 如果当前用户有权访问所有人创建的文章
                if (this.userOperation.all && !this.$route.query.list) {
                    this.$router.push({ query: { list: 'all' } });
                    // 重置过滤项，避免显示上一问卷页下拉选项
                    this.$refs.filter.reset();
                }
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
                articleType: '',
                api: $apiQuest.list,
                stateOptions: $selectOptions.COMMON_STATE,
                operations: [],
                tableSelections: [],
                questionNo: '',
                total: 0,
                para: {
                    is_approved: true,
                    reason: ''
                },
                userOperation: {},
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
            dateFormat(row) {
                if (row.publish_at === null) {
                    return '';
                }
                return $date.formatSec(row.publish_at);
            },
            // 查看问卷回收列表
            list(row) {
                this.$router.push({ path: '/content/questionnaire/recycleList', query: { id: row.qid } });
            },
            // 问卷回收统计
            count(row) {
                this.$router.push({ path: '/content/questionnaire/statistics', query: { qid: row.qid } });
            },
            // 编辑
            edit(row) {
                this.$router.push({ path: `/content/questionnaire/edit/${row.qid}` });
            },
            // 提交审核
            async submit(row) {
                this.operationHandler(row, 'submit');
            },
            // 撤回
            async withdraw(row) {
                this.operationHandler(row, 'withdraw');
            },
            // 预览
            preview(row) {
                this.previewContent = {
                    url: 'https://cn.vuejs.org/v2/api/#Vue-extend',
                    contentTitle: row.title,
                    creator: row.creator,
                    createTime: $date.formatSec(row.publish_at),
                    typeName: '问卷',
                    stateName: row.stateName
                };
                this.$refs.preview.show();
            },
            operationHandler(row, operation) {
                let confirmText = '';
                let messageText = '';
                if (operation === 'submit') {
                    confirmText = '确认要提交审核？';
                    messageText = '文章已提交审核';
                } else {
                    confirmText = '确认要撤回问卷？';
                    messageText = '问卷已撤回';
                }
                this.$confirm(confirmText, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let rs = {};
                    if (operation === 'submit') {
                        await $apiQuest.submit(row.qid, this.para);
                    } else {
                        await $apiQuest.revert(row.qid);
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
                    messageText = '文章已提交审核';
                } else {
                    operationName = 'withdraw';
                    confirmText = '确认要撤回问卷？';
                    messageText = '问卷已撤回';
                }
                // 操作文章id整合
                this.tableSelections.forEach(item => {
                    ids.push(item.qid);
                });
                this.$confirm(confirmText, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const para = {
                        operation: operationName,
                        reason: '',
                        id_list: ids
                    };
                    let rs = {};
                    if (operationName === 'submit') {
                        rs = await $apiQuest.batchSubmit(para);
                    } else {
                        rs = await $apiQuest.batchWithdraw(para);
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
                    if (item.state === 0 || item.state === 3 || item.state === 4) {
                        // 第一类操作命令
                        ++countCommandOne;
                    } else {
                        // 第二类操作命令
                        ++countCommandTwo;
                    }
                    selectRead += item.pv;
                });
                if (val.length > 0) {
                    if (countCommandOne === val.length) {
                        this.operations = [{ id: 'submit', method: this.submit, label: '提交审核' }];
                    } else if (countCommandTwo === val.length) {
                        this.operations = [{ id: 'withdraw', method: this.withdraw, label: '撤回问卷' }];
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
                this.questionNo = this.$route.query.search;
                this.userOperation = this.auth.getPageOperations(this.$route.path);
            }
        },
        // 当前list页面挂载前赋值this.api，保证table挂载时拿到指定的api
        created() {
            this.init();
        },
        mounted() {
            // 过滤项回显。mounted前无法通过 this.$refs 访问组件
            this.$refs.filter.update();
            // 如果当前用户有权访问所有人创建的文章
            if (this.userOperation.all && !this.$route.query.list) {
                this.$router.push({ query: { list: 'all' } });
                // 重置过滤项，避免显示上一文章页下拉选项
                this.$refs.filter.reset();
            }
        }
    };
</script>

<style lang="less" scoped>
	.p-questionnaire {
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
