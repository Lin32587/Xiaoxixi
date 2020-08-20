<template>
	<view class="wrapper">
		<view class="main_block">
			<view class="ph">
				<u-icon color="$xPhcolor" name="photo" size="150"></u-icon>
			</view>
			<button class="baseBtn" open-type="share" @click="shareAPI">转发好友</button>
			<!-- <view class="baseBtn" @click="shareFriend">转发好友</view> -->
			<view class="baseBtn save" @click="save_btn">保存图片</view>
		</view>
	</view>
</template>

<script>
	/**
	 *@pageType {String} 从哪个页面跳转来的，0圈子 1资讯 2寻伴
	 * 
	 * 
	 **/
	import {
		addftransmit,
		addctransmit
	} from '@/common/http.api.js'
	export default {
		data() {
			return {
				type: 0,
				dataItem: '',
				detailData: ''
			};
		},
		onLoad: function(option) {
			this.dataItem = JSON.parse(decodeURIComponent(option.item))
			this.list_data()
		},
		methods: {
			list_data() {
				let data = {
					postId: this.dataItem.Id,
					userId: this.dataItem.User.Id
				}
				this.detailData = data
			},
			shareAPI() {
				switch (this.dataItem.Sort) {
					case 0:
						this.req_addctransmit()// 圈子
						return
					case 1:
						this.req_addftransmit()// 寻伴
						return;
					case 2:
						// 资讯
						return
				}
			},
			save_btn() {
				uni.showToast({
					title: '保存成功',
					icon: 'success',
					duration: 1000
				})
			},
			req_addftransmit() {
				addftransmit(this.detailData).then(res => {
					if (res.code == 200) {
						// this.shareFriend()
						// uni.showToast({
						// 	title: '转发成功',
						// 	icon: 'success',
						// 	duration: 1000
						// })
					}
				})
			},
			req_addctransmit() {
				addctransmit(this.detailData).then(res => {
					if (res.code == 200) {
						// this.shareFriend()
						// uni.showToast({
						// 	title: '转发成功',
						// 	icon: 'success',
						// 	duration: 1000
						// })
					}
				})
			},
			shareFriend() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
						uni.navigateBack({})
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			}
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
	.wrapper {
		padding: 20rpx;
		box-sizing: border-box;
	}

	.main_block {
		border-radius: 20rpx;
		background: #fff;
		padding: 20rpx;
		padding-bottom: 44rpx;

		.ph {
			border-radius: 20rpx;
			width: 100%;
			height: 1004rpx;
			background: $xPhbg;
			@include xCenter;
		}

		.baseBtn {
			width: 100%;
			@include xCenter;
			color: #fff;
			background: #1D3156;
			border-radius: 40rpx;
			height: 80rpx;
			margin-top: 40rpx;
			font-size: 28rpx;
		}

		.save {
			background: #384F79;
		}
	}
</style>
