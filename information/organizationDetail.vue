<template>
	<view class="oWrapper">
		<!-- <image mode="center"></image> -->
		<view class="bg">
			<image v-if="brandData.Image" :src="publicImgPath+brandData.Image" class="down"></image>
			<view class="accBtn" @click="toAccPage">
				<u-icon name="error-circle" color="#fff" size="48"></u-icon>
			</view>
			<view class="title">{{brandData.Name}}</view>
			<view class="contentBox">{{brandData.Description}}</view>
			<view class="bottomBox">
				<view class="fan">粉丝数 {{brandData.FansNum}}</view>
				<view class="activity">活动数 {{brandData.ActivitiesNum}}</view>
			</view>
		</view>
		<view class="actContent">
			<view class="title">活动列表</view>
			<view v-if="infoList.length>0">
				<orderTicket v-for="(item,idx) in infoList" :key="idx" :infoData="item"></orderTicket>
			</view>
		</view>
		<!-- <view class="btns">
			<view class="base">分享</view>
			<view class="base focus">关注</view>
		</view> -->

	</view>
</template>

<script>
	import {
		bandDetail, //获取组织详情
		ActivityByBand //根据组织id获取活动
	} from '@/common/http.api.js'
	import {
		publicImgPath
	} from '@/common/interface.js'
	import orderTicket from '@/mycomponents/mime/msg.vue'
	export default {
		components: {
			orderTicket
		},
		data() {
			return {
				publicImgPath: publicImgPath,
				brandData: '',
				infoList: [],
				oid: 0,
				pageNum: 1
			};
		},
		methods: {
			req_bandDetail() {
				bandDetail({
					Id: this.oid
				}).then(res => {
					if (res.code == 200) {
						this.brandData = res.data
					}
				})
			},
			req_ActivityByBand() {
				let data = {
					BandId: this.oid,
					PageNum: this.pageNum,
					PageSize: 5
				}
				ActivityByBand(data).then(res => {
					if (res.code == 200) {
						console.log(res)
						this.infoList.push(...res.data.activitys)
					}
				})
			},
			toAccPage() {
				let data = {
					BandId: this.oid
				}
				data = JSON.stringify(data)
				this.$u.route('/mine/accusationPage', {
					data: data,
					title: this.brandData.Name
				})
			}
		},
		onLoad(e) {
			if (e.id) {
				this.oid = parseInt(e.id)
			}
			this.req_bandDetail()
			this.req_ActivityByBand()
		}
	}
</script>

<style lang="scss" scoped>
	.oWrapper {
		box-sizing: border-box;
		padding: 20rpx;
	}

	.bg {
		width: 100%;
		height: 654rpx;
		background: #ccc;
		border-radius: 20rpx;
		position: relative;
		overflow: hidden;

		.down {
			position: absolute;
			width: inherit;
			height: inherit;
		}

		.title {
			font-size: 44rpx;
			font-weight: bold;
			color: #fff;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.contentBox {
			position: absolute;
			bottom: 90rpx;
			width: 630rpx;
			height: 174rpx;
			max-height: 174rpx;
			background-color: rgba(245, 246, 250, 0.5);
			left: 50%;
			transform: translateX(-50%);
			@include xCenter;
			color: #fff;
			border-radius: 10px;
			@include mEllipsis;
			-webkit-line-clamp: 3;
		}

		.bottomBox {
			position: absolute;
			bottom: 36rpx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.fan,
			.activity {
				color: #fff;
				font-size: 24rpx;
			}
		}

		.accBtn {
			float: right;
			margin-top: 20rpx;
			margin-right: 20rpx;

			&::after {
				content: '';
				clear: both;
			}
		}
	}

	.actContent {
		box-sizing: border-box;
		padding: 40rpx;
		border-radius: 20rpx;
		background: #fff;
		margin-top: 20rpx;
		margin-bottom: 80rpx;

		.title {
			box-sizing: border-box;
			padding-left: 20rpx;
			border-left: solid #393D46 4rpx;
			font-size: 32rpx;
			color: #393D46;
		}
	}

	.btns {
		position: fixed;
		bottom: 58rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		left: 0rpx;

		.base {
			width: 300rpx;
			height: 80rpx;
			background: #384F79;
			color: #fff;
			@include xCenter;
			border-radius: 44rpx;
		}

		.focus {
			background: #1D3156;
		}
	}
</style>
