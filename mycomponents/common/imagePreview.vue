<template>
	<view>
		<u-popup @open="openEvent" v-model="show" mode="center">
			<view class="img_box" @click.stop="show=false">
				<swiper :circular="true" @change="imgChange" :current="imgIdx" style="width: 100%;height: 100%" :indicator-dots="false"
				 :autoplay="false">
					<swiper-item v-for="(item,idx) in imgs" :key="idx">
						<image mode="aspectFit" class="img_style" style="width: 100%;" :src="item"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="msg">{{imgIdx+1}}/{{imgs.length}}</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				imgIdx: this.idx
			}
		},
		methods: {
			showImgs() {
				this.show = true
			},
			imgChange(idx) {
				this.imgIdx = idx.detail.current
			},
			openEvent(){
				this.imgIdx=this.idx
			}
		},
		props: {
			imgs: {
				type: Array,
				default: ''
			},
			idx: {
				type: Number,
				default: 0
			}
		},
	}
</script>

<style scoped lang="scss">
	.img_box {
		width: 100vw;
		height: 100vh;
		padding: 4rpx;
		background: #000;
		@include xCenter;

		.img_style {
			width: 100%;
			min-width: 100%;
			position: relative;
			/*脱离文档流*/
			top: 50%;
			/*偏移*/
			transform: translate(0, -50%);
		}
	}

	.msg {
		position: fixed;
		bottom: 20rpx;
		color: #fff;
		width: 100%;
		text-align: center;
		font-weight: bold;
		font-size: 36rpx;
	}
</style>
