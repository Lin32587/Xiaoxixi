<template>
	<view class="wrapper">
		<view class="bg_img"></view>
		<view class="top_box" v-if="userData.Id">
			<view class="card_box">
				<image :src="userData.UserImage" class="photo"></image>
				<!-- <view class="photo"></view> -->
				<!-- 	<view class="accusation">!
				</view> -->
				<view class="accusation" v-if="userData.Id!=gUserid">
					<accusationBtn @accusationEvent="accusationEvent"></accusationBtn>
				</view>
				<view class="accusation" v-else></view>
				<view class="clear"></view>
				<view class="nickName">{{userData.username}}</view>
				<view class="realName">{{userData.name}}</view>
				<view class="Round_box">
					<Rounds></Rounds>
				</view>
				<view class="saying" v-if="userData.signature">{{userData.signature}}</view>
				<view class="school_box">
					<view class="s_block" v-if="userData.school">
						{{userData.school}}
					</view>
					<view class="s_block" v-if="userData.college">
						{{userData.college}}
					</view>
					<view class="s_block" v-if="userData.major">
						{{userData.major}}
					</view>
				</view>
			</view>
			<!-- end -->
			<view class="bottom_box">
				<view class="tab">
					<view class="tab_item" @click="tabChange(0)" :class="activeType==0?'active':''" style="margin-right: 84rpx;">圈子</view>
					<view class="tab_item" @click="tabChange(1)" :class="activeType==1?'active':''">寻伴</view>
				</view>
				<view class="circle_box" v-if="activeType==0">
					<view class="saying_style" v-for="(item,idx) in circleList" :key="idx">
						<ownSaying :udata="item" />
					</view>
				</view>
				<view class="friend_box" v-if="activeType==1">
					<view class="fiend_style" v-for="(item,idx) in friendList" :key="idx">
						<findFriend :udata="item"></findFriend>
					</view>
				</view>
				<myloading :loading="loading"></myloading>
			</view>
		</view>
		<!-- top end -->
		<!-- btn Group -->
		<view class="btn_group" v-if="isShowBottom==true">
			<view class="baseBtn">私信</view>
			<view class="baseBtn follow" v-if="isfollow==false" @click="req_userfocus">
				<!-- <uni-icons type="checkmarkempty" color="#fff" size="18"></uni-icons> -->
				<span>关注</span>
			</view>
			<view class="baseBtn follow" v-else @click="req_removeUerByFocus">
				<uni-icons type="checkmarkempty" color="#fff" size="18"></uni-icons>
				<span>关注</span>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserPostById,
		getfpostByid,
		userfocus,
		uerByFocus, //判断有无关注
		removeUerByFocus //取消关注
		// getUser
	} from '@/common/http.api.js'
	import {
		getUser
	} from '@/common/interface.js'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import Rounds from '../../mycomponents/common/round.vue'
	import ownSaying from '@/mycomponents/circle/Saying.vue'
	import findFriend from '@/mycomponents/circle/findFriend.vue'
	import accusationBtn from '@/mycomponents/common/accusation.vue'
	import myloading from '@/mycomponents/common/myLoading.vue'
	export default {
		components: {
			myloading,
			Rounds,
			ownSaying,
			findFriend,
			accusationBtn
		},
		data() {
			return {
				id: 0,
				pageIndex: 1,
				activeType: 0, //0圈子  1寻伴
				isfollow: false,
				schoolList: [{
						name: '武汉大学'
					},
					{
						name: '计算机与技术学院'
					},
					{
						name: '软件工程系'
					},
				],
				listReqData: {},
				circleList: [],
				friendList: [],
				pageIdxs: [1, 1],
				userData: {},
				loading: false,
				isShowBottom: false
			}
		},
		methods: {
			// 举报
			accusationEvent() {
				let data = {
					ReportedId: this.userData.Id
				}
				data = JSON.stringify(data)
				let title = this.userData.username
				// uni.navigateTo({
				// 	url: '/mine/accusationPage?data='+data+'&'
				// })
				this.$u.route('/mine/accusationPage', {
					data: data,
					title: title
				})
			},
			tabChange(idx) {
				this.activeType = idx;
				if (idx == 0 && this.circleList.length == 0) {
					this.chooseTabreq()
				} else if (idx == 1 && this.friendList.length == 0) {
					this.chooseTabreq()
				}
			},
			chooseTabreq(isReachBottom) {
				this.commonReqdata(isReachBottom)
				// 0:圈子  1:寻伴
				switch (this.activeType) {
					case 0:
						this.req_getUserPostById()
						return
					case 1:
						this.req_getfpostByid()
						return
				}
			},
			commonReqdata(isReachBottom) {
				this.loading = true
				let curPageNum = this.pageIdxs[this.activeType]
				let data = {
					UserId: this.id,
					PageNum: curPageNum,
					PageSize: 5,
				}
				this.listReqData = data
			},
			// 处理数据返回
			handleResponse(list) {
				this.loading = false
				if (list && list.length > 0) {
					this.pageIdxs[this.activeType]++
					switch (this.activeType) {
						case 0:
							this.circleList.push(...list)
							return
						case 1:
							this.friendList.push(...list)
							return
					}
				} else {
					uni.showToast({
						icon: 'none',
						duration: 500,
						title: '没有更多了'
					})
				}
			},
			// 圈子列表
			req_getUserPostById() {
				let data = this.listReqData;
				getUserPostById(data).then(res => {
					if (res.code == 200) {
						this.handleResponse(res.data.posts)
					}
				})
			},
			// 寻伴列表
			req_getfpostByid() {
				let data = this.listReqData;
				getfpostByid(data).then(res => {
					if (res.code == 200) {
						this.handleResponse(res.data.posts)
					}
				})
			},
			// 获取用户
			req_getUser() {
				let that = this
				uni.request({
					data: {
						Id: this.id
					},
					header: {
						Authorization: that.gOpenid
					},
					method: 'GET',
					url: getUser,
					success(res) {
						that.userData = res.data.data
						if (res.data.data.Id == that.gUserid) {
							that.isShowBottom = false
						} else {
							that.isShowBottom = true
						}
					},
					fail(e) {
						console.log('失败')
					}
				})
			},
			// 判断有无关注
			req_uerByFocus() {
				let data = {
					UserId: this.gUserid,
					AuthorId: this.id,
				}
				uerByFocus(data).then(res => {
					if (res.code == 200) {
						this.isfollow = res.data.Focus.State == 0 ? false : true
					}
				})
			},
			// 添加关注
			req_userfocus() {
				let data = {
					followerId: parseInt(this.id),
					userId: this.gUserid
				}
				userfocus(data).then(res => {
					if (res.code == 200) {
						this.isfollow = true
					}
				})
			},
			// 取消关注
			req_removeUerByFocus() {
				let data = {
					followerId: parseInt(this.id),
					userId: this.gUserid
				}
				removeUerByFocus(data).then(res => {
					if (res.code == 200) {
						this.isfollow = false
					}
				})
			}
		},
		onLoad(e) {
			this.id = e.id
			this.req_getUser()
			this.chooseTabreq()
			this.req_uerByFocus()
		},
		onReachBottom() {
			this.chooseTabreq(true)
		}
	}
