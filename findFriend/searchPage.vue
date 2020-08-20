<template>
	<view class="search_wrap">
		<view class="header">
			<u-search @search="doSearch" @custom="doSearch" placeholder="搜你想搜的~" v-model="searchContent"></u-search>
		</view>
		<view class="history_box">
			<view class="ctitle">搜索历史</view>
			<view class="history_content">
				<view v-if="history.length>0" @click="fillSearch(item)" class="h_item" v-for="(item,index) in history" :key="index">{{item}}</view>
			</view>
		</view>
		<view class="hot_box">
			<view class="ctitle">热门搜索</view>
			<view class="hot_content">
				<view v-if="test.length>0">
					<view class="hot_item" v-for="(item,idx) in test" :key="idx">
						<view class="baseBtn first" v-if="idx==0">{{idx+1}}</view>
						<view class="baseBtn second" v-else-if="idx==1">{{idx+1}}</view>
						<view class="baseBtn third" v-else-if="idx==2">{{idx+1}}</view>
						<view class="baseBtn" v-else>{{idx+1}}</view>
						<view class="title">{{item}}</view>
					</view>
				</view>
				<view class="noMore" v-else>暂无数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchContent: '',
				history: [],
				test: []
			};
		},
		methods: {
			fillSearch(content) {
				this.searchContent = content
			},
			// 搜索
			doSearch(e) {
				if (e == '') {
					this.gmyToast('搜索内容不能为空')
					return
				}
				let maxCount = 8
				if (this.history.length <= maxCount) {
					this.history.push(e)
				} else {
					let arr = this.history.slice(-maxCount, -1)
					arr.push(this.history[this.history.length - 1])
					this.history = arr
				}
				let searchList = JSON.stringify(this.history)
				uni.setStorageSync('searchList', searchList)
				this.$u.route('/findFriend/searchResult', {
					content: e
				})
			}
		},
		created() {
			let history = uni.getStorageSync('searchList')
			if (history != '') {
				this.history = JSON.parse(history)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		box-sizing: border-box;
		padding: 28rpx 38rpx;
		background: #fff;
	}

	.ctitle {
		color: #393D46;
		font-weight: bold;
		padding-left: 20rpx;
		border-left: solid 5rpx #393D46;
		font-size: 32rpx;
	}

	.history_box {
		box-sizing: border-box;
		padding: 0 40rpx;
		margin-top: 40rpx;

		.history_content {
			border-radius: 20rpx;
			background: #fff;
			box-sizing: border-box;
			padding: 40rpx;
			display: flex;
			flex-wrap: wrap;
			margin-top: 16rpx;
			padding-top: 10px;

			.h_item {
				font-size: 20rpx;
				color: #6F7280;
				background-color: #F5F6FA;
				box-sizing: border-box;
				padding: 6rpx 20rpx;
				margin-right: 10rpx;
				margin-top: 10px;
				border-radius: 20rpx;
				@include singleEllipsis;
				max-width: 200rpx;

			}
		}
	}

	.hot_box {
		box-sizing: border-box;
		padding: 0 40rpx;
		margin-top: 40rpx;

		.hot_content {
			border-radius: 20rpx;
			background: #fff;
			box-sizing: border-box;
			padding: 40rpx;
			margin-top: 16rpx;

			.hot_item {
				background: #F5F6FA;
				border-radius: 20rpx;
				box-sizing: border-box;
				padding: 10rpx;
				margin-bottom: 30rpx;
				color: #6F7280;
				display: flex;
				align-items: center;

				.baseBtn {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					background: #DADCE3;
					color: #fff;
					font-size: 28rpx;
					margin-left: 10rpx;
					@include xCenter;
					margin-right: 10rpx;
				}

				.title {
					width: 85%;
					max-width: 85%;
					text-align: center;
					@include singleEllipsis;
				}

				.first {
					background: #1D3156;
				}

				.second {
					background: #384F79;
				}

				.third {
					background: #617397;
				}
			}
		}
	}
	.noMore{
		@include xCenter;
		color: #6F7280;
	}
</style>
