<template lang="pug">
.v-copyright
	.l-wrapper.tcopyright
		.links
			a(href="//www.tencent.com/" target="_blank" rel="nofollow") 关于腾讯
			a(href="//www.tencent.com/index_e.shtml" target="_blank" rel="nofollow") About Tencent
			a(href="//www.qq.com/contract.shtml" target="_blank" rel="nofollow") 服务协议
			a(href="//www.qq.com/privacy.htm" target="_blank" rel="nofollow") 隐私政策
			a(href="//open.qq.com/" target="_blank" rel="nofollow") 开放平台
			a(href="//www.tencentmind.com/" target="_blank" rel="nofollow") 广告服务
			a(href="//hr.tencent.com/" target="_blank" rel="nofollow") 腾讯招聘
			a(href="//gongyi.qq.com/" target="_blank" rel="nofollow") 腾讯公益
			a(href="//kf.qq.com/" target="_blank" rel="nofollow") 客服中心
			a(href="//www.qq.com/map/" target="_blank" rel="nofollow") 网站导航
		.en Copyright © 1998 - {{year}} Tencent. All Rights Reserved
		.bottom
			a(href="//www.tencent.com/" target="_blank" rel="nofollow") 腾讯公司
			a(href="//www.tencent.com/zh-cn/le/copyrightstatement.shtml" target="_blank" rel="nofollow") 版权所有
</template>

<script>
export default {
	data () {
		return {
			year: 2018
		}
	},

	mounted () {
		this.year = Math.max(2018, new Date().getFullYear())
	}
}
</script>

<style lang="less">
@import "~css/color";

.v-copyright{
	width: 100%;
	overflow: hidden;

	.tcopyright {
		padding: 8px 0;
		margin: 0 auto;
		font-size: 12px;
		line-height: 18px;
		color: #333;
		text-align: center;
		overflow: hidden;
		clear: both;
	}

	.links{
		display: none;
		a{
			display: inline-block;
			padding: 0 0.5em;
			height: 12px;
			line-height: 12px;
		}
	}

	a {
		color: #333;
		text-decoration: none;
	}

	a:hover {
		color: @theme-color;
		text-decoration: underline;
	}
}

@media (min-width: 768px) {
	.v-copyright{
		.tcopyright{
			padding: 58px 0;
			line-height: 28px;
		}
		.links{
			display: block;
			a{
				border-right: 1px solid #333;
			}
			a:last-child{
				border-right: none;
			}
		}
	}
}
</style>
