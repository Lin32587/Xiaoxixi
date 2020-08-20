<template>
	<view class="pathwrapper">
		<view class="list" v-for="(item,idx) in pathList" :key="idx" :class="idx==pathList.length-1?'lastChild':''" @click="changeUrl(item.path)">
			<view class="limg">
				<u-icon v-if="item.icon==0" name="zhuanjia1" custom-prefix="custom-icon" size="30" color="#1D3156"></u-icon>
				<u-icon v-if="item.icon==1" name="authentication" custom-prefix="custom-icon" size="30" color="#1D3156"></u-icon>
				<u-icon v-if="item.icon==2" name="huiyuan" custom-prefix="custom-icon" size="36" color="#1D3156"></u-icon>
				<u-icon v-if="item.icon==3" name="jubao" custom-prefix="custom-icon" size="36" color="#1D3156"></u-icon>
				<u-icon v-if="item.icon==4" name="guanyu" custom-prefix="custom-icon" size="36" color="#1D3156"></u-icon>
			</view>
			<view class="lname">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pathList: [{
						name: '我要入驻',
						path: '/mine/settlement',
						icon: 0
					},
					{
						name: '认证中心',
						path: '/mine/certification',
						icon: 1
					},
					{
						name: '会员中心',
						// path: '/mine/vipCenter',
						icon: 2
					},
					{
						name: '举报中心',
						path: '/mine/accusationPage',
						icon: 3
					},
					{
						name: '关于我们',
						path: '/mine/about',
						icon: 4
					},
				]
			}
		},
		methods: {
			changeUrl(path) {
				if (!path) {
					this.gmyToast('该板块后续开放')
					return
				}
				uni.navigateTo({
					url: path
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pathwrapper {
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 18rpx*2 30rpx*2;
		background: #fff;
	}

	.list {
		display: flex;
		padding-bottom: 30rpx;
		margin-bottom: 24rpx;
		border-bottom: solid 2rpx #ebebeb;
		align-items: center;

		.limg {
			// width: 10rpx;
			// height: 10rpx;
			// border-radius: 50%;
			// background: #ccc;
			margin-right: 20rpx;
		}

		.lname {
			color: #6F7280;
			font-size: 24rpx;
		}
	}

	.lastChild {
		border: none;
		padding-bottom: 0rpx;
	}
</style>
