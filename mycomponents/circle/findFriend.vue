<template>
	<view class="wrapper">
		<view class="top_box">
			<view @click="toUser">
				<image class="photo" :src="udata.User.UserImage"></image>
			</view>
			<!-- <view class="photo"></view> -->
			<view class="right_box" @click="toDetail">
				<view class="r_top_box">
					<view class="title">{{udata.Title}}</view>
					<view v-if="udata.State==0" class="state">正在寻</view>
					<view v-if="udata.State==1" class="state">结束</view>
				</view>
				<view class="content">{{udata.Description}}</view>
			</view>
		</view>
		<view class="bottom_box">
			<view class="tags">
				<view class="tag">{{udata.Keyword}}</view>
				<!-- <view class="tag" v-for="(item,idx) in tags" :class="idx==tags.length-1?'mt0':''" :key="item.name">#{{item.name}}</view> -->
			</view>
			<view class="time">{{udata.CreateAt|timeFilter(this)}}</view>
			<view class="skim">浏览 {{udata.BrowseNum}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		filters: {
			timeFilter(val) {
				let FormatTime = ''
				let nowYear = new Date().getFullYear() //当前年
				let nowMonth = new Date().getMonth() + 1 //当前月
				let nowDay = new Date().getDate() //当前日
				// console.log(nowDate,val.substr(0,4))
				if (nowYear == parseInt(val.substr(0, 4)) && nowMonth == parseInt(val.substr(5, 2)) && nowDay == parseInt(val.substr(
						8, 2))) {
					FormatTime = val.substr(11, 5)
					// 	val = val.substr(5, val.length - 9)
					// 	FormatTime = val.split("-")[0] + "月" + val.split("-")[1].split("T")[0] + "日" + " " + val.split("T")[1]
				} else if (nowYear == parseInt(val.substr(0, 4))) {
					val = val.substr(0, val.length - 4)
					FormatTime = parseInt(val.split("-")[1]) + "月" + parseInt(val.split("-")[2].split(
						"T")[0]) + "日"
				}else {
					FormatTime = parseInt(val.substr(0,4)) + "年" + parseInt(val.substr(5,2)) + "月"
				}
				return FormatTime
			}
		},
		data() {
			return {
				tags: [{
						name: '约'
					},
					{
						name: '生活日常'
					},
					{
						name: '兴趣学习'
					},
					{
						name: '寻找对象'
					},
				]
			}
		},
		props: {
			udata: {
				default: function() {
					return {}
				}
			}
		},
		methods: {
			toDetail() {
				uni.navigateTo({
					url: '/findFriend/infoDetail?id=' + this.udata.Id
				})
			},
			toUser() {
				uni.navigateTo({
					url: '/pages/circle/userInfo?id=' + this.udata.User.Id
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.wrapper {
		box-sizing: border-box;
		padding: 0 40rpx;
		padding-top: 28rpx;
		padding-bottom: 22rpx;
	}

	.top_box {
		display: flex;

		.photo {
			min-width: 80rpx;
			width: 80rpx;
			height: 80rpx;
			background: #ccc;
			border-radius: 50%;
			margin-right: 24rpx;
		}

		.right_box {
			width: 100%;

			.r_top_box {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.title {
					max-width: 400rpx;
					box-sizing: border-box;
					font-size: 26rpx;
					color: #393D46;
					font-weight: bold;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.state {
					border-radius: 10rpx;
					height: 40rpx;
					width: 100rpx;
					min-width: 100rpx;
					@include xCenter;
					color: #1D3156;
					border: solid 3rpx #1D3156;
					font-size: 23rpx;
				}

			}

			.content {
				margin-top: 16rpx;
				color: #9699A6;
				font-size: 26rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
	}

	.bottom_box {
		margin-top: 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.tags {
			max-width: 500rpx;
			flex-wrap: wrap;
			display: flex;

			.tag {
				margin-right: 10rpx;
				color: #6F7280;
				font-size: 24rpx;

			}

			.mt0 {
				margin: 0rpx
			}

		}


		.time {
			color: #999caa;
			font-size: 20rpx;
			position: absolute;
			right: 170rpx;
		}

		.skim {
			color: #6F7280;
			font-size: 24rpx;
		}
	}
</style>