</script>
<style>
	page {
		height: 100% !important;
		background: #F0F1F5;
	}
</style>
<style lang="scss" scoped>
	.clear {
		clear: both;
	}

	.bg_img {
		width: 752rpx;
		height: 470rpx;
		background: #ccc;
	}

	.wrapper {
		position: relative;
	}

	.top_box {
		position: absolute;
		top: 340rpx;
		left: 20rpx;
		width: calc(100% - 40rpx);
	}

	.card_box {
		width: 100%;
		position: relative;
		box-sizing: border-box;
		padding: 40rpx;
		border-radius: 20rpx;
		background: #fff;

		.photo {
			border-radius: 50%;
			width: 120rpx;
			height: 120rpx;
			background: #ccc;
			border: solid #fff 10rpx;
			position: absolute;
			top: -60rpx;
			left: 50%;
			transform: translate(-50%, 0);
		}

		.accusation {
			border-radius: 50%;
			width: 40rpx;
			height: 40rpx;
			color: #6E7280;
			float: right;
		}

		.nickName {
			color: #393D46;
			font-size: 24rpx;
			text-align: center;
		}

		.realName {
			color: #393D46;
			font-size: 36rpx;
			text-align: center;
		}

		.Round_box {
			@include xCenter;
			margin-top: 16rpx;
		}

		.saying {
			text-align: center;
			margin-top: 24rpx;
			color: #999CAA;
			font-size: 24rpx;

		}

		.school_box {
			width: 630rpx;
			margin: 0 auto;
			border-radius: 20rpx;
			overflow: hidden;
			margin-top: 22rpx;

			.s_block {
				width: 100%;
				color: #999CAA;
				background: #F5F6FA 100%;
				text-align: center;
				height: (160rpx / 3);
				@include xCenter;
				font-size: 20rpx;
				font-weight: bold;
			}
		}

	}

	.bottom_box {
		border-radius: 20rpx;
		background: #fff;
		padding-top: 24rpx;
		padding-bottom: 30rpx;
		margin-bottom: 200rpx;
		box-sizing: border-box;
		margin-top: 20rpx;

		.tab {
			display: flex;
			justify-content: center;
			box-sizing: border-box;
			padding-bottom: 26rpx;

			.tab_item {
				color: #C5C9D2;
				font-size: 28rpx;
				font-weight: bold;
				box-sizing: box-sizing;
				padding-bottom: 4rpx;
				border-bottom: solid 4rpx #fff;

			}

			.active {
				border-bottom: solid 4rpx #1D3156;
				color: #1D3156;

			}
		}

		.circle_box {
			.saying_style {
				border-top: solid 6rpx #f5f6fa;
			}
		}

		.friend_box {
			.fiend_style {
				border-top: solid 6rpx #f5f6fa;

			}
		}
	}

	.btn_group {
		position: fixed;
		bottom: 58rpx;
		width: 100%;
		display: flex;
		justify-content: center;

		.baseBtn {
			width: 300rpx;
			height: 80rpx;
			border-radius: 44rpx;
			@include xCenter;
			color: #fff;
			background: #617397;
		}

		.follow {
			background: #1D3156;
			margin-left: 28rpx;
			display: flex;
		}

	}
</style>
