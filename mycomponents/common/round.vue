<template>
	<view class="r_wrapper" v-if="false">
		<view class="r_item" v-for="item in 3" :key="item"></view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.r_wrapper {
		display: flex;
		align-items: flex-end;

		.r_item {
			width: 28rpx;
			height: 28rpx;
			border-radius: 50%;
			background: #ccc;
			margin-right: 8rpx;
		}
	}
</style>
