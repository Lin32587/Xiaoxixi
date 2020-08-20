<template>
	<view class="wrapper">
		<view class="tabs">
			<u-tabs :list="tabList" :is-scroll="false" :current="curTab" @change="changeTab" bar-width="72" active-color="#1D3156"></u-tabs>
		</view>
		<view class="bottom_core">
			<view class="circle_box" v-if="curTab==0">
				<Saying @toUserInfo="circleToUserInfo" v-for="(item,idx) in cirleList" :udata="item" :key="idx"></Saying>
			</view>
			<view class="friend_box" v-if="curTab==1">
				<view class="fr_block" v-for="(item,fidx) in friendList" :key="fidx">
					<Frind :udata="item"></Frind>
				</view>
			</view>
			<view class="msg_box" v-if="curTab==2">
				<Msg v-for="(item,midx) in msgList" :key="midx" :infoData="item" />
			</view>
			<myloading :loading="loading"></myloading>
		</view>
	</view>
</template>

<script>
	import myloading from '@/mycomponents/common/myLoading.vue'
	import {
		myToast
	} from '@/common/util.js'
	import {
		collectPost,
		collectFPost,
		infoactivitys
	} from '@/common/http.api.js'
	import Saying from '@/mycomponents/circle/Saying.vue'
	import Frind from '@/mycomponents/circle/findFriend.vue'
	import Msg from '@/mycomponents/mime/msg.vue'
	export default {
		components: {
			myloading,
			Saying,
			Frind,
			Msg
		},
		data() {
			return {
				loading: false,
				curTab: 0,
				tabList: [{
						name: '圈子'
					},
					{
						name: '寻伴'
					},
					{
						name: '资讯'
					},
				],
				cirleList: [],
				friendList: [],
				msgList: [],
				commonReqData: {},
				pageNums: [1, 1, 1]
			};
		},
		computed: {
			// gUserid() {
			// 	return 26
			// }
		},
		methods: {
			changeTab(idx) {
				this.curTab = idx;
				if (this.curTab == 0 && this.cirleList.length == 0) {
					this.chooseReqList()
				} else if (this.curTab == 1 && this.friendList.length == 0) {
					this.chooseReqList()
				} else if (this.curTab == 2 && this.msgList.length == 0) {
					this.chooseReqList()
				}
			},
			chooseReqList(isBottom) {
				this.getCommonData(isBottom)
				switch (this.curTab) {
					case 0:
						this.req_collectPost()
						return
					case 1:
						this.req_collectFPost()
						return
					case 2:
						this.req_infoactivitys()
						return
				}
			},
			handleResList(list) {
				this.loading = false
				if (list && list.length > 0) {
					switch (this.curTab) {
						case 0:
							this.cirleList.push(...list)
							return
						case 1:
							this.friendList.push(...list)
							return
						case 2:
							this.msgList.push(...list)
							return
					}
				} else {
					myToast('没有更多了')
				}
			},
			// 处理请求数据
			getCommonData(isBottom) {
				this.loading = true
				let pageNum = this.pageNums[this.curTab]
				let data = {
					UserId: this.gUserid,
					PageNum: isBottom == true ? pageNum++ : pageNum,
					PageSize: 10
				}
				this.commonReqData = data
			},
			// 获取圈子收藏
			req_collectPost() {
				let data = this.commonReqData
				collectPost(data).then(res => {
					if (res.code == 200) {
						// console.log(res)
						// this.cirleList = res.data.posts;
						this.handleResList(res.data.posts)
					}
				})
			},
			// 获取寻伴数据
			req_collectFPost() {
				let data = this.commonReqData;
				collectFPost(data).then(res => {
					if (res.code == 200) {
						// this.friendList.push(...res.data.posts)
						this.handleResList(res.data.posts)
					}
				})
			},
			// 获取资讯收藏
			req_infoactivitys() {
				console.log('执行资讯', this.curTab)
				let data = this.commonReqData;
				infoactivitys(data).then(res => {
					if (res.code == 200) {
						this.handleResList(res.data.activitys)
					}
				})
			},
			initAll() {
				this.cirleList = []
				this.friendList = []
				this.msgList = []
			},
			circleToUserInfo(type, userid) {
				uni.navigateTo({
					url: '/pages/circle/userInfo?id=' + userid
				})
			}
		},
		onShow() {
			this.initAll()
			this.chooseReqList()
		}
	}
</script>

<style lang="scss" scoped>
	.tabs {
		z-index: 20;
		height: 88rpx;
		align-items: center;
		background: #fff;
		position: sticky;
		top: 0px;
		box-shadow: 0rpx 10rpx 20rpx 0rpx rgba(0, 0, 0, 0.05);
	}

	.bottom_core {
		width: 100%;
		padding: 20rpx;
		padding-bottom: 190rpx;
		box-sizing: border-box;

		.friend_box {
			.fr_block {
				background: #fff;
				border-radius: 20rpx;
				margin-bottom: 20rpx;
			}
		}

		.msg_box {
			box-sizing: border-box;
			padding: 0 40rpx;
			background: #fff;
			border-radius: 20rpx;
			min-height: 20rpx;

		}
	}
</style>
