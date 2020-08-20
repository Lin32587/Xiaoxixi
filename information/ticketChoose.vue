<template>
	<view class="wrapper">
		<view class="corebox">
			<!-- 活动 -->
			<view class="card">
				<image :src="allData.Image" v-if="allData.Image" class="ph"></image>
				<!-- <view class="ph"></view> -->
				<view class="right">
					<view class="title">{{allData.Title}}</view>
					<view class="detail">
						<view class="d1">
							<u-icon style="margin-right: 10rpx;" name="zhong" custom-prefix="custom-icon" size="30" color="#999CAA"></u-icon>
							{{allData.StartAt}}-{{allData.EndAt}}
						</view>
						<view class="d2">
							<u-icon style="margin-right: 10rpx;" name="position" custom-prefix="custom-icon" size="30" color="#999CAA"></u-icon>
							{{allData.Address}}
						</view>
					</view>
					<view class="bottom">
						<view class="browsers">浏览 {{allData.BrowseNum}}</view>
						<view class="price">￥0起</view>
					</view>
				</view>
			</view>
			<!-- 票 -->
			<view class="tcard" v-for="(item,idx) in tickList">
				<view class="header">
					<view class="name">{{item.TicketName}}</view>
					<view class="status" v-if="item.Total>0">有票</view>
					<view class="status" v-else>无票</view>
				</view>
				<view class="detail">
					<view class="price">￥{{item.Price}}</view>
					<u-number-box :disabled="item.Total>0?false:true" :max="item.Total" v-model="item.num"></u-number-box>
				</view>
				<view class="content">{{item.Description}}</view>

			</view>
		</view>

		<view class="next_btn" @click="handleData">下一步</view>
	</view>
</template>

<script>
	import {
		timefomat
	} from '@/common/util.js'
	import {
		activityandTicket,
		addInfoOrder
	} from '@/common/http.api.js'
	export default {
		data() {
			return {
				ticketNum: {},
				allData: {},
				tickList: [],
				id: 1,
			};
		},
		methods: {
			req_activityandTicket() {
				activityandTicket({
					Id: this.id
				}).then(res => {
					if (res.code == 200) {
						console.log(res)
						res.data.StartAt = timefomat(new Date(res.data.StartAt), 'yyyy-MM-dd hh:mm')
						res.data.EndAt = timefomat(new Date(res.data.EndAt), 'yyyy-MM-dd hh:mm')
						this.allData = res.data;
						this.tickList = res.data.Ticket.map(item => {
							item.num = 0
							return item
						})
					}
				})
			},
			handleData() {
				let isAllZero = true
				this.tickList.forEach(item => {
					if (item.num > 0) {
						isAllZero = false
					}
				})
				if (isAllZero == true) {
					uni.showToast({
						icon: 'none',
						title: '请添加票券',
						duration: 800
					})
					return
				} else {
					let ticketArr = this.tickList.map(item => {
						let data = {
							price: item.Price,
							num: item.num,
							ticketId: item.Id
						}
						return data
					})
					this.req_addInfoOrder(ticketArr)
				}
			},
			req_addInfoOrder(ticketArr) {
				let data = {
					activityId: this.allData.Id,
					item: ticketArr,
					personId: this.gUserid
				}
				addInfoOrder(data).then(res => {
					if (res.code == 200) {
						console.log(res)
						let id = res.data.orderId;
						uni.navigateTo({
							url: '/information/fixInformation?id=' + id,
						})
					}
				})
			}

		},
		onLoad(e) {
			if (e.id) {
				this.id = e.id
			}
			this.req_activityandTicket()
		}
	}
</script>

<style lang="scss">
	.corebox {
		box-sizing: border-box;
		padding: 20rpx;
	}

	@mixin box-shadow {
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
	}

	.card {
		display: flex;
		box-sizing: border-box;
		padding: 20rpx;
		background: #fff;
		border-radius: 20rpx;
		@include box-shadow;

		.ph {
			width: 260rpx;
			min-width: 260rpx;
			height: 160rpx;
			background: #ccc;
			margin-right: 20rpx;
		}

		.right {
			.title {
				font-size: 24rpx;
				color: #1D3156;
				font-weight: bold;
			}

			.detail {
				margin-top: 10rpx;
				display: flex;
				flex-wrap: wrap;

				.d1,
				.d2 {
					display: flex;
					font-size: 10px;
					color: #999CAA;
				}

				.d1 {
					margin-right: 10rpx;
				}
			}
		}

		.bottom {
			margin-top: 14rpx;
			display: flex;
			justify-content: space-between;

			.browsers {
				color: #999CAA;
				font-size: 20rpx;
			}

			.price {
				color: #6F7280;
				font-size: 24rpx;
				font-weight: bold;
			}
		}

	}

	.tcard {
		@include box-shadow;
		box-sizing: border-box;
		padding: 28rpx 40rpx;
		border-radius: 20rpx;
		background: #fff;
		margin-top: 20rpx;

		.header {
			display: flex;
			justify-content: space-between;

			.name {
				color: #1D3156;
				font-size: 12px;
			}

			.status {
				color: #DADCE3;
				font-size: 24rpx;
			}
		}

		.detail {
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
			align-items: flex-end;

			.price {
				font-size: 36rpx;
				color: #384F79;
				font-weight: bold;

			}
		}

		.content {
			font-size: 24rpx;
			color: #999CAA;
			margin-top: 20rpx;
		}
	}

	.next_btn {
		@include xBtn;
		border-radius: 0rpx;
		position: fixed;
		bottom: 0rpx;
		height: 100rpx;
	}
</style>
