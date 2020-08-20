<template>
	<view class="wrapper">
		<view class="header">
			<u-steps :list="accList" mode="dot" active-color="#1D3156" un-active-color="#B2BED5" :current="currenStep"></u-steps>
		</view>
		<view class="core_box">
			<view class="round">
				<u-icon name="checkbox-mark" color="#ffffff" size="100"></u-icon>
			</view>
			<view class="title" v-if="currenStep==1">举报提交成功</view>
			<view class="title" v-else>您的举报已收到</view>
			<view class="warn">
				<view class="warn_content" v-if="currenStep==1">
					<view>你将可在3个工作日内</view>
					<view>查看举报结果</view>
				</view>
				<view class="warn_content" v-else>
					<view>感谢您与我们一起</view>
					<view>维护社区美好和谐的环境</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currenStep: 1,
				accList: [{
						name: '举报提交'
					},
					{
						name: '审核中'
					},
					{
						name: '反馈结果'
					},
				]
			};
		},
		onLoad(e) {
			if (e.status) {
				this.currenStep = parseInt(e.status)+1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		box-sizing: border-box;
		padding: 20rpx;

		.core_box {
			box-sizing: border-box;
			border-radius: 20rpx;
			background: #fff;
			padding: 74rpx 56rpx;
			@include xCenter;
			flex-direction: column;
			margin-top: 48rpx;
			padding-top: 160rpx;
		}

		.round {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			background: #1D3156;
			@include xCenter;
		}

		.title {
			color: #1D3156;
			font-weight: bold;
			font-size: 36rpx;
			margin-top: 28rpx;
		}

		.warn {
			width: 100%;
			height: 200rpx;
			background: #F5F6FA;
			border-radius: 20rpx;
			@include xCenter;
			color: #B2BED5;
			margin-top: 102rpx;

			.warn_content {
				@include xCenter;
				flex-direction: column;
			}
		}
	}
</style>
