<template>
	<view>
		<view class="wrapper" v-if="allList!=0">
			<view class="ticket_card">
				<image class="ph" :src="publicImgPath+allList.Activity.IImage"></image>
				<!-- <view class="ph"></view> -->
				<view class="right">
					<view class="title">{{allList.Activity.Title}}</view>
					<view class="detail">
						<view class="d1">
							<u-icon style="margin-right: 10rpx;" name="zhong" custom-prefix="custom-icon" size="30" color="#999CAA"></u-icon>
							<span class="noWrap">{{allList.Activity.StartAt}}</span>至<span class="noWrap">{{allList.Activity.EndAt}}</span>
						</view>
						<view class="d2">
							<u-icon style="margin-right: 10rpx;" name="position" custom-prefix="custom-icon" size="30" color="#999CAA"></u-icon>
							{{allList.Activity.Address}}
						</view>
					</view>
				</view>
			</view>
			<view class="person_card">
				<view class="name">{{allList.Username}}</view>
				<view class="phone">{{allList.Phone|phoneFilter}}</view>
			</view>
			<view class="order_detail">
				<brickShell title="订单详情">
					<view class="order_card" v-for="item in ticketList">
						<view class="top">
							<view class="name">{{item.Ticket.TicketName}}</view>
							<view class="price">￥{{item.Price}}</view>
						</view>
						<view class="bottom">
							<view class="tname">{{item.Ticket.Description}}</view>
							<view class="count">x{{item.Num}}</view>
						</view>
					</view>
				</brickShell>
			</view>
		</view>
		<view class="bottom_part">
			<view class="price_box">合记:￥{{allList.PayAmount}}</view>
			<view class="confirm_btn" @click="req_payment">确认订单</view>

		</view>
		<u-modal v-model="show" :cancel-style="textStyle" :confirm-style="textStyle" :mask-close-able="true" content="您可以查看商品详情或回到主页"
		 title="购买成功" :show-cancel-button="true" confirm-text="查看详情" cancel-text="回到主页" @confirm="confirmBtn" @cancel="cancelBtn"></u-modal>
	</view>
</template>

<script>
	import brickShell from '@/mycomponents/findFriend/brickShell.vue'
	import {
		publicImgPath
	} from '@/common/interface.js'
	import {
		getInfoOrderByoid,
		addpayment,
		refreshPayment
	} from '@/common/http.api.js'
	import {
		payment
	} from '@/common/interface.js'
	import {
		timefomat,
	} from '@/common/util.js'
	export default {
		components: {
			brickShell
		},
		data() {
			return {
				show: false,
				publicImgPath: publicImgPath,
				orderid: '',
				textStyle: {
					fontSize: '36rpx',
					color: '#1D3156'
				},
				callBackdata: '',
				allList: 0,
				ticketList: []
			};
		},
		filters: {
			phoneFilter(val) {
				let str = val
				str = str.substring(0, 3) + ' XXXX XXXX'
				return str
			}
		},
		methods: {
			req_getInfoOrderByoid() {
				let data = {
					OrderId: this.orderid
				}
				getInfoOrderByoid(data).then(res => {
					if (res.code == 200) {
						console.log(res)
						res.data.Activity.StartAt = timefomat(new Date(res.data.Activity.StartAt), 'yyyy-MM-dd hh:mm')
						res.data.Activity.EndAt = timefomat(new Date(res.data.Activity.EndAt), 'yyyy-MM-dd hh:mm')
						this.allList = res.data
						this.ticketList = res.data.Item
					}
				})

			},
			confirmBtn() {
				uni.navigateTo({
					url: '/information/payedPage?id=' + this.callBackdata.payInfoId
				})
				// console.log('查看详情')
			},
			cancelBtn() {
				uni.switchTab({
					url: '/pages/indexs/iindex'
				})
				// console.log('回到主页')
			},
			// 支付
			req_payment() {
				let data = {
					OrderId: this.allList.Id,
					TradeNo: this.callBackdata == '' ? '' : this.callBackdata.TradeNo
				}
				addpayment(data).then(res => {
					console.log(res)
					let data = res.data
					this.callBackdata = data
					this.wechatPay(data)
				})
			},
			// 微信支付
			wechatPay(data) {
				let that = this
				let mydata = {
					timeStamp: data.timeStamp,
					nonceStr: data.nonceStr,
					package: data.package,
					signType: 'MD5',
					paySign: data.paySign
				}
				// console.log('data', data)
				// console.log('mydata', mydata)
				console.log(this.allList.PayAmount)
				wx.requestPayment({
					...mydata,
					success(e) {
						console.log('成功', e)
						that.show = true
						that.req_refreshPayment(true)
					},
					fail(e) {
						if (that.allList.PayAmount == 0) {
							console.log('成功', e)
							that.show = true
							that.req_refreshPayment(true)
						} else {
							console.log(e)
							uni.showToast({
								title: '支付失败',
								icon: 'none',
								duration: 800
							})
							that.req_refreshPayment(false)
						}

					}
				})
			},
			// 后端支付回调
			req_refreshPayment(type) {
				let data = {
					PaymentId: this.callBackdata.payInfoId,
					Msg: type
				}
				refreshPayment(data).then(res => {
					if (res.code == 200) {
						console.log(res)
						// this.show = type
					}
				})
			}
		},
		onLoad(e) {
			if (e.id) {
				this.orderid = e.id
				console.log(e)
				if (e.TradeNo) {
					this.callBackdata = {}
					this.callBackdata.TradeNo = e.TradeNo
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: '未获取id',
					duration: 800
				})
			}
			this.req_getInfoOrderByoid()
		}
	}
