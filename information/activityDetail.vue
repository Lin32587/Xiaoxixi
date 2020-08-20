<template>
	<view>
		<myloading :loading="true" v-if="ticketData==0"></myloading>
		<view class="wrapper" v-if="ticketData!=0">
			<!-- <view class="banner"></view> -->
			<image v-if="ticketData.IImage" class="banner" :src="publicImgPath+ticketData.IImage"></image>
			<!--  活动详情-->
			<view class="act_intr">
				<view class="title">{{ticketData.Title}}</view>
				<view class="detail">
					<view class="left">
						<view class="norGrey">浏览 {{ticketData.BrowseNum}}</view>
						<view class="norGrey" style="margin-left: 26rpx;">收藏 {{ticketData.CollectNum}}</view>
					</view>
					<view class="price">￥{{ticketData.Money}}起</view>
				</view>
				<view class="time">
					<u-icon style="margin-right: 10rpx;" name="zhong" custom-prefix="custom-icon" size="30" color="#999CAA"></u-icon>
					<span class="norGrey">{{ticketData.StartAt}} - {{ticketData.EndAt}}</span>
					<!-- <span class="norGrey">{{$u.timeFormat(ticketData.StartAt, 'yyyy-mm-dd hh:MM')}}</span> -->
				</view>
				<view class="address">
					<u-icon style="margin-right: 10rpx;" name="position" custom-prefix="custom-icon" size="30" color="#999CAA"></u-icon>
					<span class="norGrey">{{ticketData.Address}}</span>
				</view>
			</view>
			<!-- block -->
			<view class="block" v-if="ticketData.Band" @click="toBlock">
				<image v-if="ticketData.Band.Image" class="ph" :src="publicImgPath+ticketData.Band.Image"></image>
				<view v-else class="ph"></view>
				<view class="right">
					<view class="title">{{ticketData.Band.Name}}</view>
					<view class="content">{{ticketData.Band.Description}}</view>
				</view>
			</view>
			<!-- 活动详情 -->
			<view class="activity_detail" v-if="ticketData.Detail">
				<view class="a_title">活动详情</view>
				<view class="article">
					<view class="words">{{ticketData.Detail.Detail}}</view>
					<image v-if="ticketData.Detail.Image" class="ph" :src="publicImgPath+ticketData.Detail.Image"></image>
				</view>
			</view>
		</view>
		<view class="bottom_part" v-if="ticketData!=0">
			<view class="icon_box">
				<u-icon @click="req_infoAddCollect" v-if="ticketData.Collect.IsLike==0" name="heart" color="#1D3156" size="48"></u-icon>
				<u-icon @click="req_infoReemoveCollect" v-if="ticketData.Collect.IsLike==1" name="heart-fill" color="#1D3156" size="48"></u-icon>
				<button class="share_btn" open-type="share" type="default">
					<u-icon name="zhuanfa" color="#1D3156" size="48"></u-icon>
				</button>
			</view>
			<view class="btn_groups">
				<view class="signBtn light" @click="toPingmsg">拼团</view>
				<view v-if="ticketData.State==1" class="signBtn" @click="toDetail">立即报名</view>
				<view v-if="ticketData.State==2" class="signBtn light">立即报名</view>
			</view>
		</view>
	</view>
</template>

