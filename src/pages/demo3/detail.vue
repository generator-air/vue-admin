<template lang="pug">
	.u-style.l-content.p-detail
		.u-style.l-content-title
			el-breadcrumb
				router-link(:to="'/demo3/list'")
					el-breadcrumb-item 组件示例
					el-breadcrumb-item 数据管理
				h1.u-style.header-title 数据详情
			mixin pcicRow (title, content)
				.pcic-row
					.pcic-title #{title}：
					if block
						block
			.p-coupon-info-head
				h3 数据信息
			.p-coupon-info-content
				+pcicRow('简称')
					.pcic-content {{form.brief}}
				+pcicRow('全称')
					.pcic-content {{form.full}}
				+pcicRow('含义')
					.pcic-content {{form.mean}} 张
				+pcicRow('备注')
					.pcic-content {{form.tips}}

</template>

<script>
import $search from '@/components/list/search'
import $filter from '@/components/list/filter'
import $date from '@/util/date'
import $env from '@/model/env'

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
						return this.$get($env.domain + '/word/getId', { id }).catch(
                err => this.$message.error(err)
            )
				},
				// 新增词条
        addInfo(para) {
            return this.$post($env.domain + '/word/add', para).catch(
								err => this.$message.error(err)
						)
				},
				// 更新词条
			 updateInfo(para) {
					return  this.$post($env.domain + '/word/modify', para).catch(
							err => this.$message.error(err)
					)
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
						const rs = await this.searchId(this.id)
						if (rs) {
								this.form = Object.assign(this.form, rs)
								this.form.brief = rs.brief
								this.form.full = rs.full
								this.form.mean = rs.mean
								this.form.tips = rs.tips
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
	.p-detail{
		.p-coupon-info{
			padding: 30px;
			background-color: #fff;
			.p-coupon-info-head{
				margin-bottom: 30px;
				display: flex;
				height: 50px;
				justify-content: space-between;
				align-items: center;
				h3{
					margin: 0;
				}
			}
			.p-coupon-info-content{
				font-size: 14px;
				color: #333;
				.pcic-row{
					margin-bottom: 15px;
					display: flex;
				}
				.pcic-title{
					flex-shrink: 0;
					width: 150px;
					text-align: right;
				}
				.pcic-content{
					a{
						margin-left: 30px;
					}
				}
			}
		}
	}
</style>

