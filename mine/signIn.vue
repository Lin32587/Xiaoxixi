<template>
	<view>
		<view class="calenderBox">
			<zzx-calendar :dotList="dotList" @selected-change="datechange"></zzx-calendar>
		</view>
		<view class="tips">您已累计签到3天</view>
		<view class="signBtn" @click="signBtn">签到</view>
	</view>
</template>

<script>
	import zzxCalendar from "@/components/zzx-calendar/zzx-calendar.vue"
	export default {
		data() {
			return {
				// 签到回显
				dotList: [{
						date: '2020-07-03'
					},
					{
						date: '2020-07-02'
					},
					{
						date: '2020-07-01'
					},
					{
						date: '2020-06-30'
					},
				]
			};
		},
		methods: {
			datechange() {},
			// 签到
			signBtn() {}
		}
	}
</script>

<style lang="scss" scoped>
	.calenderBox {
		max-width: 712rpx;
		padding: 100rpx 40rpx;
		box-sizing: border-box;
		background: #fff;
		padding-top: 40rpx;
		margin: 0 auto;
		margin-top: 40rpx;
		border-radius: 20rpx;
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
	}

	.tips {
		color: #617397;
		font-size: 28rpx;
		text-align: center;
		margin-top: 40rpx;
	}

	.signBtn {
		@include xBtn;
		width: 708rpx;
		margin: 0 auto;
		margin-top: 20rpx;
	}
</style>
