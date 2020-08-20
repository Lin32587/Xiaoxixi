<template>
	<view class="wrapper">
		<view class="add_brick">
			<view class="text_area">
				<textarea :focus="true" v-model="textContent" ref="textArea" :maxlength="maxLength" placeholder="分享你的新鲜事吧~"></textarea>
			</view>
			<view class="pict_area">
				<!-- 	<view class="addBtn">
					<uni-icons type="plusempty" color="#fff" size="30"></uni-icons>
				</view> -->
				<uploadImgs @fileList="getImgFileList"></uploadImgs>
			</view>
		</view>
		<!-- end -->
		<view class="cryptonym_box">
			<cryptonymBtn :show.sync="isCryptonym"></cryptonymBtn>
		</view>
		<!-- btn -->
		<view class="submitBtn" @click="submit">发布</view>
		<!-- warn -->
		<view class="warn">上限{{maxLength}}字，当前已输入{{textContent.length}}字</view>
	</view>
</template>

<script>
	import {
		addCircle,
		maxLength
	} from '@/common/http.api.js'
	import uploadImgs from '@/mycomponents/common/uploadImgs.vue'
	import cryptonymBtn from '@/mycomponents/common/cryptonymBtn.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons,
			cryptonymBtn,
			uploadImgs
		},
		data() {
			return {
				isCryptonym: false,
				strCount: 0,
				textContent: '',
				imgList: [],
				isFirst: true,
				maxLength:0
			}
		},
		onLoad() {
			this.initMaxLength()
		},
		methods: {
			initMaxLength(){
				maxLength({types:'圈子'}).then(res=>{
					this.maxLength = res.data.Total
				}).catch()
			},
			submit() {
				if (this.isFirst) {
					if (this.textContent == '' && this.imgList.length == 0) {
						uni.showToast({
							title: '请输入内容或上传图片',
							icon: 'none',
							duration: 800
						})
						return
					}
					this.isFirst = false
					this.req_addCircle()
				}
			},
			toIndex() {
				uni.switchTab({
					url: '/pages/circle/index'
				})
			},
			req_addCircle() {
				let myCimgs = []
				// console.log(this.imgList)
				if (this.imgList.length != 0) {
					this.imgList.forEach(item => {
						myCimgs.push({
							cimageUrl: item
						})
					})
				}
				let data = {
					cimage: myCimgs,
					content: this.textContent,
					userId: this.gUserid,
					anonymous: 0
					// anonymous: this.isCryptonym == true ? 1 : 0
				}
				addCircle(data).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: '提交成功，审核通过后自动发布',
							icon: 'none',
							duration: 800
						});
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/circle/index'
							})
						}, 800)
					} else {
						this.isFirst = true
					}
				})
			},
			getImgFileList(e) {
				console.log(e)
				this.imgList = e
			},

		},
		mounted() {}
	}
</script>
<style>
	page {
		height: 100% !important;
		background: #F0F1F5;
	}
</style>
<style lang="scss" scoped>
	.wrapper {
		box-sizing: border-box;
		padding: 20rpx;
	}

	.add_brick {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		height: 580rpx;
		border-radius: 20rpx;
		background: #fff;
		box-sizing: border-box;
		padding: 20rpx;
		overflow: hidden;
	}

	.text_area {
		width: inherit;

		textarea {
			width: inherit;
		}
	}

	.pict_area {
		padding-left: 0rpx;
		padding-bottom: 20rpx;
		box-sizing: border-box;

		.addBtn {
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
			background: #F5F6FA;
			@include xCenter;
		}
	}

	.cryptonym_box {
		margin-top: 36rpx;
		box-sizing: border-box;
		padding-left: 40rpx;
	}

	.submitBtn {
		width: 100%;
		height: 80rpx;
		@include xCenter;
		color: #fff;
		font-size: 32rpx;
		background: #1D3156;
		margin-top: 36rpx;
		border-radius: 40rpx;
	}

	.warn {
		color: #999CAA;
		font-size: 28rpx;
		margin-top: 10rpx;
		margin-left: 20rpx;
	}
</style>
