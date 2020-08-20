<template>
	<view class="wrapper">
		<view class="header">
			<u-tabs :list="tabList" :is-scroll="false" :current="curTab" @change="tabChange" bar-width="100" active-color="#1D3156"></u-tabs>
		</view>
		<view class="core_box">
				<view class="search" @click="toSearchPage">
				<uni-icons type="search" color="#C5C9D2" size="20"></uni-icons>
				<view class="placement">搜你想搜的~</view>
			</view>
			<view v-if="curTab==0">
				<schoolInside :updata="infoList" ref="campus"></schoolInside>
				<!-- <schoolInside></schoolInside> -->
			</view>
			<view v-if="curTab==1">
				<xioaXixi :updata="infoList" ref="xiaoxi"></xioaXixi>
			</view>
			<view v-if="curTab==2">
				<schoolOutside :updata="infoList" ref="outside"></schoolOutside>
			</view>
			<myloading :loading="loading"></myloading>
		</view>
	</view>
</template>

<script>
	import {
		activitysByCondition
	} from '@/common/http.api.js'
	import xioaXixi from '@/mycomponents/information/indexPages/xixi.vue'
	import schoolInside from '@/mycomponents/information/indexPages/schoolInside.vue'
	import schoolOutside from '@/mycomponents/information/indexPages/schoolOutside.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import myloading from '@/mycomponents/common/myLoading.vue'
	export default {
		components: {
			xioaXixi,
			uniIcons,
			schoolInside,
			schoolOutside,
			myloading
		},
		data() {
			return {
				loading: false,
				curTab: 0,
				tabList: [{
						name: '校内'
					},
					{
						name: '校析析',
					},
					{
						name: '校外',
					},
				],
				infoList: [],
				refCont: ''
			}
		},
		methods: {
			tabChange(type) {
				this.curTab = type
			},
			toSearchPage() {
				uni.navigateTo({
					url: '/findFriend/searchPage'
				})
			},
			req_activitysByCondition(isReachBottom) {
				this.loading = true
				let myPageNum = 1
				let data = {
					PageNum: isReachBottom == true ? myPageNum++ : myPageNum,
					PageSize: 5,
					ActivityType: this.curTab+1,
					Sort: this.curOrderTab,
					Type: this.refCont.Type,
					Time: this.refCont.Time,
				}
				activitysByCondition(data).then(res => {
					if (res.code == 200) {
						this.loading = false
						if (res.data.activitys && res.data.activitys.length > 0) {
							this.infoList.push(...res.data.activitys)
							this.pageNum++
						} else {
							this.gmyToast('没有更多了')
						}
					}
				})
			},
			async isUpdata(){
				this.isRef()
				this.infoList = []
				await this.req_activitysByCondition();
				console.log(this.infoList)
				uni.stopPullDownRefresh();
			},
			isRef(){
				switch (this.curTab) {
					case 0:
						this.refCont = this.$refs.campus.tabData
						return
					case 1:
						this.refCont = this.$refs.xiaoxi.tabData
						return
					case 2:
						this.refCont = this.$refs.outside.tabData
						return
				}
			}
		},
		
		onPullDownRefresh(){
			this.isUpdata()
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		padding-bottom: 5rpx;
		background: #fff;
	}

	.core_box {
		box-sizing: border-box;
		padding: 20rpx;

	}

	.search {
		width: 100%;
		border-radius: 40rpx;
		background: #fff;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding-left: 30rpx;
		padding-top: 6rpx;
		padding-bottom: 6rpx;
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);

		.placement {
			margin-left: 6rpx;
			font-size: 28rpx;
			color: #C5C9D2;
		}
	}

	.swiper {
		border-radius: 20rpx;
		overflow: hidden;
		margin-top: 20rpx;

		.swiper-item {
			width: 100%;
			height: 300rpx;
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

	.orderTabs {
		display: flex;
		margin-bottom: 20rpx;

		.tab {
			font-size: 20rpx;
			color: #6F7280;
			background: #F5F6FA;
			border-radius: 10rpx;
			padding: 6rpx 10rpx;
			margin-left: 30rpx;
		}

		.active {
			background: #617397;
			color: #fff;
		}
	}

	.filters {
		display: flex;
		justify-content: space-around;
		margin-bottom: 4rpx;
	}
</style>
