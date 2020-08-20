<template>
	<view>
		<u-popup mode="top" border-radius="29" v-model="cityShow">
			<cityPanel :fatherAcive="cityChoose" @closeCity="handleCityEvent"></cityPanel>
		</u-popup>
		<u-popup mode="top" v-model="showClassify">
			<classifyCom :norActive.sync="tabNameArr.typeActive" @typeIdx="typeTypeChange"></classifyCom>
		</u-popup>
		<view class="header_block">
		<!-- 	<view class="search" @click="toSearchPage">
				<uni-icons type="search" color="#C5C9D2" size="20"></uni-icons>
				<view class="placement">搜你想搜的~</view>
			</view> -->
			<view class="header">
				<view @click="showCityEvent">
					<arrBlockPure :title="tabNameArr.city"></arrBlockPure>
				</view>
				<view @click="showClassifyEvent">
					<arrBlockPure :title="tabNameArr.type"></arrBlockPure>
				</view>
				<newArrowBlock @activeId="stateTypeChange" @input="singleSelect" :value="showList.state_show" keyName="state_show"
				 :arr="stateList"></newArrowBlock>
				<newArrowBlock @activeId="timeTypeChange" @input="singleSelect" :value="showList.time_show" keyName="time_show"
				 :arr="timeList"></newArrowBlock>
				<!-- 				<arrowBlock :arr="stateList"></arrowBlock>
				<arrowBlock :arr="timeList" titleUnchange="发布时间"></arrowBlock> -->
			</view>
		</view>
		<view class="bottom_part">
			<view class="friend_box" v-for="(item,idx) in friendList" :key="idx">
				<FrindBlock :udata="item"></FrindBlock>
			</view>
			<myloading :loading="loading"></myloading>
		</view>
		<outSideRound @roundEvent="toPublish"></outSideRound>
	</view>
</template>

<script>
	import {
		fposts,
	} from '@/common/http.api.js'
	import classifyCom from '@/mycomponents/findFriend/classify/classifyCom.vue'
	import newArrowBlock from '@/mycomponents/information/newArrowBlock.vue'
	import arrBlockPure from '@/mycomponents/information/arrowBlockPure.vue'
	import FrindBlock from '@/mycomponents/circle/findFriend.vue'
	import outSideRound from '@/mycomponents/common/outSideRound.vue'
	import cityPanel from '@/mycomponents/information/cityPanel.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import myloading from '@/mycomponents/common/myLoading.vue'
	import {
		state,
		time
	} from '@/mycomponents/findFriend/data/dropDownLists.js'
	export default {
		components: {
			myloading,
			classifyCom,
			newArrowBlock,
			FrindBlock,
			outSideRound,
			arrBlockPure,
			cityPanel,
			uniPopup
		},
		data() {
			return {
				loading: false,
				pageIdx: 1,
				showClassify: false,
				stateList: state,
				timeList: time,
				cityShow: false,
				friendList: [],
				showList: {
					state_show: false,
					time_show: false,
				},
				tabData: {
					time: 0,
					state: 2,
					type: 0
				},
				tabNameArr: {
					typeActive: 0,
					city: '全国',
					type: '全类型'
				},
				cityChoose: '' //控制citypanel选中样式
			};
		},
		methods: {
			singleSelect(key) {
				let arr = {}
				for (let i in this.showList) {
					arr[i] = false
				}
				arr[key] = !this.showList[key]
				this.showList = arr
			},
			// 城市选中
			handleCityEvent(item) {
				this.cityChoose = item.val
				this.tabNameArr.city = item.name
				this.cityShow = false
				this.initFpost(true)
			},
			// 寻伴
			req_fposts(isBottom) {
				this.loading = true
				let myPageIdx = this.pageIdx
				let data = {
					PageNum: isBottom == true ? myPageIdx++ : myPageIdx,
					PageSize: 10,
					// City: '全国',
					City: this.tabNameArr.city,
					Time: this.tabData.time,
					State: this.tabData.state,
					Type: this.tabData.type
				}
				// console.log(data);
				fposts(data).then(res => {
					if (res.code == 200) {
						this.loading = false
						// console.log(this.loading)
						if (res.data.posts && res.data.posts.length > 0) {
							this.friendList.push(...res.data.posts)
							this.pageIdx++
						} else {
							uni.showToast({
								title: '没有更多了',
								icon: 'none',
								duration: 800
							})
						}
					}
				})
			},
			// 时间筛选
			timeTypeChange(idx) {
				this.tabData.time = this.timeList[idx].val
				this.initFpost(true)
			},
			// 状态筛选
			stateTypeChange(idx) {
				// console.log(this.stateList[idx].val)
				this.tabData.state = this.stateList[idx].val
				this.initFpost(true)
			},
			// 类型筛选
			typeTypeChange(item) {
				this.tabData.type = item.Id;
				this.tabNameArr.type = item.label
				this.showClassify = false
				this.initFpost(true)
			},
			initFpost(isreLoad) {
				this.pageIdx = 1;
				this.friendList = []
				if (isreLoad && isreLoad == true) {
					this.req_fposts()
				}
			},
			// 跳转到新增寻伴
			toPublish() {
				if (this.$store.state.gAuth == 0) {
					this.gmyToast('请完成认证')
					return
				}
				uni.navigateTo({
					url: '/findFriend/addFriendMsg'
				})
			},
			// 关闭所有下拉
			closeAll() {
				for (let i in this.showList) {
					this.showList[i] = false
				}
			},
			showCityEvent() {
				this.cityShow = true;
				this.closeAll()
			},
			showClassifyEvent() {
				this.showClassify = true;
				this.closeAll()
			},
			toSearchPage() {
				uni.navigateTo({
					url: '/findFriend/searchPage'
				})
			},
			async upData(){
				this.pageIdx = 1;
				this.friendList = [];
				await this.req_fposts();
				uni.stopPullDownRefresh();
			}
		},
		onShow() {
			// this.pageIdx = 1
			this.initFpost()
			this.req_fposts()
		},
		onReachBottom() {
			this.req_fposts(true)
		},
		onPullDownRefresh() {
			this.upData();
		}
	}
</script>

<style lang="scss" scoped>
	.bottom_part {
		box-sizing: border-box;
		padding: 20rpx;
		padding-bottom: 222rpx;

		.friend_box {
			border-radius: 20rpx;
			background: #fff;
			margin-bottom: 20rpx;
			box-shadow: 0rpx 10rpx 20rpx 0rpx rgba(0, 0, 0, 0.1);
		}
	}

	.header_block {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background: #fff;
		padding: 20rpx 40rpx;

		.search {
			width: 670rpx;
			border-radius: 40rpx;
			background: #F5F6FA;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding-left: 30rpx;
			padding-top: 6rpx;
			padding-bottom: 6rpx;

			.placement {
				margin-left: 6rpx;
				font-size: 28rpx;
				color: #C5C9D2;
			}
		}

		.header {
			display: flex;
			justify-content: space-around;
			margin-top: 36rpx;
		}
	}
</style>
