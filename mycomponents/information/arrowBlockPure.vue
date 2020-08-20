<template>
	<view class="wrapper" @click="changeStatus">
		<view class="title">{{title}}</view>
		<view class="arrow">
			<u-icon name="arrow-down" color="#393D46" size="30"></u-icon>
		</view>
	</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons,
		},
		data() {
			return {}
		},
		props: {
			title: {
				default: ''
			},
			show: {
				default: false
			}
		},
		methods: {
			changeStatus() {
				let nShow = !this.show
				this.$emit('update:show', nShow)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		position: relative;
		display: flex;
		align-items: center;

		.title {
			margin-right: 4rpx;
			color: #393D46;
			font-size: 28rpx;
		}

	}
</style>
