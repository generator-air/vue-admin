<template lang="pug">
	.u-style.u-table.v-table
		el-table(
			:data="list"
			border
			:span-method="objectSpanMethod"
			:ref="withCheckbox ? 'multipleTable' : ''"
			:tooltip-effect="withCheckbox ? 'dark' : ''"
			:default-sort = "{ prop: 'date', order: 'descending' }"
			style="width: 100%"
			@data-format="dataFormat"
			@selection-change="onSelectionChange"
		)
			slot
</template>

<script>
    import $lodash from 'lodash'

    export default {
        props: {
            channel: {
                type: String,
                default: ''
            },
            api: {
                type: String,
                default: ''
            },
            withCheckbox: {
                type: Boolean,
                default: true
            },
            onSelectionChange: {
                type: Function,
                default: () => true
            },
            // 对数据进行格式化
            dataFormat: {
                type: Function,
                default: value => value
            }
        },
        data() {
            return {
                logger: 'components/list/table',
                list: [],
                spanArr: [],
                border: false,
            }
        },
        watch: {
            $route() {
                this.update()
            }
        },
        methods: {
            // 按id聚合
            getSpanArr(data) {
                this.spanArr = []
                let pos  = 0
                data.map((item, index)=>{
                    if (index === 0) {
                        this.spanArr.push(1)
                        pos = 0
                    } else {
                        // 判断这一条和上一条id是否相同
                        if (item.id  === data[index - 1].id) {
                            this.spanArr[pos] += 1
                            this.spanArr.push(0)
                        } else {
                            this.spanArr.push(1)
                            pos = index
                        }
                    }
                })
            },
            objectSpanMethod({ rowIndex, columnIndex }) {
                // 合并前两列
                if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
                    const _row = this.spanArr[rowIndex]
                    const _col = _row > 0 ? 1 : 0
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
            },
            checkUpdate(info) {
                let path = this.$route.path
                if (info && path === info.path && this.channel === info.channel) {
                    this.update()
                }
            },
            getList() {
                return this.list
            },
            find(fn) {
                return $lodash.find(this.list, fn)
            },
            // 更新数据
            notify(err, path, channel) {
                let data = {}
                data.list = []
                data.total = 0
                data.path = path
                data.channel = channel
                this.list = data.list
                this.$emit('change', data)
                this.$bus.emit('list-changed', data)
                return err
            },

            // 填充数据
            fill(rs, path, channel) {
                if (rs) {
                    rs = this.dataFormat(rs)
                    let data = {}
                    data.response = rs
                    data.list = rs.list
                    data.total = rs.total
                    data.page = rs.page
                    data.size = rs.limit
                    data.path = path
                    data.channel = channel
                    this.list = data.list
                    this.getSpanArr(this.list)
                    this.$emit('change', data)
                    this.$bus.emit('list-changed', data)
                }
                return rs
            },
            // 网络请求
            async update() {
                let api = this.api
                let query = this.$route.query
                let path = this.$route.path
                let channel = this.channel
                await this.$get(api, query).then(rs => this.fill(rs, path, channel)).catch(err => this.notify(err, path, channel))
            }
        },
        mounted() {
            this.update()
            this.$bus.on('list-update', this.checkUpdate)
        },
        destroyed() {
            this.$bus.off('list-update', this.checkUpdate)
        }
    }
</script>
