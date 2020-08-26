<template>
	<view>
		<u-popup mode="top" border-radius="29" v-model="cityShow">
			<cityPanel :fatherAcive="cityChoose" @closeCity="handleCityEvent"></cityPanel>
		</u-popup>
		<swiper v-if="showlist.length>0" class="swiper" indicator-dots autoplay interval="4000" duration="500">
			<swiper-item v-for="(item,idx) in showlist" :key="idx">
				<!-- <view class="swiper-item"> -->
				<image :src="item" class="swiper-item" mode="aspectFill"></image>
				<!-- </view> -->
			</swiper-item>
		</swiper>
		<view class="order_box">
			<view class="filters">
				<view @click="cityShowEvent">
					<arrBlockPure :title="tabData.City"></arrBlockPure>
				</view>
				<newArrowBlock v-if="typeList.length>0" @activeId="changeType" @input="singleSelect" :value="showList.type_show"
				 keyName="type_show" :arr="typeList"></newArrowBlock>
				<newArrowBlock @activeId="changeTime" @input="singleSelect" :value="showList.time_show" keyName="time_show" :arr="timeList"></newArrowBlock>
				<newArrowBlock @activeId="changePay" @input="singleSelect" :value="showList.price_show" keyName="price_show" :arr="priceList"></newArrowBlock>
			</view>
			<orderTabs></orderTabs>
			<view class="ticket_box" v-for="(item,idx) in infoList" :key="idx">
				<orderTicket :infoData="item"></orderTicket>
			</view>
			<myloading :loading="loading"></myloading>
		</view>
		<!-- </view> -->
	</view>
</template>

<script>
	import {
		activitysByCondition
	} from '@/common/http.api.js'
	import {
		publicImgPath
	} from '@/common/interface.js'
	import mixin from './infoMixin.js'
	import myloading from '@/mycomponents/common/myLoading.vue'
	import newArrowBlock from '@/mycomponents/information/newArrowBlock.vue'
	import arrBlockPure from '@/mycomponents/information/arrowBlockPure.vue'
	import orderTabs from '@/mycomponents/information/orderTabs.vue'
	import orderTicket from '@/mycomponents/mime/msg.vue'
	import cityPanel from '@/mycomponents/information/cityPanel.vue'
	import {
		price,
		type,
		time
	} from '@/mycomponents/information/data/arrowLists.js'
	export default {
		props: ['updata'],
		mixins: [mixin],
		components: {
			myloading,
			newArrowBlock,
			orderTicket,
			arrBlockPure,
			orderTabs,
			cityPanel
		},
		data() {
			return {
				timeList: time,
				priceList: price,
				cityShow: false,
				showList: {
					type_show: false,
					time_show: false,
					price_show: false
				},
				tabData: {
					Time: 0,
					Type: 1,
					City: '全国',
					Pay: 0
				},
				cityChoose: '' //控制citypanel选中样式
			}
		},
		methods: {
			handleCityEvent(item) {
				this.cityChoose = item.val
				this.tabData.City = item.name
				this.cityShow = false
				this.initList()
				this.req_activitysByCondition()
			},
			singleSelect(key) {
				let arr = {}
				for (let i in this.showList) {
					arr[i] = false
				}
				arr[key] = !this.showList[key]
				this.showList = arr
			},
			cityShowEvent() {
				for (let i in this.showList) {
					this.showList[i] = false
				}
				this.cityShow = true
			},
			// 根据条件获取资讯
			req_activitysByCondition(isReachBottom) {
				this.loading = true
				let myPageNum = this.pageNum
				let data = {
					PageNum: isReachBottom == true ? myPageNum++ : myPageNum,
					PageSize: 5,
					City: this.tabData.City,
					Type: this.tabData.Type,
					Time: this.tabData.Time,
					ActivityType: 3 //3校外
				}
				activitysByCondition(data).then(res => {
					this.loading = false
					if (res.code == 200) {
						if (res.data.activitys && res.data.activitys.length > 0) {
							this.infoList.push(...res.data.activitys)
							this.pageNum++
						} else {
							this.gmyToast('没有更多了')
						}
					}
				})
			},

		},
		created() {
			this.req_getImg(4)
		},
		watch:{
			updata(val){
				this.infoList = val;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		border-radius: 20rpx;
		overflow: hidden;
		margin-top: 20rpx;

		.swiper-item {
			width: 100%;
			height: 100%;
			background: #ccc;
			color: #fff;
			text-align: center;
		}
	}

	.order_box {
		border-radius: 20rpx;
		background: #fff;
		padding: 16rpx 40rpx;
		margin-top: 30rpx;

		.ticket_box {
			border-top: solid 4rpx #F5F6FA;
			padding-top: 24rpx;
		}
	}

	.filters {
		display: flex;
		justify-content: space-around;
		margin-bottom: 20rpx;
	}
</style>
