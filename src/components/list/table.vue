<template lang="pug">
.u-table.v-table
	el-table(
		:data="list"
		:ref="withCheckbox ? 'multipleTable' : ''"
		:tooltip-effect="withCheckbox ? 'dark' : ''"
		:default-sort = "{ prop: 'date', order: 'descending' }"
		:cell-class-name="cellClassName"
		style="width: 100%"
		@selection-change="onSelectionChange"
	)
		slot
</template>

<script>
import $lodash from 'lodash';

export default {
	props: {
		channel: {
			type: String,
			default: ''
		},
		api: {
			type: Function,
			required: true
		},
		withCheckbox: {
			type: Boolean,
			default: true
		},
		onSelectionChange: {
			type: Function,
			default: () => true
		}
	},
	data() {
		return {
			logger: 'components/list/table',
			list: []
		};
	},
	watch: {
		$route() {
			this.update();
		}
	},
	methods: {
		cellClassName({ row, column }) {
			if (column.property === 'stateName') {
				switch (row.state) {
					case 0:
						return 'state-gray';
					case 1:
						return 'state-green';
					case 2:
						return 'state-blue';
					case 3:
						return 'state-red';
					case 4:
						return 'state-yellow';
					default:
						return '';
				}
			}
			return '';
		},
		checkUpdate(info) {
			let path = this.$route.path;
			if (info && path === info.path && this.channel === info.channel) {
				this.update();
			}
		},
		getList() {
			return this.list;
		},
		find(fn) {
			return $lodash.find(this.list, fn);
		},
		async update() {
			let path = this.$route.path;
			let channel = this.channel;
			let api = this.api;
			let query = this.$route.query;
			let rs = await api(query);
			if (rs) {
				let data = {};
				rs.list = rs.list.map(item => {
					// 在此处进行英文名的拼接：full_name = first_name + last_name
					// 为了方便后面（因为后面已经写好了），first_name = full_name
					if (item.last_name && item.first_name) {
						item.first_name = item.first_name + ' ' + item.last_name;
					}
					return item;
				});
				data.list = rs.list;
				data.total = rs.total;
				data.page = rs.page;
				data.size = rs.limit;
				data.path = path;
				data.channel = channel;
				this.list = data.list;
				this.$emit('change', data);
				this.$bus.emit('list-changed', data);
			}
		}
	},
	mounted() {
		this.update();
		this.$bus.on('list-update', this.checkUpdate);
	},
	destroyed() {
		this.$bus.off('list-update', this.checkUpdate);
	}
};
</script>
