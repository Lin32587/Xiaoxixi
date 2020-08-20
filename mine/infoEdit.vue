<template>
	<view class="wrapper">
		<view class="card">
			<view class="option">
				<view class="title">昵称</view>
				<input v-model="form.nickName" maxlength="16" placeholder="郑同学" />
			</view>
			<view class="option">
				<view class="title">签名</view>
				<input v-model="form.sign" placeholder="厚德博学,追求卓越" />
			</view>
		</view>
		<view class="save_btn" @click="save_btn">保存信息</view>
	</view>
</template>

<script>
	import {
		editProfile,
		getUser
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				form: {
					nickName: '',
					sign: '',
				},
				isFirst: true,
			};
		},

		onReady() {
			this.req_getProfile()
		},

		methods: {
			req_getProfile() {
				let data = {
					Id: this.gUserid
				}
				getUser(data).then(res => {
					if (res.code == 200) {
						this.form.nickName = res.data.username
						this.form.sign = res.data.signature
					}
				})
			},

			save_btn() {
				if (this.isFirst) {
					this.isFirst = false
					if (this.form.nickName != '') {
						this.req_editProfile()
					}
					// uni.switchTab({
					// 	url: '/pages/indexs/mindex'
					// })
				}
			},

			//修改信息
			req_editProfile() {
				let formData = this.form
				// console.log(formData)
				let data = {
					id: this.gUserid,
					username: formData.nickName,
					signature: formData.sign,
				}
				// console.log(data)
				editProfile(data).then(res => {
					if (res.code == 200) {
						uni.showToast({
							icon: 'none',
							title: '修改成功',
							duration: 500
						})
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/indexs/mindex'
							})
						}, 800)
					} else {
						this.isFirst = true
					}
				})
			}
		}
	}
</script>
<style>
	page {
		height: 100% !important;
		background: #F5F6FA 100%;
	}
</style>
<style lang="scss" scoped>
	.wrapper {
		box-sizing: border-box;
		padding: 36rpx 20rpx;
	}

	.card {
		border-radius: 20rpx;
		padding: 28rpx 44rpx;
		padding-top: 1rpx;
		background: #fff;

		.option {
			display: flex;
			margin-top: 43rpx;

			.title {
				font-size: 32rpx;
				color: #393D46;
				margin-right: 78rpx;
			}
		}
	}

	.save_btn {
		width: 100%;
		@include xCenter;
		color: #fff;
		background: #1D3156;
		height: 80rpx;
		margin-top: 36rpx;
		border-radius: 40rpx;
	}
</style>