<script>
	import myloading from '@/mycomponents/common/myLoading.vue'
	import {
		publicImgPath
	} from '@/common/interface.js'
	import {
		getInfoByid,
		infoAddCollect,
		infoRemoveCollect
	} from '@/common/http.api.js'
	export default {
		components: {
			myloading
		},
		data() {
			return {
				id: '',
				likeId: '',
				ticketData: 0,
				publicImgPath: publicImgPath
			};
		},
		onLoad(e) {
			this.id = e.id
			this.req_getInfoByid()
		},
		onShareAppMessage(res) {
		    return {
		        title:`${this.ticketData.Title} - 活动详情`,
		        path:'information/activityDetail?id=' + this.id,
		        imageUrl:'',
		        desc:'描述',
		        content:'内容'
		    }
		},
		methods: {
			toTransmit() {
				uni.navigateTo({
					url: "/pages/circle/transmit"
				});
				// this.sayingData.TransmitNum++
			},
			// 获取资讯
			req_getInfoByid() {
				let data = {
					Id: this.id,
					UserId: this.gUserid
				}
				getInfoByid(data).then(res => {
					if (res.code == 200) {
						console.log(res)
						res.data.StartAt = this.timefomat(new Date(res.data.StartAt), 'yyyy-MM-dd hh:mm')
						res.data.EndAt = this.timefomat(new Date(res.data.EndAt), 'yyyy-MM-dd hh:mm')
						this.ticketData = res.data
						// console.log(time)
						if (res.data.Collect.Id) {
							this.likeId = res.data.Collect.Id
						}
					}
				})
			},
			timefomat(time, formater) {
				if (!time) return time
				// let time = timeStamp.toString().replace("/Date(", "").replace(")/", "")
				// const date = new Date(time.replace(/-/g, '/')) // parseInt(time)
				let fmt = (formater != null) ? formater : 'yyyy-MM-dd hh:mm:ss'
				const o = {
					'M+': time.getMonth() + 1, // 月
					'd+': time.getDate(), // 日
					'h+': time.getHours(), // 小时
					'm+': time.getMinutes(), // 分
					's+': time.getSeconds(), // 秒
					'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
					'S': time.getMilliseconds() // 毫秒
				}

				if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
				for (const k in o) {
					if (new RegExp('(' + k + ')').test(fmt)) {
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
					}
				}

				return fmt
			},
			// 添加收藏
			req_infoAddCollect() {
				let data = {
					userId: this.gUserid,
					activityId: this.ticketData.Id
				}
				infoAddCollect(data).then(res => {
					if (res.code == 200) {
						this.ticketData.Collect.IsLike = 1
						if (res.data.collect) {
							this.likeId = res.data.collect
						}
					}
				})
			},
			// 取消收藏
			req_infoReemoveCollect() {
				let data = {
					userId: this.gUserid,
					activityId: this.ticketData.Id,
					id: this.likeId
				}
				infoRemoveCollect(data).then(res => {
					if (res.code == 200) {
						console.log("取消收藏")
						this.ticketData.Collect.IsLike = 0
					}
				})
			},
			// 跳转票券选择
			toDetail() {
				if (this.$store.state.gAuth == 0) {
					this.gmyToast('请完成认证')
					return
				}
				uni.navigateTo({
					url: '/information/ticketChoose?id=' + this.ticketData.Id
				})
			},
			toBlock() {
				this.$u.route('/information/organizationDetail', {
					id: this.ticketData.BandId
				})
			},
			toPingmsg() {
				uni.showToast({
					icon: 'none',
					title: '该功能暂未开放'
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@mixin xRadius {
		border-radius: 20rpx;
	}



	.wrapper {
		box-sizing: border-box;
		padding: 20rpx;
		padding-bottom: 160rpx;
	}


	.banner {
		width: 100%;
		@include xRadius;
		height: 300rpx;
		background: #ccc;
	}

	.act_intr {
		@include xRadius;
		padding: 40rpx;
		box-sizing: border-box;
		padding-bottom: 32rpx;
		background: #fff;
		margin-top: 20rpx;
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);

		.title {
			color: #1D3156;
			font-size: 36rpx;
			font-weight: bold;
		}

		.detail {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;

			.left {
				display: flex;
			}

			.price {
				color: #384F79;
				font-size: 48rpx;
				font-weight: bold;
				margin-right: 20rpx;
			}
		}

		.norGrey {
			color: #999CAA;
			font-size: 24rpx;
		}

		.time,
		.address {
			display: flex;
			align-items: center;
			margin-top: 30rpx;
		}
	}

	.block {
		background: #fff;
		@include xRadius;
		padding: 40rpx;
		box-sizing: border-box;
		display: flex;
		margin-top: 20rpx;
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);

		.ph {
			margin-right: 24rpx;
			min-width: 120rpx;
			width: 120rpx;
			height: 120rpx;
			background: #ccc;
			border-radius: 50%;
		}

		.right {
			.title {
				color: #393D46;
			}

			.content {
				@include mEllipsis;
				color: #999CAA;
				font-size: 20rpx;
				margin-top: 18rpx;
			}
		}
	}

	.activity_detail {
		box-sizing: border-box;
		padding: 40rpx;
		background: #fff;
		margin-top: 20rpx;
		@include xRadius;
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);

		.a_title {
			color: #1D3156;
			font-weight: bold;
			font-size: 30rpx;
			padding-left: 20rpx;
			border-left: solid 4rpx #1D3156;
			margin-bottom: 16rpx;
		}

		.article {
			@include xRadius;
			background: #F5F6FA;
			padding: 24rpx 10px;
			padding-bottom: 48rpx;

			.words {
				font-size: 24rpx;
				color: #999CAA;
			}

			.ph {
				width: 100%;
				height: 348rpx;
				background: #ccc;
				margin-top: 20rpx;
			}
		}
	}

	.bottom_part {
		position: fixed;
		height: 100rpx;
		width: 100%;
		bottom: 0rpx;
		background: #fff;
		box-shadow: 0px 0px 0px 0px rgba(170, 170, 170, 1);
		display: flex;
		align-items: center;
		justify-content: space-between;

		.icon_box {
			display: flex;
			box-sizing: border-box;
			padding-left: 80rpx;
			
			.share_btn{
				width: 48rpx;
				height: 48rpx;
				margin-left: 52rpx;
				padding-left: 0;
				background-color: #ffffff;
				&::after{
					border: none !important;
					border-radius: none !important;
				}
			}
			
		}

		.btn_groups {
			display: flex;

			.signBtn {
				width: 200rpx;
				height: 100rpx;
				@include xCenter;
				color: #fff;
				background: #1D3156;
			}

			.light {
				background: #384F79;
			}
		}
	}
</style>
