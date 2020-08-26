<template>
	<view>
		<u-form :model="form" ref="uForm" :errorType="['message']">
			<view class="brick_style">
				<brick-shell title="举报对象">
					<!-- <view class="brick_box">
					<view class="btitle">举报对象</view> -->
					<u-form-item prop="target" label-width="0" :border-bottom="false">
						<u-input v-model="form.target" placeholder="您要举报的用户或帖子" />
					</u-form-item>
					<!-- </view> -->
				</brick-shell>
			</view>
			<view class="brick_style">
				<brick-shell title="举报理由">
					<u-form-item prop="reason" label-width="0" :border-bottom="false">
						<u-input v-model="form.reason" type="select" @click="show = true" placeholder="请选择理由" />
						<u-action-sheet :list="reasonList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
					</u-form-item>
				</brick-shell>
			</view>
			<view class="brick_style">
				<brickShell title="文字描述">
					<view>
						<u-form-item prop="describe" label-width="0" :border-bottom="false">
							<u-input v-model="form.describe" type="text" placeholder="写下本次举报相关信息,帮助客服快速了解情况" />
						</u-form-item>
						<view style="margin-top: 36rpx;margin-bottom:20rpx">
							<uploadImgs @fileList="getImglist"></uploadImgs>
						</view>
					</view>
				</brickShell>
			</view>
		</u-form>
		<u-modal v-model="modalshow" :cancel-style="textStyle" :confirm-style="textStyle" :mask-close-able="true" content="您可以查看举报详情或回到主页"
		 title="举报成功" :show-cancel-button="true" confirm-text="查看详情" cancel-text="回到主页" @confirm="confirmBtn" @cancel="cancelBtn"></u-modal>
		<view class="accute_btn" @click="submit">发起举报</view>
	</view>
</template>

<script>
	import {
		accReason,
		addAcc
	} from '@/common/http.api.js'
	import uploadImgs from '@/mycomponents/common/uploadImgs.vue'
	import brickShell from '@/mycomponents/findFriend/brickShell.vue'
	export default {
		components: {
			brickShell,
			uploadImgs
		},
		data() {
			return {
				form: {
					target: '',
					describe: '',
					reason: '',
					reasonId: '',
				},
				rules: {
					target: [{
						required: true,
						message: '请输入要举报的用户或帖子',
						trigger: ['blur'],
					}],
					reason: [{
						required: true,
						message: '请选择举报理由',
						trigger: ['blur'],
					}],
					describe: [{
						required: true,
						message: '请输入文字描述',
						trigger: ['blur'],
					}],
				},
				reasonList: [],
				show: false,
				imgList: [],
				textStyle: {
					fontSize: '36rpx',
					color: '#1D3156'
				},
				modalshow: false,
				isFirst: true,
			}
		},
		props: {
			title: {
				default: ''
			},
			reqdata: {
				default: ''
			}
		},
		methods: {
			actionSheetCallback(i) {
				this.form.reason = this.reasonList[i].Name
				this.form.reasonId = this.reasonList[i].Id
			},
			// 添加表单
			submit() {
				if (this.isFirst) {
					this.isFirst = false;
					this.$refs.uForm.validate(valid => {
						if (valid) {
							this.req_addAcc()
							// console.log('验证通过');
						} else {
							console.log('验证失败');
							this.isFirst = true;
						}
					});
				}

			},
			// 获取理由
			req_accReason() {
				accReason().then(res => {
					if (res.code == 200) {
						this.reasonList = res.data.map(item => {
							let data = {
								...item,
								text: item.Name
							}
							return data
						})
					}
				})
			},
			// 获取图片
			getImglist(e) {
				this.imgList = e
			},
			// 添加举报
			req_addAcc() {
				let item = JSON.parse(this.reqdata)
				let myimgs = this.imgList.map(item => {
					let data = {
						image: item
					}
					return data
				})
				let data = {
					InformerId: this.gUserid,
					...item,
					description: this.form.describe,
					reasonId: this.form.reasonId,
					image: myimgs
				}
				addAcc(data).then(res => {
					if (res.code == 200) {
						this.modalshow = true
					} else {
						this.isFirst = true
					}
				})
			},
			confirmBtn() {
				this.$emit('switchTab')
			},
			cancelBtn() {
				uni.switchTab({
					url: '/pages/indexs/mindex'
				})
			}
		},
		mounted() {
			this.$refs.uForm.setRules(this.rules);
			this.form.target = this.title
		},
		created() {
			this.req_accReason()
		}
	}
</script>

<style lang="scss" scoped>
	.brick_style {
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}

	.accute_btn {
		@include xBtn;
		margin-top: 40rpx;
	}

	.brick_box {
		box-sizing: 20rpx;
		border-radius: 20rpx;
		background: #fff;
		padding: 20rpx;
		margin-bottom: 30rpx;
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);

		.btitle {
			font-size: 28rpx;
			color: #393D46;
			box-sizing: border-box;
			padding-left: 20rpx;
			border-left: solid 4rpx #393D46;
		}
	}
</style>
