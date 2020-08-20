<template>
	<view class="infowrapper">
		<div class="block" @click="changeUrl(idx)" v-for="(item,idx) in blockList" :class="idx==1?'mlr':''">
			<!-- <div class="bimg"></div> -->
			<u-badge :count="item.count" :offset="[0,0]" size="mini" bgColor="#1D3156">

			</u-badge>
			<u-icon v-if="item.icon==0" name="lingdang" custom-prefix="custom-icon" size="55" color="#1D3156"></u-icon>
			<u-icon v-if="item.icon==1" name="chat" color="#1D3156" size="60"></u-icon>
			<u-icon v-if="item.icon==2" name="xingxing" custom-prefix="custom-icon" size="60" color="#1D3156"></u-icon>
			<div class="bname">{{item.name}}</div>
			<!-- <div class="bcount" v-if="item.count!=0">{{item.count}}</div> -->
		</div>
	</view>
</template>

<script>
	export default {
		props: {
			countList: {
				type: Array,
				default: () => {
					return [0, 0, 0]
				}
			}
		},
		data() {
			return {
				blockList: [{
						icon: 0,
						name: '信息中心',
						count: 0,
						path: '/mine/informationCenter'
					},
					{
						icon: 1,
						name: '我的消息',
						count: 1
					},
					{
						icon: 2,
						name: '我的收藏',
						count: 2,
						path: '/mine/collection'
					},
				],
			}
		},
		methods: {
			changeUrl(idx) {
				// console.log(idx)
				if (this.blockList[idx].path) {
					uni.navigateTo({
						url: this.blockList[idx].path
					})
				} else {
					this.gmyToast('该板块后续开放')
				}
			}
		},
		created() {
			this.$nextTick(function() {
				this.blockList = this.blockList.map((item, idx) => {
					item.count = this.countList[idx]
					return item
				})
			})
		}
	}
</script>

<style lang="scss" scoped>
	.infowrapper {
		border-radius: 10rpx*2;
		height: 80rpx*2;
		background: #fff;
		box-sizing: border-box;
		padding: 17rpx*2 35rpx*2;
		@include xCenter;
	}

	.mlr {
		margin: 0 84rpx;
	}

	.block {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;

		.bimg {
			width: 30rpx*2;
			height: 30rpx*2;
			background: #ccc;
		}

		.bname {
			font-size: 30rpx;
			color: #6F7280;
			margin-top: 8rpx;
		}

		.bcount {
			position: absolute;
			width: 20rpx;
			height: 20rpx;
			background: $xblue;
			color: #fff;
			font-size: 12rpx;
			@include xCenter;
			border-radius: 50%;
			top: -4rpx;
			right: 8rpx;
		}

	}
</style>
