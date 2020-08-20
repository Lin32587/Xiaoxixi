<template>
	<view class="wrapper">
		<view class="header">
			<u-tabs bar-width="72" active-color="#393D46" inactive-color="#C5C9D2" :list="tabList" :is-scroll="false" :current="currentTab"
			 @change="tabChange"></u-tabs>
		</view>
		<view class="core_box">
			<view class="brick_box" v-if="currentTab==0&&allList.length>0">
				<infoBrick v-for="(item,index) in allList" :infoData="item" :key="index"></infoBrick>
			</view>
	<!-- 		<view class="brick_box" v-if="currentTab==1">
				<infoBrick></infoBrick>
			</view> -->
			<view class="brick_box" v-if="currentTab==1&&attendList.length>0">
				<infoBrick v-for="(item,index) in attendList" :infoData="item" :key="index"></infoBrick>
			</view>
			<view class="brick_box" v-if="currentTab==2&&payList.length>0">
				<infoBrick v-for="(item,index) in payList" :infoData="item" :key="index"></infoBrick>
			</view>
			<myloading :loading="loading"></myloading>
		</view>
	</view>
</template>

<script>
	import {
		orderAllByUser, //所有订单
		orderNoPayByUser, //待支付订单
		OrderByUser, //已支付订单
	} from '@/common/http.api.js'
	import myloading from '@/mycomponents/common/myLoading.vue'
	import infoBrick from '@/mycomponents/mime/infoBrick.vue'
	export default {
		components: {
			infoBrick,
			myloading
		},
		data() {
			return {
				currentTab: 0,
				tabList: [{
						name: '全部'
					},
					// {
					// 	name: '待审核'
					// },
					{
						name: '待参加'
					},
					{
						name: '待支付'
					},
				],
				pageNums: [1, 1, 1],
				allList: [], //全部
				waitList: [], //待审核
				attendList: [], //待参加
				payList: [], //待支付
				commonReqData: {},
				loading: true
			};
		},
		methods: {
			tabChange(index) {
				this.currentTab = index
				if (index == 0 && this.allList.length == 0) {
					this.chooseReq()
				} else if (index == 1 && this.attendList.length == 0) {
					this.chooseReq()
				} else if (index == 2 && this.payList.length == 0) {
					this.chooseReq()
				}

			},
			chooseReq(isBottom) {
				this.loading = true
				this.setCommonReqData(isBottom)
				switch (this.currentTab) {
					//0 全部  1 待审核  2 待参加  3待支付
					case 0:
						this.req_orderAllByUser()
						return;
					case 1:
						this.req_OrderByUser()
						return;
					case 2:
						this.req_orderNoPayByUser()
						return
				}
			},
			setCommonReqData(isBottom) {
				let page = this.pageNums[this.currentTab]
				this.commonReqData = {
					PageNum: isBottom == true ? page++ : page,
					PageSize: 5,
					UserId: this.gUserid
				}
			},
			setResList(list) {
				this.loading = false
				uni.stopPullDownRefresh()
				if (list == null || list.length <= 0) {
					this.gmyToast('没有更多了')
					return
				}
				this.pageNums[this.currentTab]++
				switch (this.currentTab) {
					//0 全部  1 待审核  2 待参加  3待支付
					case 0:
						this.allList.push(...list)
						return;
					case 1:
						this.attendList.push(...list)
						return;
					case 2:
						this.payList.push(...list)
						return
				}
			},
			// 所有订单
			req_orderAllByUser() {
				let data = this.commonReqData;
				orderAllByUser(data).then(res => {
					if (res.code == 200) {
						this.setResList(res.data.orders)
					}
				})
			},
			// 待支付订单
			req_orderNoPayByUser() {
				let data = this.commonReqData;
				orderNoPayByUser(data).then(res => {
					if (res.code == 200) {
						this.setResList(res.data.orders)
					}
				})
			},
			// 待参加
			req_OrderByUser() {
				let data = this.commonReqData;
				OrderByUser(data).then(res => {
					if (res.code == 200) {
						this.setResList(res.data.orders)
					}
				})
			},
			// 初始化
			initLists() {
				this.pageNums = [1, 1, 1]
				this.allList = [] //全部
				this.waitList = [] //待审核
				this.attendList = [] //待参加
				this.payList = [] //待支付
			}
		},
		onReachBottom() {
			this.chooseReq(true)
		},
		created() {
			this.chooseReq()
		},
		onPullDownRefresh() {
			this.initLists()
			this.chooseReq()
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		box-sizing: border-box;
		padding: 0rpx 20rpx;
		padding-bottom: 10rpx;
		background: #fff;
	}

	.core_box {
		box-sizing: border-box;
		padding: 20rpx;

		.brick_box {
			box-sizing: border-box;
			border-radius: 20rpx;
			background: #fff;
			box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
		}
	}
</style>
