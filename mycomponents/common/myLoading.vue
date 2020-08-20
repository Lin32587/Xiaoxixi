<template>
	<view class="wrapper">
		<view class="loadingbox" v-if="loading==true">
			<u-loading mode="circle"></u-loading><span>加载中</span>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			loading: {
				default: false
			}
		},
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		width: 100%;

		.loadingbox {
			display: flex;
			justify-content: center;

			span {
				margin-left: 8rpx;
			}
		}
	}
</style>