</script>

<style lang="scss" scoped>
	@mixin shadow {
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
	}

	.wrapper {
		box-sizing: border-box;
		padding: 20rpx;
	}

	.ticket_card {
		border-radius: 20rpx;
		padding: 10px;
		background: #fff;
		display: flex;
		@include shadow;

		.ph {
			width: 260rpx;
			min-width: 260prx;
			height: 120rpx;
			background: #ccc;
			margin-right: 20rpx;
		}


		.right {
			.title {
				font-size: 24rpx;
				color: #1D3156;
			}

			.detail {
				margin-top: 10rpx;
				display: flex;
				flex-wrap: wrap;

				.d1,
				.d2 {
					display: flex;
					font-size: 20rpx;
					color: #999CAA;
				}
			}
		}
	}

	.person_card {
		box-sizing: border-box;
		padding: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
		border-radius: 20rpx;
		background: #fff;
		@include shadow;

		.name {
			font-size: 28rpx;
			color: #6F7280;
		}

		.phone {
			font-size: 32rpx;
			color: #101010;
		}
	}

	.order_detail {
		box-sizing: border-box;
		padding: 30rpx 20rpx;
		@include shadow;
		border-radius: 20rpx;
		background: #fff;
		margin-top: 20rpx;
		margin-bottom: 20rpx;

		.order_card {
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 20rpx;
			background: #F5F6FA;

			margin-bottom: 20rpx;

			.top,
			.bottom {
				display: flex;
				justify-content: space-between;
			}

			.top {
				.name {
					font-size: 28rpx;
					color: #6F7280;
				}

				.price {
					font-size: 32rpx;
					color: #384F79;
					font-weight: bold;
				}
			}

			.bottom {
				margin-top: 20rpx;

				.tname {
					color: #384F79;
					font-size: 24rpx;
					max-width: 420rpx;
					@include singleEllipsis;
				}

				.count {
					font-size: 24rpx;
					color: #8C8C8C;
				}
			}
		}
	}

	.bottom_part {
		height: 100rpx;
		position: fixed;
		bottom: 0rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		background: #fff;
		width: 100%;

		.price_box {
			font-size: 28rpx;
			color: #384F79;
			font-weight: bold;
			margin-right: 48rpx;
			height: inherit;
			@include xCenter;
		}

		.confirm_btn {
			@include xBtn;
			width: 220rpx;
			height: inherit;
			border-radius: 0rpx;
		}
	}

	.noWrap {
		white-space: nowrap;
	}

	.switem {
		height: 100%;
	}
</style>
