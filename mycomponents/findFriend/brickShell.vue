<template>
	<view class="wrapper">
		<view class="title">{{title}}</view>
		<view class="content">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				require: true
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		width: 100%;
		box-sizing: border-box;
		border-radius: 20rpx;
		padding: 20rpx;
		background: #fff;

		.title {
			color: #393D46;
			border-left: solid 4rpx #393D46;
			font-size: 28rpx;
			font-weight: bold;
			padding-left: 20rpx;
		}

		.content {
			width: 100%;
			margin-top: 24rpx;
			min-height: 20rpx;
		}
	}
</style>
