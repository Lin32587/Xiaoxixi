<template>
	<view class="wrapper">
		<view class="down"></view>
		<view class="top">
			<view class="user_box">

				<view class="ph" v-if="islogin==false">
					<u-icon name="account-fill" color="#ccc" size="60"></u-icon>
				</view>
				<image v-else class="ph_active" :src="userData.UserImage" @click="toEditPage"></image>
				<!-- 	<view class="ph" v-else @click="toEditPage">
					<u-icon name="account-fill" color="#ccc" size="60"></u-icon>
				</view> -->
				<view class="name" v-if="islogin==false">游客</view>
				<view class="name" v-else @click="toEditPage">{{userData.username}}</view>
				<!-- 		<view class="imgs" @click="toEditPage">
					<view class="i1"></view>
					<view class="i1 mlr"></view>
					<view class="i1"></view>
				</view> -->
				<view class="school" v-if="islogin==true">
					<view class="sname">{{userData.school}}</view>
					<view class="smajor">{{userData.major}}</view>
				</view>
				<view class="loginBox">
					<button class="loginBtn" v-if="islogin==false" open-type="getUserInfo" @getuserinfo="getUserInfo">点击授权</button>
				</view>
				<view class="mysection">
					<view class="block" :class="idx==1?'mlr':''" v-for="(item,idx) in sectionList" :key="item.name" @click="sectionFunc(item.name)">
						<view class="bname">{{item.name}}</view>
						<view class="bcount">{{item.count}}</view>
					</view>
				</view>
			</view>
			<view class="mt20">
				<Infos />
			</view>
			<view class="mt20">
				<Orders />
			</view>
			<view class="mt20">
				<PathList />
			</view>
			<view>
				<u-popup v-model="show" mode="center" border-radius="14" width="94%" :mask="true">
					<view class="matrix">
						<view class="matrix-text">
							<text>| 矩阵</text>
						</view>
						<view class="matrix-cont">
							<view class="matrix-cont-item" v-for="(item,idx) in matrixCont" :key='idx' @click="toPackge(item.url)">
								<image :src="item.img"></image>
								<text> {{item.text}} </text>
							</view>
						</view>
						<view><button size="mini" @click="show = false">确认</button></view>
					</view>
				</u-popup>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUser,
		loginUrl
	} from '@/common/interface.js'
	import {
		setUserData
	} from '@/common/util.js'
	import Infos from '@/mycomponents/mime/Infos.vue'
	import Orders from '@/mycomponents/mime/Orders.vue'
	import PathList from '@/mycomponents/mime/PathList.vue'
	export default {
		components: {
			Infos,
			Orders,
			PathList
		},
		data() {
			return {
				show: false,
				islogin: getApp().globalData.islogin,
				userData: {},
				sectionList: [{
						name: '签到',
						count: 0
					},
					{
						name: '析贝',
						count: 0
					},
					{
						name: '矩阵',
						count: 0
					},
				],
				matrixCont: [{
						img: "../../static/matrix/xRic.png",
						text: "X-RIC",
						url: "http://mp.weixin.qq.com/mp/homepage?__biz=MzU4MDYwNDE3Nw==&hid=11&sn=1b8611bb61406e88ca5a15c3d74dca46&scene=18#wechat_redirect"
					},
					{
						img: "../../static/matrix/xRic.png",
						text: "X-TALK",
						url: ""
					},
					{
						img: "../../static/matrix/fzth.png",
						text: "FTZH方舟同航",
						url: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU4MDYwNDE3Nw==#wechat_redirect）"
					}, {
						img: "../../static/matrix/xiaoxixi.png",
						text: "X-CAMPUS",
						url: ""
					},
					{
						img: "../../static/matrix/ostrichPlan.png",
						text: "鸵鸟计划",
						url: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU2Njc0NjE1MA==#wechat_redirect"
					},
					{
						img: "../../static/matrix/fzth.png",
						text: "X-EXPERT",
						url: ""
					}
				]
			}
		},
		methods: {
			sectionFunc(e) {
				switch (e) {
					case '签到':
						uni.showToast({
							icon: 'none',
							title: e + '将在后续开放',
						})
						return
					case '析贝':
						uni.showToast({
							icon: 'none',
							title: e + '将在后续开放',
						})
						return
					case '矩阵':
						this.show = true
						return
				}
			},
			toPackge(url) {
				uni.switchTab({
					url: url
				})
				console.log(url)
			},
			toEditPage() {
				uni.navigateTo({
					url: '/mine/infoEdit'
				})
			},
			getUser() {
				let that = this
				return new Promise((resolve,reject)=>{
					uni.request({
						url: getUser,
						header: {
							Authorization: that.gOpenid
						},
						data: {
							Id: that.gUserid
						},
						success(res) {
							resolve(res.data)
						}
					})
				})
			},
			req_getUser() {
				this.getUser().then(e => {
					let auth = e.data.Auth
					uni.setStorageSync('userAuth',auth)
					getApp().globalData.userAuth = auth
					this.$store.commit('upDateAuth', auth)
					if (e.code == 200) {
						this.userData = e.data
						this.islogin = true
					}
				})
			},
			getUserInfo(e) {
				let that = this
				uni.getUserInfo({
					success: (res) => {
						this.userInfo = res.userInfo;
						console.log(this.userInfo);
						wx.login({
							success(e) {
								let data = {
									userImage: res.userInfo.avatarUrl,
									username: res.userInfo.nickName,
									openId: e.code
								}
								that.req_login(data)
							}
						})

					},
					fail: () => {
						uni.showToast({
							title: '授权失败',
							icon: 'none',
							duration: 88
						})
					},
				})
			},
			req_login(data) {
				let that = this
				console.log('gOpenid', this.gOpenid)
				uni.request({
					url: loginUrl,
					method: 'POST',
					dataType: 'json',
					data: data,
					success(e) {
						console.log('登录', e)
						if (e.data.code == 200) {
							console.log(e.data.data.Id)
							if (e.data.data.ShowStatus == 1) {
								getApp().globalData.islogin = e.data.data.Verify == 1 ? true : false
								setUserData(e.data.data, that)
								that.req_getUser()
							} else {
								this.gmyToast('登录失败')
							}
						}
					},
					fail(e) {
						console.log('登录失败', e)
					}
				})
			},
		},
		onLoad() {
			this.sectionList[2].count = this.matrixCont.length
		},
		onShow() {
			if (getApp().globalData.islogin == true) {
				this.req_getUser()
				// this.getUserInfo()
			}
		}
	}
