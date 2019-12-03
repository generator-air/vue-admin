<template lang="pug">
.v-search
	.el-input(:class="{'is-empty': empty}")
		input.el-input__inner(
			v-model="inputValue"
			autocomplete="off"
			@keyup.13="search"
			:placeholder="placeholder"
		)
		i.el-input__icon.el-icon-search.is-clickable(
			@click="search"
		)
		i.el-input__icon.el-icon-close(
			@click="clear"
		)
</template>

<script>
export default {
	props: {
		channel: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			default: 'kw'
		},
		value: String,
		placeholder: String
	},
	data () {
		return {
			logger: 'view/search',
			inputValue: ''
		}
	},
	computed: {
		empty () {
			return !this.inputValue
		}
	},
	watch: {
		value (val) {
			this.inputValue = val
		}
	},
	methods: {
		get () {
			return this.inputValue
		},
		search () {
			let value = this.inputValue
			value = value.trim()
			this.inputValue = value
			this.$emit('search', value)
		},
		clear () {
			this.inputValue = ''
			this.$emit('clear')
		},
	},
	mounted () {
		this.inputValue = this.value
	}
}
</script>

<style lang="less">
@import "../../src/assets/css/color";

.v-search{
	width: 300px;
	margin-right: 10px;
	input {
		border-radius: 100px;
		box-shadow: 0 0 20px 0 rgba(102, 126, 164, 0.05);
	}
	.el-input__icon {
		position: absolute;
		width: 40px;
		color: #c5c5da;
	}
	.el-icon-search{
		left: 0;
		font-size: 16px;
		cursor: pointer;
	}
	.el-input__inner {
		padding: 0 40px;
		line-height: 40px;
	}
	.el-icon-close {
		right: 0;
		font-size: 12px;
	}
	.el-input.is-active .el-input__inner,
	.el-input__inner:focus{
		border-color: @theme-color;
	}
	.is-empty{
		.el-icon-close{
			display: none;
		}
	}
}
</style>
