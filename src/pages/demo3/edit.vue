<template lang="pug">
	.u-style.l-content.p-edit
		.u-style.l-content-title
			el-breadcrumb
				router-link(:to="'/demo3/list'")
					el-breadcrumb-item 组件示例
					el-breadcrumb-item 数据管理
			.u-style.u-table-header
				h1.u-style.header-title {{qid ? '编辑' : '创建'}}数据
		.u-style.u-table-header
				el-form.u-form(
					:inline="true"
					label-position="left"
					:model="form"
					:rules="rules"
					ref="form"
				)
					.u-style.filter-block
						el-form-item(label="数据缩写:" prop="brief")
							el-input(
								v-model="form.brief"
								size="small"
								style="width: 480px"
								placeholder="请输入数据缩写"
							)
					.u-style.filter-block
						el-form-item(label="数据全称:" prop="full")
							el-input(
								v-model="form.full"
								size="small"
								style="width: 480px"
								placeholder="请输入数据全称"
							)
					.u-style.filter-block
						el-form-item(label="数据含义:" prop="mean")
							el-input(
								v-model="form.mean"
								size="small"
								style="width: 480px"
								placeholder="请输入数据含义"
							)
					.u-style.filter-block
						el-form-item(label="数据备注:" prop="tips")
							el-input(
								v-model="form.tips"
								size="small"
								placeholder="请输入数据备注"
								type="textarea"
								:autosize="{ minRows: 2, maxRows: 100}"
							)
					.u-style.u-button-group
						el-button.u-style.u-button(
							type="primary"
							size="large"
							plain
							@click="check('form')"
						) 提交
						el-button(
							type="danger"
							plain
							@click="clear"
						) 清空

</template>

<script>
import $search from '@/components/list/search'
import $filter from '@/components/list/filter'
import $date from '@/util/date'
import $api from '@/model/api'

export default {
		components: {
				'v-search': $search,
				'v-filter': $filter,
		},
		computed: {},
		data() {
				return {
						type: '',
						qid: '',
						list: {},
						showUpload: false,
						form: {
								brief: '',
								full: '',
								mean: '',
								tips: ''
						},
						rules: {
								brief: [
										{ required: true, message: '请输入数据缩写', trigger: 'blur' },
										{ min: 1, message: '长度不少于1个汉字', trigger: 'blur' },
										{ max: 50, message: '长度不超过50个汉字', trigger: 'blur' }
								],
								full: [
										{ required: true, message: '请输入数据全称', trigger: 'blur' },
										{ min: 1, message: '长度不少于1个汉字', trigger: 'blur' },
										{ max: 50, message: '长度不超过50个汉字', trigger: 'blur' }
								],
								mean: [
										{ required: true, message: '请输入数据含义', trigger: 'blur' },
										{ min: 1, message: '长度不少于1个汉字', trigger: 'blur' },
										{ max: 200, message: '长度不超过200个汉字', trigger: 'blur' }
								],
								tips: [
										{ required: true, message: '请输入数据备注', trigger: 'blur' },
										{ min: 1, message: '长度不少于1个汉字', trigger: 'blur' },
										{ max: 200, message: '长度不超过200个汉字', trigger: 'blur' }
								]
						}
				}
		},
		methods: {
				dateFormat(time) {
						return $date.formatSec(time)
				},
				// 根据id查询
				searchId(id) {
						return this.$get($api.getDetail, { id })
				},
				// 新增词条
        addInfo(para) {
            return this.$post($api.add, para)
				},
				// 更新词条
			 updateInfo(para) {
					return  this.$post($api.update, para)
				},

				// 文件上传成功
				handleSuccess(response, file) {
						if (file && file.response.code === 0) {
								this.$message.success('数据导入成功');
						} else {
								this.$message.error('数据导入失败');
								this.fileList = {}
						}
				},
				// 文件上传失败
				handleError(err) {
						if (err) {
								this.$message.success('文件上传失败')
						}
				},
				// 超过上限提示
				handleExceed() {
						this.$message.warning(`上传文件超过最大限制5个`);
				},
				// 移除前提示
				beforeRemove(file) {
						return this.$confirm(`确定移除 ${file.name}？`);
				},
				// 数据获取
        async getList() {
						this.id = this.qid
						const { data } = await this.searchId(this.id)
						if (data) {
								this.form = Object.assign(this.form, data)
								this.form.brief = data.brief
								this.form.full = data.full
								this.form.mean = data.mean
								this.form.tips = data.tips
						}
				},
				async submitForm() {
						const para = Object.assign({}, this.form)
						if (this.qid) {
								para.id = this.qid
								const rs = await this.updateInfo(para)
								if (rs) {
										this.$message.success('修改数据已提交')
										this.$router.push({ path: '/demo3/list' })
								} else {
										this.$message.error("提交失败")
								}
						} else {
								const rs = await this.addInfo(para)
								if (rs) {
										this.$message.success('新增数据已提交')
										this.$router.push({ path: '/demo3/list' })
								} else {
										this.$message.error("提交失败")
								}
						}
				},
				// 提交
				check(formName) {
						this.$refs[formName].validate(valid => {
								// 数据外表单项验证通过
								if (valid) {
										this.confirm('确认提交？', this.submitForm)
										return true
								}
								return false
						})
				},
				// 清空输入，包括拖拽空间
				clear() {
						// 重置表单数据
						this.$refs.form.resetFields()
				},
				// 弹窗提示
				confirm(confirmText, operation) {
						this.$confirm(confirmText, '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
						}).then(() => {
								operation()
						}).catch(() => {
						})
				},
				init() {
						// 从列表页进入已创建的数据，路由带id
						this.qid = this.$route.query.id
						this.showUpload = !this.qid
						if (this.qid) {
								this.getList()
						}
				}
		},
		mounted() {
				this.init()
		}

}
</script>

<style lang="less">
	.p-edit {
		.el-form-item__label {
			min-width: 120px;
			text-align: right;
			padding-right: 30px;
		}

		.header-button {
			display: flex;
		}
	}
</style>
