<template>
	<view class="wrapper">
		<view class="tab_box">
			<u-tabs name="name" bg-color="#F5F6FA" active-color="#1D3156" :list="list" :is-scroll="true" :current="current"
			 @change="tabChange"></u-tabs>
		</view>
		<swiper class="swiper_style" @change="swChange" :indicator-dots="false" :autoplay="false" :current="current">
			<swiper-item class="switem" v-for="(item,idx) in ticketList" :key="idx">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<view class="card_wrap">
						<view class="card">
							<view class="title">{{item.PaymentInfo.Order.Activity.Title}}</view>
							<view class="detail">
								<u-icon style="margin-right: 10rpx;" name="zhong" custom-prefix="custom-icon" size="30" color="#999CAA"></u-icon>
								<span class="norGrey">{{timeFilter(item.PaymentInfo.Order.Activity.StartAt)}}-{{timeFilter(item.PaymentInfo.Order.Activity.EndAt)}}</span>

							</view>
							<view class="detail">
								<u-icon style="margin-right: 10rpx;" name="position" custom-prefix="custom-icon" size="30" color="#999CAA"></u-icon>
								<span class="norGrey">湖北省武汉市洪山区武汉理工大学东院</span>

							</view>
							<view class="ticket_num">票号：{{item.TicketNumber}}</view>
							<view class="qrcode_box">
								<image class="qrcode" :src="publicImgPath+item.Image"></image>
								<!-- <view class="qrcode"></view> -->
							</view>
						</view>
						<view class="bottom_card">
							<brickShell title="票根数据">
								<view class="info">
									<u-cell-group :border="false">
										<u-field v-model="form.a1" :disabled="true" label="姓名" :placeholder="item.PaymentInfo.Order.Username"></u-field>
										<u-field v-model="form.a2" :disabled="true" label="电话" :placeholder="item.PaymentInfo.Order.Phone"></u-field>
										<u-field v-model="form.a3" :disabled="true" label="状态" :placeholder="item.Item.Status|statusFilter"></u-field>
										<u-field v-model="form.a4" :disabled="true" label="票种" :placeholder="item.Item.Ticket.TicketName"></u-field>
										<u-field v-model="form.a5" :disabled="true" label="票价" :placeholder="String(item.Item.Price)"></u-field>
										<u-field v-model="form.a6" :disabled="true" label="实付金额" :placeholder="String(item.Item.RealAmount)"></u-field>
									</u-cell-group>
								</view>
							</brickShell>
							<brickShell title="票务说明">
								<view class="tcontent">{{item.Item.Ticket.Description}}</view>
							</brickShell>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<view class="tips">
			温馨提示:扫码二维码使用票据，如有任何问题请资讯客服寻求帮助
		</view>
	</view>
</template>

<script>
	import {
		timefomat
	} from '@/common/util.js'
	import brickShell from '@/mycomponents/findFriend/brickShell.vue'
	import {
		publicImgPath
	} from '@/common/interface.js'
	import {
		findPaydetail
	} from '@/common/http.api.js'
	export default {
		components: {
			brickShell
		},
		data() {
			return {
				form: {
					Username: '',
					Phone: ''
				},
				current: 0,
				reqData: '',
				// PaymentId: '',
				// ItemId: '',
				list: [], //tabBar
				ticketList: [],
				publicImgPath: publicImgPath
			};
		},
		filters: {
			statusFilter(val) {
				if (val == 0) {
					return '票据可用'
				}
			}
		},
		methods: {
			tabChange(e) {
				this.current = e
			},
			swChange(e) {
				let idx = e.detail.current
				this.current = idx
			},
			// 获取票详细信息
			req_findPaydetail() {
				let data = this.reqData
				findPaydetail(data).then(res => {
					if (res.code == 200) {
						this.ticketList = res.data
						this.list = res.data.map((item, idx) => {
							let data = {
								name: item.Item.Ticket.TicketName
							}
							return data
						})
					}
				})
			},
			timeFilter(val) {
				let data = timefomat(new Date(val), 'yyyy.MM.dd hh:mm')
				return data
			}
		},
		onLoad(e) {
			this.reqData = e
			this.req_findPaydetail()
			// this.ItemId = e.ItemId;
			// this.PaymentId = e.PaymentId
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		box-sizing: border-box;
		// padding: 40rpx 20rpx
	}

	.card {
		border-radius: 20rpx;
		background: #fff;
		padding: 40rpx;
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);

		.title {
			font-size: 36rpx;
			color: #1D3156;
			font-weight: bold;
			margin-bottom: 22rpx;
		}

		.detail {
			display: flex;
			margin-bottom: 28rpx;

			.norGrey {
				font-size: 20rpx;
				color: #999CAA;
			}
		}

		.ticket_num {
			color: #393D46;
			text-align: center;
			margin-top: 10rpx;
		}

		.qrcode_box {
			width: 220rpx;
			height: 220rpx;
			border-radius: 20rpx;
			background: #ccc;
			margin: 0 auto;
			margin-top: 56rpx;
			@include xCenter;

			.qrcode {
				height: 200rpx;
				width: 200rpx;
				background: #fff;

			}
		}
	}

	.bottom_card {
		margin-top: 40rpx;
		box-sizing: border-box;
		padding: 20rpx 20rpx;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
		background: #fff;

		.tcontent {
			color: #6F7280;
		}
	}

	.tips {
		width: 590rpx;
		margin: 0 auto;
		margin-top: 40rpx;
		margin-bottom: 42rpx;
		font-size: 24rpx;
		color: #6F7280;
	}

	.tab_box {
		margin-bottom: 20rpx;
	}

	.card_wrap {
		padding-bottom: 40rpx;
	}

	.swiper_style {
		height: 80vh;
	}
</style>
