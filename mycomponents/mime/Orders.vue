<template>
	<view class="wrapper">
		<view class="msg">
			{{msg}}
		</view>
		<view class="section">
			<view class="block" @click="changePath(idx)" v-for="(item,idx) in blockList" :key="idx">
				<view class="bimg">
					<u-icon v-if="item.icon==0" name="diqiu" custom-prefix="custom-icon" size="50" color="#1D3156"></u-icon>
					<u-icon v-if="item.icon==1" name="X" custom-prefix="custom-icon" size="60" color="#1D3156"></u-icon>
					<u-icon v-if="item.icon==2" name="duihuan" custom-prefix="custom-icon" size="60" color="#1D3156"></u-icon>
				</view>
				<view class="bname">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: '欢迎您的使用',
				blockList: [{
						name: '资讯',
						path: '/mine/infoOrder',
						icon: 0
					},
					{
						name: 'X-EXPERT',
						icon: 1
					},
					{
						name: '兑换主页',
						// path: '/mine/exchangeOrder',
						icon: 2
					},
				]
			}
		},
		methods: {
			changePath(idx) {
				if (this.blockList[idx].path) {
					uni.navigateTo({
						url: this.blockList[idx].path
					})
				}else{
					this.gmyToast('该板块后续开放')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		box-sizing: border-box;
		padding: 0 40rpx;
		padding-top: 28rpx;
		padding-bottom: 30rpx;
		border-radius: 20rpx;
		background: #fff;
	}

	.msg {
		width: 100%;
		border-radius: 20rpx;
		background: #F5F6FA 100%;
		height: 60rpx;
		font-size: 20rpx;
		line-height: 60rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

	}

	.section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 17rpx*2;

		.block {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 150rpx;

			.bimg {
				display: flex;
				align-items: center;
				text-align: center;
				justify-content: center;
				width: 60rpx;
				height: 60rpx;
				@include xCenter;
				// background: #ccc;
			}

			.bname {
				margin-top: 5rpx;
				color: #6F7280;
				font-size: 28rpx;
			}
		}
	}
</style>
