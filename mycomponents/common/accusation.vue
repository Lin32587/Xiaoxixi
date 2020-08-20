<template>
	<!-- 举报按钮 -->
	<view>
		<view class="accusation" @click="accusationEvent">!
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			accusationEvent() {
				this.$emit('accusationEvent')
			}
		}
	}
</script>

<style scoped lang="scss">
	.accusation {
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
		border: solid 2rpx #6E7280;
		color: #6E7280;
		@include xCenter;
		float: right;
	}
</style>