</script>
<style lang="scss" scoped>
	.mt20 {
		margin-top: 20rpx;
	}

	.mb50 {
		margin-bottom: 100rpx;
	}

	.wrapper {
		position: relative;
		height: 100%;
		box-sizing: border-box;
		// padding-bottom: 80rpx;

		.down {
			width: 100%;
			height: 100%;
			// background: #ccc;
		}

		.top {
			position: absolute;
			top: 170rpx;
			box-sizing: border-box;
			padding-left: 20rpx;
			padding-right: 20rpx;
			padding-bottom: 100rpx;
			width: 100%;
		}
	}

	.user_box {
		padding-top: 74rpx;
		width: 100%;
		background: #fff;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding-bottom: 46rpx;

		.ph {
			width: 120rpx;
			height: 120rpx;
			position: absolute;
			top: -60rpx;
			left: 50%;
			transform: translateX(-50%);
			// transform: translate(0, -50%);
			border-radius: 50%;
			background: #000;
			@include xCenter;
			border: solid 10rpx #fff
		}

		.ph_active {
			width: 120rpx;
			height: 120rpx;
			position: absolute;
			top: -60rpx;
			left: 50%;
			transform: translateX(-50%);
			// transform: translate(0, -50%);
			border-radius: 50%;
			@include xCenter;
			border: solid 10rpx #fff
		}

		.name {
			font-size: 36rpx;
			color: $xblue;
			text-align: center;
		}

		.imgs {
			@include xCenter;
			margin-top: 18rpx;

			.i1 {
				width: 28rpx;
				height: 28rpx;
				background: $xblue;
				border-radius: 50%;
			}

			.mlr {
				margin: 0 10rpx;
			}
		}

		.school {
			@include xCenter;
			margin-top: 18rpx;

			.sname {
				color: #999CAA;
				font-size: 28rpx;
				margin-right: 10rpx;
			}

			.smajor {
				color: #999CAA;
				font-size: 28rpx;
			}
		}

		.mysection {
			@include xCenter;
			margin-top: 50rpx;
			width: 100%;

			.block {
				@include xCenter;

				.bname {
					margin-right: 13rpx;
					font-size: 20rpx;
				}

				.bcount {
					color: #617397;
					font-weight: bold;
					font-size: 40rpx;
				}
			}

			.mlr {
				padding: 0 48rpx;
				margin: 0 62rpx;
				box-sizing: border-box;
				border-right: solid #F5F6FA 2rpx;
				border-left: solid #F5F6FA 2rpx;
			}
		}

	}

	.loginBox {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 20rpx;

		.loginBtn {
			width: 50%;
			box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
			overflow: visible;
		}
	}

	// 矩阵
	.matrix {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 700rpx;
		background-color: #ffffff;

		.matrix-cont {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap-reverse;
			justify-content: center;

			.matrix-cont-item {
				width: 205rpx;
				height: 190rpx;
				border-radius: 5px;
				text-align: center;
				margin-bottom: 20rpx;

				image {
					display: block;
					width: 110rpx;
					height: 110rpx;
					margin: 0px 50rpx 20rpx;
				}
			}
		}

		.matrix-text {
			margin: 40rpx 0rpx 50rpx 76rpx;
			font-size: 32rpx;
			color: #1D3156;
			font-weight: bold;
		}

		button {
			width: 460rpx;
			margin: 20rpx 104rpx 0rpx;
			background: #1D3156;
			color: white;
			border-radius: 130rpx;
		}
	}
</style>
