<template>
	<view>

		<view class="wrapper">
			<view class="info_card">
				<u-form :model="form" ref="uForm">
					<u-form-item :border-bottom="false" prop="username" label-width="146" label-align="center" label="姓名">
						<u-input v-model="form.username" placeholder="购票人姓名" />
					</u-form-item>
					<u-form-item :border-bottom="false" prop="phone" label-width="146" label-align="center" label="手机">
						<u-input v-model="form.phone" placeholder="购票人手机号" />
					</u-form-item>
					<u-form-item :border-bottom="false" prop="email" label-width="146" label-align="center" label="邮箱">
						<u-input v-model="form.email" placeholder="购票人邮箱" />
					</u-form-item>
					<u-form-item :border-bottom="false" prop="school" label-width="146" label-align="center" label="学校">
						<u-input v-model="form.school" placeholder="您就读的学校" />
					</u-form-item>
					<u-form-item :border-bottom="false" prop="major" label-width="146" label-align="center" label="专业">
						<u-input v-model="form.major" placeholder="您所在的专业" />
					</u-form-item>
					<u-form-item :border-bottom="false" label-width="146" label-align="center" label="推荐人">
						<u-input v-model="form.referrer" placeholder="推荐您购买该产品的朋友" />
					</u-form-item>
				</u-form>
			</view>
		</view>
		<view class="next_btn" @click="submitBtn">下一步</view>
	</view>
</template>

<script>
	import {
		infoOrder
	} from '@/common/http.api.js'
	export default {
		data() {
			return {
				orderId: '',
				form: {
					email: '',
					major: '',
					phone: '',
					referrer: '',
					school: '',
					username: '',
				},
				rules: {
					email: [{
						required: true,
						message: '请输入邮箱',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['blur'],
					}, {
						type: 'email',
						message: '邮箱不正确',
						trigger: ['blur']
					}],
					major: [{
						required: true,
						message: '请输入专业',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['blur'],
					}],
					phone: [{
						required: true,
						message: '请输入手机号码',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['blur'],
					}, {
						// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						trigger: ['blur'],
					}],
					school: [{
						required: true,
						message: '请输入学校',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['blur'],
					}],
					username: [{
						required: true,
						message: '请输入姓名',
						trigger: ['blur'],
					}]
				}
			};
		},
		methods: {
			submitBtn() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.req_infoOrder()
						// console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			},
			req_infoOrder() {
				let data = { ...this.form,
					orderId: parseInt(this.orderId)
				}
				infoOrder(data).then(res => {
					if (res.code == 200) {
						uni.navigateTo({
							url: '/information/comfirmOrder?id=' + this.orderId
						})
					}
				})
			}
		},
		onLoad(e) {
			if (e.id) {
				this.orderId = e.id
			} else {
				uni.showToast({
					title: '未获取订单id，请返回上一页',
					icon: 'none',
					duration: 800
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		box-sizing: border-box;
		padding: 20px 20rpx;
	}

	.info_card {
		width: 100%;
		border-radius: 20rpx;
		background: #fff;
		padding: 36rpx 40rpx;
		box-sizing: border-box;
	}

	.next_btn {
		@include xBtn;
		border-radius: 0rpx;
		position: fixed;
		bottom: 0px;
		height: 100rpx;
	}
</style>
