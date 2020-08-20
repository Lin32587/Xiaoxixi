<template>
	<view class="wrapper">
		<view class="top" @click="modelEvent">
			<view class="title">{{arr[activeId].name}}</view>
			<view :class="value==true?'r_active':'right'">
				<u-icon name="arrow-down" color="#393D46" size="30"></u-icon>
			</view>
		</view>
		<view class="dropdown" v-if="value==true">
			<view class="d_item" :class="idx==activeId?'d_acitve':''" @click="tabChoose(idx)" v-for="(item,idx) in arr">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeId: 0,
				title: ''
			}
		},
		props: {
			arr: {
				type: Array,
				default: function() {
					return []
				}
			},
			// 控制显示
			value: {
				default: false
			},
			// 控制单一
			keyName: {
				default: ''
			}
		},
		methods: {
			tabChoose(idx) {
				this.activeId = idx;
				this.modelEvent()
				this.$emit('activeId', idx)
			},
			modelEvent() {
				this.$emit('input', this.keyName)
			}
		},


	}
</script>

<style lang="scss" scoped>
	.wrapper {
		position: relative;
	}

	.top {
		display: flex;
		align-items: center;

		.title {
			color: #393D46;
			font-size: 28rpx;
			margin-right: 4rpx;
		}
	}

	.right {
		transition: all .3s;
	}

	.r_active {
		transition: all .3s;
		transform: rotate(-180deg);
	}

	.dropdown {
		position: absolute;
		top: 50rpx;
		left: 50%;
		transform: translateX(-50%);
		box-sizing: border-box;
		padding: 0rpx 40rpx;
		background: #fff;
		border-radius: 8rpx;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.12);
		z-index: 20;

		.d_item {
			white-space: nowrap;
			margin-right: 5rpx;
			height: 70rpx;
			@include xCenter;
		}

		.d_acitve {
			color: #1D3156;
			font-weight: bold;
		}
	}
</style>
