<template>
	<view class="circlewrapper">
		<view class="tab">
			<u-tabs :list="tabList" :is-scroll="false" :gutter="80" @change="change" active-color="#1D3156" inactive-color="#A1B4D2"
			 font-size="30" bar-width="56" gutter="40" :current="currentTab"></u-tabs>
		</view>
		<view class="say_box">
			<view v-if="currentTab==0">
				<SayingBlock :isDetailSaying="false" :udata="item" @toUserInfo="toUserInfo" v-for="(item,idx) in focusList" :key="idx" />
			</view>
			<view v-if="currentTab==1">
				<SayingBlock :isDetailSaying="false" :udata="item" @toUserInfo="toUserInfo" v-for="(item,idx) in allList" :key="idx" />
			</view>
			<myloading :loading="loading"></myloading>
			<!-- <loadMore :type="loading"></loadMore> -->
		</view>
		<outSideRound @roundEvent="toCircleAdd" />
	</view>
</template>

<script>
	import {
		setUserData
	} from '@/common/util.js'
	import myloading from '@/mycomponents/common/myLoading.vue'
	import loadMore from '@/mycomponents/common/myLoadMore.vue'
	import SayingBlock from '@/mycomponents/circle/Saying.vue'
	import outSideRound from '@/mycomponents/common/outSideRound.vue'
	import {
		posts,
		postsByFoucs
	} from '@/common/http.api.js'
	import {
		loginUrl
	} from '@/common/interface.js'
	export default {
		components: {
			SayingBlock,
			outSideRound,
			myloading,
			loadMore
		},
		data() {
			return {
				loading: false,
				currentTab: 1, //0：关注  1：全部
				tabList: [{
						name: '关注'
					},
					{
						name: '全部'
					},
				],
				focusList: [],
				allList: [],
				pageNums: [1, 1],
			}
		},
		methods: {
			toCircleAdd() {
				if (this.$store.state.gAuth == 0) {
					this.gmyToast('请完成认证')
					return
				}
				// console.log(this.gAuth)
				uni.navigateTo({
					url: '/pages/circle/circleAdd'
				})
			},
			toUserInfo(type, userid) {
				if (type != 1) {
					uni.navigateTo({
						url: '/pages/circle/userInfo?id=' + userid
					})
				}
			},
			change(index) {
				this.currentTab = index;
				// this.sayingList = [];
				if (index == 0 && this.focusList.length == 0) {
					this.chooseReq()
					// this.initFocusList()
					return
				} else if (index == 1 && this.allList.length == 0) {
					this.chooseReq()
					return
				}

			},
			chooseReq(isReachBottom) {
				// this.loading = true
				switch (this.currentTab) {
					case 0:
						this.req_postsByFoucs(isReachBottom)
						return
					case 1:
						this.req_post(isReachBottom)
						return
				}
			},
			// 获取全部帖子
			req_post(isReachBottom) {
				this.loading = true
				let curPage = this.pageNums[this.currentTab]
				let PageNum = isReachBottom ? curPage + 1 : curPage
				posts({
					PageNum: PageNum,
					PageSize: 5,
					UserId: this.gUserid
				}).then(res => {
					this.loading = false
					if (res.code == 200) {
						this.loading = false
						if (res.data.posts != null) {
							this.pageNums[this.currentTab] = res.data.pageNum
							this.allList.push(...res.data.posts)
						} else {
							this.loading = false
						}
					}
				})

			},
			// 获取关注帖子
			req_postsByFoucs(isReachBottom) {
				this.loading = true
				let curPage = this.pageNums[this.currentTab]
				let PageNum = isReachBottom ? curPage + 1 : curPage
				let data = {
					PageNum: PageNum,
					PageSize: 5,
					UserId: this.gUserid
				}
				postsByFoucs(data).then(res => {
					this.loading = false
					if (res.code == 200) {
						if (res.data.posts != null) {
							this.focusList.push(...res.data.posts)
							this.pageNums[this.currentTab] = res.data.pageNum
						} else {
							this.loading = false
						}
					}
				})
			},
			// 初始化全部列表
			async initAllList() {
				this.allList = []
				this.pageNums[1] = 1
				await this.req_post()
				uni.stopPullDownRefresh()
			},
			// 初始化关注列表
			async initFocusList() {
				this.focusList = []
				this.pageNums[1] = 1
				await this.req_postsByFoucs()
				uni.stopPullDownRefresh()
			},
			// 登录
			req_login(code) {
				let that = this
				console.log('guserid', this.gUserid)
				uni.request({
					url: loginUrl,
					method: 'POST',
					dataType: 'json',
					data: {
						// userImage: data.userImage,
						// username: data.username,
						openId: code
					},
					success(e) {
						console.log('登录', e)
						if (e.data.code == 200) {
							console.log(e.data.data.Id)
							if (e.data.data.ShowStatus == 1) {
								getApp().globalData.islogin = e.data.data.Verify == 1 ? true : false
								setUserData(e.data.data, that)
								that.initAllList()
							} else {
								this.gmyToast('登录失败')
							}
						}
					},
					fail(e) {
						console.log('登录失败', e)
					}
				})
			}

		},
		onShow() {
			let that = this
			if (getApp().globalData.islogin == false) {
				wx.login({
					success(res) {
						let code = res.code
						console.log('code', code)
						that.req_login(code)
					}
				})
				return
			}
			//this.currentTab = 1
			this.initAllList()
			// this.chooseReq()
		},
		onReachBottom() {
			this.chooseReq(true)
		},
		onPullDownRefresh() {
			switch (this.currentTab) {
				case 0:
					this.initFocusList()
					return
				case 1:
					this.initAllList()
					return
			}
		}
	}
</script>
<style lang="scss" scoped>
	.say_box {
		margin-top: 20rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
		padding-bottom: 20rpx;
	}

	.tab {
		box-sizing: border-box;
		padding: 0 240rpx;
		background: #fff;
		position: sticky;
		top: 0rpx;
		z-index: 200;
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
	}
</style>
