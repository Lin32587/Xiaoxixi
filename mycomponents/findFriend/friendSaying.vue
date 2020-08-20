<template>
	<view class="wrapper">
		<view class="top">
			<view class="t_left" @click="toUserinfo">
				<image class="ph" :src="udata.User.UserImage"></image>
				<!-- 	<view class="ph">
					<u-swiper :list="list" :autoplay="false" mode="none"></u-swiper>
				</view> -->
				<view class="detail">
					<view class="name">{{udata.User.username}}</view>
					<view class="school">{{udata.User.school}}</view>
				</view>
			</view>
			<view class="t_right">
				<view class="status" v-if="udata.State==0">正在寻</view>
				<view class="status" v-else>结束</view>
				<u-icon @click="moreEvent" name="more-dot-fill" size="36" color="#B2BED5"></u-icon>
			</view>
		</view>
		<view class="rtitle mt">{{udata.Title}}</view>
		<view class="content mt">{{udata.Description}}</view>
		<view class="photos mt" v-if="udata.Fimage&&udata.Fimage.length>0">
			<u-swiper :prefix="publicImgPath" @click="imgChoose" name="FimageUrl" :list="udata.Fimage" height="322" :autoplay="false"
			 img-mode="scaleToFill"></u-swiper>
		</view>
		<view class="require_box mt">
			<view class="title">要求</view>
			<view class="require mt">{{udata.Require}}</view>
		</view>
		<view class="tagBox">
			<view class="tags mt">
				{{udata.Keyword}}
			</view>
			<view class="time">{{udata.CreateAt|timeFilter(this)}}</view>
		</view>
		<ImagePreview ref="ip" :imgs="imgList" :idx="imgIdx"></ImagePreview>
	</view>
</template>

<script>
	import {
		publicImgPath
	} from '@/common/interface.js'
	import ImagePreview from '@/mycomponents/common/imagePreview.vue'
	export default {
		components: {
			ImagePreview
		},
		props: {
			udata: {
				default: function() {
					return {}
				}
			}
		},
		watch: {
			udata: {
				handler: 'handelPreImgs'
			}
		},
		data() {
			return {
				showPre: false,
				imgList: [],
				imgIdx: 0,
				publicImgPath: publicImgPath
			}
		},
		filters: {
			timeFilter(val) {
				let FormatTime = ''
				let nowDate = new Date().getFullYear()
				// console.log(nowDate,val.substr(0,4))
				if (nowDate == val.substr(0, 4)) {
					val = val.substr(5, val.length - 9)
					FormatTime = parseInt(val.split("-")[0]) + "月" + parseInt(val.split("-")[1].split("T")[0]) + "日"
				} else {
					val = val.substr(0, val.length - 4)
					FormatTime = val.split("-")[0] + "年" + parseInt(val.split("-")[1]) + "月" + parseInt(val.split("-")[2].split("T")[0]) +
						"日"
				}
				return FormatTime
			}
		},
		methods: {
			moreEvent() {
				this.$emit('moreEvent')
			},
			imgChoose(current) {
				// this.imgIdx = idx
				// this.$refs.ip.showImgs()
				// console.log(current)
				let list = this.udata.Fimage.map(item => {
					return item.FimageUrl
				})
				let data = {
					current: current,
					urls: list,
					loop: true,
					success(e) {
						// console.log('成功', e)
					},
					fail(e) {
						// console.log('失败', e)
					}
				}
				uni.previewImage(data)
			},
			imgsPreview() {},
			handelPreImgs() {
				if (this.udata.Fimage && this.udata.Fimage.length != 0) {
					this.imgList = this.udata.Fimage.map(item => {
						return item.FimageUrl
					})
				}
			},
			toUserinfo() {
				uni.navigateTo({
					url: '/pages/circle/userInfo?id=' + this.udata.User.Id
				})
			},
			gg() {
				let data = {
					InformerId: '',
					image: ['', ''],
					description: '',
					reason: ''
				}
			}
		},
		mounted() {
			// if (this.udata.Fimage && this.udata.Fimage.length != 0) {
			// 	this.imgList = this.udata.Fimage.map(item => {
			// 		return item.FimageUrl
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		width: 100%;
		border-radius: 20rpx;
		background: #fff;
		box-sizing: border-box;
		padding: 40rpx;

		.top {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;

			.t_left {
				display: flex;

				.ph {
					min-width: 80rpx;
					width: 80rpx;
					height: 80rpx;
					margin-right: 20rpx;
					border-radius: 50%;
					background: #ccc;
				}

				.detail {
					.name {
						font-weight: bold;
						font-size: 28rpx;
						color: #1D3156;
					}

					.school {
						font-size: 20rpx;
						margin-top: 14rpx;
						color: #999CAA;
					}
				}
			}

			.t_right {
				display: flex;
				align-items: center;

				.status {
					font-size: 20rpx;
					padding: 0 8rpx;
					height: 20px;
					color: #1D3156;
					border: solid #1D3156 2rpx;
					border-radius: 10rpx;
					@include xCenter;
					margin-right: 12rpx;
				}
			}
		}

		.rtitle {
			color: #393D46;
			font-size: 26rpx;
			font-weight: bold;
		}

		.mt {
			margin-top: 20rpx;
		}

		.content {
			font-size: 24rpx;
			color: #6F7280;
		}

		.photos {
			width: 100%;
			height: 322rpx;
			border-radius: 20rpx;
			overflow: hidden;
			background: #ccc;
			box-sizing: border-box;
			// padding-top: 20rpx;
		}

		.require_box {
			box-sizing: border-box;
			padding: 20rpx 30rpx;
			background: #F5F6FA;
			border-radius: 20rpx;

			.title {
				font-size: 24rpx;
				color: #6F7280;
				box-sizing: border-box;
				border-left: solid 4rpx #6F7280;
				padding-left: 8rpx;
				font-weight: bold;
			}

			.require {
				color: #6F7280;
				font-size: 24rpx;
				margin-left: 20rpx;
			}
		}

		.tagBox {
			display: flex;
			align-items: center;
			position: relative;
			margin-top: 10rpx;
			width: 100%;

			.tags {
				font-size: 24rpx;
				color: #6F7280;
			}

			.time {
				font-size: 20rpx;
				position: absolute;
				right: 0rpx;
				color: #909caa;
			}
		}


	}
</style>
