<template>
	<!-- 按钮 fiexed布局 -->
	<view class="addCircle" @click="roundEvent">
		<u-icon name="shuye" custom-prefix="custom-icon" size="40" color="#384E79"></u-icon>
		<!-- <u-icon name="moments" size="40" color="#384E79"></u-icon> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			roundEvent() {
				this.$emit('roundEvent')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.addCircle {
		position: fixed;
		@include xCenter;
		bottom: 66rpx;
		right: 48rpx;
		border-radius: 50%;
		width: 88rpx;
		height: 88rpx;
		background: #fff;
		box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0, 0, 0, 0.1);
	}
</style>
