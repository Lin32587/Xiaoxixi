<template>
	<view class="wrapper">
		<!-- 信息 -->
		<view class="user_card">
			<view class="top">
				<view class="ph"></view>
				<view class="t_right">
					<view class="name_block">
						<view class="name">Lomo</view>
						<Rounds />
					</view>
					<view class="shells">析贝:1000</view>
				</view>
			</view>
			<view class="bottom">会员有效期：2019-9-1 至 2019-10-1</view>
		</view>
		<!-- 会员特权块 -->
		<view class="vip_block">
			<view class="v_title">会员特权</view>
			<view class="slide_box">
				<scroll-view class="scroll-view_H" scroll-x="true">
					<view class="vip_auth">12</view>
					<view class="vip_auth">12</view>
					<view class="vip_auth">12</view>
					<view class="vip_auth">12</view>
					<view class="vip_auth">12</view>
					<view class="vip_auth">12</view>
				</scroll-view>
			</view>
			<view class="tip" v-for="item in tips" :key="item">
				{{item}}
			</view>
		</view>
		<view class="vip_btn">
			<text v-if="isVip==false">开通会员</text>
			<text v-if="isVip==true">续费会员</text>
		</view>
	</view>
</template>

<script>
	import Rounds from '@/mycomponents/common/round.vue'
	export default {
		components: {
			Rounds
		},
		data() {
			return {
				isVip: false,
				tips: [
					'通知，寻伴详情查看次数不限（非用户3次/天）',
					'寻伴发帖次数不限（非会员上线2次/周）',
					'更多权限'
				]
			};
		},
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		box-sizing: border-box;
		padding: 20rpx;
		padding-bottom: 280rpx;
	}

	.user_card {
		padding: 32rpx 40rpx;
		padding-bottom: 26rpx;
		border-radius: 20rpx;
		background: #fff;

		.top {
			display: flex;

			.ph {
				border-radius: 50%;
				width: 80rpx;
				height: 80rpx;
				background: #ccc;
				min-width: 80rpx;
				margin-right: 12rpx;
			}

			.name_block {
				display: flex;
				align-items: center;

				.name {
					color: #393D46;
					margin-right: 8rpx;
				}
			}

			.shells {
				color: #6F7280;
				font-size: 24rpx;
			}
		}

		.bottom {
			color: #6F7280;
			font-size: 24rpx;
			margin-top: 28rpx;
		}
	}

	.vip_block {
		border-radius: 20rpx;
		background: #fff;
		padding: 40rpx;
		padding-bottom: 54rpx;
		margin-top: 20rpx;

		.v_title {
			box-sizing: border-box;
			padding-left: 12rpx;
			border-left: solid 4rpx #1D3156;
			color: #1D3156;
			font-weight: bold;
			font-size: 28rpx;
		}

		.tip {
			width: 100%;
			height: 60rpx;
			@include xCenter;
			background: #F5F6FA;
			color: #1D3156;
			font-weight: bold;
			font-size: 22rpx;
			margin-top: 46rpx;
		}
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		margin-top: 44rpx;
		box-sizing: border-box;
		padding: 10rpx;
		padding-left: 32rpx;

		.vip_auth {
			display: inline-block;
			width: 160rpx;
			height: 212rpx;
			background: #fff;
			border-radius: 10rpx;
			margin-right: 32rpx;
			border: solid 2rpx rgba(0, 0, 0, 0.05);
			box-shadow: 0px 0rpx 20rpx 0rpx rgba(0, 0, 0, 0.05);
			text-align: center;
			line-height: 212rpx;
		}
	}

	.vip_btn {
		border-radius: 40rpx;
		background: #1D3156;
		color: #fff;
		font-size: 28rpx;
		@include xCenter;
		height: 80rpx;
		margin-top: 90rpx;
	}
</style>
