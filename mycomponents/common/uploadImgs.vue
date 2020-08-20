<template>
	<!-- 上传图片 -->
	<view class="wrapper">
		<u-upload @on-remove="remove" :max-size="1024*1024" @on-choose-complete="imgsChange" width="120" :max-count="3"
		 :custom-btn="true" ref="uUpload" :auto-upload="false">
			<view slot="addBtn" class="baseImg">
				<u-icon name="plus" size="60" color="#ffffff"></u-icon>
			</view>
		</u-upload>
		<!-- <image :src="baseimg"></image> -->
	</view>
</template>

<script>
	import {
		delImg
	} from '@/common/http.api.js'
	import {
		imgPath
	} from '@/common/interface.js'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons,
		},
		data() {
			return {
				baseimg: '',
				fileList: [],
			}
		},
		props: {},
		methods: {
			imgsChange(e) {
				// console.log('添加', e)
				this.req_upload(e[e.length - 1].url).then(res => {
					let rawdata = JSON.parse(res)
					this.fileList.push(rawdata.data.url)
					this.toFather()
				}).catch(() => {
					uni.showToast({
						icon: "none",
						duration: 500,
						title: '上传失败'
					})
				})
			},
			remove(index) {
				this.req_remove(this.fileList[index]).then((res) => {
					this.fileList.splice(index, 1);
				})
				// this.toFather()
			},
			req_upload(url) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: imgPath,
						filePath: url,
						name: 'files',
						success(e) {
							resolve(e.data)
						},
						fail(e) {
							reject(e)
						}
					})
				})
			},
			req_remove(url) {
				return delImg({
					Url: url
				})
			},
			toFather() {
				this.$emit('fileList', this.fileList)
			}
		},
	}
</script>

<style scoped lang="scss">
	.wrapper {
		display: flex;
		flex-wrap: wrap;
	}

	.baseImg {
		width: 120rpx;
		height: 120rpx;
		border-radius: 10rpx;
		background: #F5F6FA;
		margin-right: 18rpx;
		@include xCenter;
	}

	.upload_btn {
		background: #F5F6FA;
		@include xCenter;
	}
</style>
