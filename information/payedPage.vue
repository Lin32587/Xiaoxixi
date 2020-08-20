<template>
	<view class="wrapper">
		<view class="order_detail">
			<brickShell title="已支付订单">
				<view v-if="ticketList.length>0">
					<view class="order_card" @click="toDetail(idx)" v-for="(item,idx) in ticketList">
						<view class="top">
							<view class="name">{{item.Ticket.TicketName}}</view>
							<view class="price">￥{{item.Price}}</view>
						</view>
						<view class="bottom">
							<view class="tname">{{item.Ticket.Description}}</view>
							<view class="count">x{{item.Num}}</view>
						</view>
					</view>
				</view>
			</brickShell>
		</view>
	</view>
</template>

<script>
	import {
		paymentItem
	} from '@/common/http.api.js'
	import brickShell from '@/mycomponents/findFriend/brickShell.vue'
	export default {
		components: {
			brickShell
		},
		data() {
			return {
				id: '',
				allData: {},
				ticketList: []
			}
		},
		methods: {
			req_paymentItem() {
				paymentItem({
					PaymentId: this.id
				}).then(res => {
					if (res.code == 200) {
						this.allData = res.data
						this.ticketList = res.data.Item
					}
				})
			},
			toDetail(idx) {
				this.$u.route('/information/ticketDetail', {
					PaymentId: this.id,
					// PaymentId: this.allData.Id,
					ItemId: this.ticketList[idx].Id
				})
			}
		},
		onLoad(e) {
			if (e.id) {
				this.id = e.id
			}
			this.req_paymentItem()
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
</style>
