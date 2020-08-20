<template>
	<view class="wrapper" @click="toDetail">
		<view class="top_blcok">
			<view class="ph ph_null" v-if="!infoData.IImage">
				<u-icon name="photo" size="80" color="#c0c4cc"></u-icon>
			</view>
			<image class="ph" v-else :src="publicImgPath+infoData.IImage"></image>
			<view class="right">
				<view class="title">{{infoData.Title}}</view>
				<view class="detail">
					<!-- 					<view class="date">{{infoData.StartAt}}</view> -->
					<view class="date">{{timeFilter(infoData.StartAt)}}</view>
					<view class="address">{{infoData.Address}}</view>
				</view>
				<view class="price">￥{{infoData.Money}}起</view>
			</view>
		</view>
		<view class="bottom_blcok">
			<view class="tags">
				<view class="tag">{{infoData.Keyword}}</view>
				<!-- <view class="tag" v-for="item in tagList" :key="item.name">#{{item.name}}</view> -->
			</view>
			<view class="freeBtn">免费抢票</view>
		</view>
	</view>
</template>

<script>
	import {
		timefomat
	} from '@/common/util.js'
	import {
		publicImgPath
	} from '@/common/interface.js'
	export default {
		data() {
			return {
				publicImgPath: publicImgPath
			}
		},
		props: {
			infoData: {
				default: ''
			}
		},
		methods: {
			toDetail() {
				uni.navigateTo({
					url: '/information/activityDetail?id=' + this.infoData.Id
				})
			},
			timeFilter(val) {
				let data = timefomat(new Date(val), 'MM/dd')
				return data
			}
		},
	}
</script>

<style scoped lang="scss">
	.wrapper {
		box-sizing: border-box;
		padding-top: 20rpx;
		padding-bottom: 20rpx;

		.top_blcok {
			display: flex;

			.ph {
				width: 260rpx;
				height: 180rpx;
				background: #ccc;
				border-radius: 10rpx;
				min-width: 260rpx;
				margin-right: 26rpx;
			}

			.ph_null {
				background: #f4f5f6;
				@include xCenter;
			}

			.right {
				.title {
					font-weight: bolder;
					font-size: 28rpx;
					letter-spacing:2rpx;
					color: #393D46;
					word-break: break-all;
				}

				.detail {
					margin-top: 16rpx;
					display: flex;
					align-items: center;

					@mixin Base {
						color: #6F7280;
						font-size: 24rpx;
					}

					.date {
						@include Base;
						margin-right: 40rpx;
					}

					.address {
						@include Base;
					}

				}

				.price {
					color: #384F79;
					margin-top: 14rpx;
					font-weight: bold;
				}
			}
		}

		.bottom_blcok {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;

			.tags {
				display: flex;
				flex-wrap: wrap;
				max-width: 460rpx;

				.tag {
					font-size: 24rpx;
					color: #6F7280;
					margin-left: 10rpx;
				}
			}

			.freeBtn {
				width: 140rpx;
				height: 48rpx;
				@include xCenter;
				color: #384F79;
				border: solid 2rpx #384F79;
				border-radius: 10rpx;
				font-size: 24rpx;
			}
		}
	}
</style>
