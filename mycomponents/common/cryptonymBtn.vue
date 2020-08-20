<template>
	<!-- 匿名按钮 -->
	<view class="cryptonym" v-if="false">
		<view class="checkbox" @click="changeStatus" :class="show?'active':''">
			<view v-if="show==true" class="core"></view>
		</view>
		<span @click="changeStatus" :class="show?'s_actice':''">匿名发布</span>
	</view>
</template>

<script>
	export default {

		data() {
			return {}

		},
		props: {
			show: {
				default: false
			}
		},
		methods: {
			changeStatus() {
				let result = !this.show
				this.$emit('update:show', result)
			}
		}

	}
</script>

<style scoped lang="scss">
	.cryptonym {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		// padding-left: 40rpx;

		.checkbox {
			border-radius: 50%;
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
			border: solid 1px #999CAA;
			@include xCenter;
			transition: all .3s;

			.core {
				border-radius: 50%;
				width: 15rpx;
				height: 15rpx;
				background: #101010;
			}
		}

		.active {
			transition: all .3s;
			border: solid 1px #101010;
		}

		span {
			color: #999CAA;
			font-size: 28rpx;
			font-weight: bold;
		}

		.s_actice {
			color: #101010;
		}
	}
</style>
