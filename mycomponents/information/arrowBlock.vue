<template>
	<view ref="myArrow" class="wrapper" @click="show=!show">
		<view class="title" v-if="titleUnchange==false">{{title}}</view>
		<view class="title" v-if="titleUnchange!=false">{{titleUnchange}}</view>
		<view class="arrow">
			<uni-icons type="arrowdown" color="#393D46" size="15"></uni-icons>
		</view>

		<view class="arrow_box">
			<downList v-model="show">
				<view @click="changeTab(idx)" class="arItem" :class="activeIdx==idx?'active':''" v-for="(item,idx) in arr">{{item.name}}</view>
			</downList>
		</view>
	</view>
</template>

<script>
	import downList from '@/components/chunLei-popups/chunLei-popups.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons,
			downList
		},
		data() {
			return {
				show: false,
				activeIdx: 0,
				title: ''
			}
		},
		watch: {
			activeIdx(idx) {
				this.title = this.arr[idx].name
			}
		},
		onBackPress() {
			console.log('点击')
		},
		props: {
			titleUnchange: {
				default: false
			},
			arr: {
				type: Array,
				require: true,
				default: function() {
					return []
				},
			},
			value: {
				default: false
			}
		},
		created() {

			if (this.arr.length != 0) {
				this.title = this.arr[0].name;
			}
		},
		mounted() {
			this.$emit('currenTab', this.activeIdx)
		},
		methods: {
			changeTab(idx) {
				this.activeIdx = idx;
				this.$emit('currenTab', this.activeIdx)
			},
			closeArr() {
				this.show = false
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

		.arrow_box {
			position: absolute;
			bottom: 0rpx;

			.arItem {
				white-space: nowrap;
				text-align: left;
				font-size: 28rpx;
				color: #1D3156;
				height: 72rpx;
				line-height: 72rpx;
				box-sizing: border-box;
				padding: 0rpx 10rpx
			}

			.active {
				color: #617397;
				font-weight: bold;
			}
		}

	}
</style>
