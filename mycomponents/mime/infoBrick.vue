<template>
	<view class="wrapper" @click="toPayed">
		<!-- <view class="ph"></view> -->
		<image class="ph" :src="publicImgPath+infoData.Activity.IImage"></image>
		<view class="right">
			<view>
				<view class="title">{{infoData.Activity.Title}}</view>
				<view class="detail">
					<view class="time">{{infoData.Activity.StartAt|timeFilter}}</view>
					<view class="location">{{infoData.Activity.Address}}</view>
				</view>
			</view>
			<view class="btn">取票券</view>
		</view>
	</view>
</template>

<script>
	import {
		publicImgPath
	} from '@/common/interface.js'
	import {
		timefomat
	} from '@/common/util.js'
	export default {
		data() {
			return {
				publicImgPath: publicImgPath
			}
		},
		filters: {
			timeFilter(val) {
				let data = timefomat(new Date(val), 'MM/dd')
				return data
			}
		},
		props: {
			infoData: {
				default: ''
			}
		},
		methods: {
			toPayed() {
				let id = this.infoData.PaymentInfo.Id
				if (this.infoData.PaymentInfo.PaymentStatus == 1) {
					// 已经支付
					uni.navigateTo({
						url: '/information/payedPage?id=' + id
					})
				} else {
					// 未支付
					this.$u.route('/information/comfirmOrder',{
						id:this.infoData.Id,
						TradeNo:this.infoData.PaymentInfo.TradeNo
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		box-sizing: border-box;
		padding: 30rpx 20rpx;
		display: flex;
		position: relative;

		.ph {
			min-width: 280rpx;
			width: 280rpx;
			height: 180rpx;
			margin-right: 26rpx;
			background: #ccc;
		}

		.right {
			position: relative;
			height: inherit;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				color: #393D46;
				font-size: 24rpx;
				max-width: 342rpx;
				@include mEllipsis;
			}

			.detail {
				margin-top: 16rpx;
				display: flex;
				margin-bottom: 16rpx;

				.time,
				.location {
					color: #6F7280;
					font-size: 24rpx;
				}

				.time {
					margin-right: 40rpx;
				}

			}

			.btn {
				border-radius: 20rpx;
				height: 44rpx;
				width: 140rpx;
				@include xCenter;
				color: #1D3156;
				border: solid 2rpx #1D3156;
			}

		}

	}
</style>
