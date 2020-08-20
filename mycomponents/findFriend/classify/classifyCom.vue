<template>
	<view class="wrapper">
		<view class="left">
			<scroll-view style="height: inherit;" :scroll-y="true">
				<view class="l_item" :class="actIdx==index?'l_active':''" v-for="(item,index) in leftArr" @click="changeTab(index)"
				 :key="index">{{item.label}}</view>
			</scroll-view>
		</view>
		<view class="right" v-if="leftArr.length>0">
			<scroll-view style="height: inherit;" :scroll-y="true">
				<view class="r_item" @click="sendMsg(item)" v-for="(item,idx) in leftArr[actIdx].children" :key="idx">{{item.label}}</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	import {
		fcategory1
	} from '@/common/http.api.js'
	import {
		data
	} from './data.js'
	export default {
		data() {
			return {
				kList: data,
				actIdx: 0,
				leftArr: [],
				rightArr: []
			}
		},
		props: {
			norActive: {
				default: 0
			}
		},
		methods: {
			changeTab(idx) {
				this.actIdx = idx
				// this.req_fcategory2(this.leftArr[idx].Id)
			},
			// 左边
			req_fcategory1() {
				fcategory1().then(res => {
					if (res.code == 200) {
						this.leftArr = res.data
					}
				})
			},
			sendMsg(item) {
				this.$emit('update:norActive', this.actIdx)
				this.$emit('typeIdx', item)
			}
		},
		created() {
			this.actIdx = this.norActive
			this.req_fcategory1()
		},

	}
</script>
<style scoped lang="scss">
	.wrapper {
		width: 100%;
		background: #fff;
		height: 912rpx;
		box-sizing: border-box;
		border-radius: 0rpx 0rpx 20rpx 0rpx;
		display: flex;

		.left {
			height: inherit;
			width: 150rpx;
			background: #F8F8F8;
			overflow-x: hidden;

			.l_item {
				background: #F8F8F8;
				@include xCenter;
				width: inherit;
				height: 100rpx;
				font-size: 26rpx;
				box-sizing: border-box;
			}

			.l_active {
				border-left: solid 4rpx #1D3156;
				background: #fff;
				color: #1D3156;
			}
		}


		.right {
			height: inherit;
			width: 100%;
			background: #fff;
			box-sizing: border-box;
			padding-left: 58rpx;

			.r_item {
				padding-top: 34rpx;
				color: #6F7280;
				font-size: 26rpx;
			}
		}
	}
</style>
