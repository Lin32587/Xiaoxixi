<template>
	<view class="wrapper">
		<view class="card_wrapper">
			<u-cell-group :border="false">
				<u-field :disabled="true" v-model="form.name" label="姓名" placeholder="请填写姓名"></u-field>
				<u-field :disabled="true" v-model="form.degree" label="学历" placeholder="请填写学历"></u-field>
				<view>
					<u-field :disabled="true" v-model="form.school" label="学校" placeholder="学校" right-icon="arrow-down-fill"></u-field>
					<!-- <u-action-sheet  @click="clickItem" :list="sexList" v-model="show"></u-action-sheet> -->
				</view>
				<u-field :disabled="true" v-model="form.college" label="学院" placeholder="请填写学院"></u-field>
				<u-field :disabled="true" v-model="form.major" label="专业" placeholder="请填写专业"></u-field>
				<u-field :disabled="true" v-model="form.startYear" label="入学年份" placeholder="请填写入学年份"></u-field>
				<u-field :disabled="true" v-model="form.pict" label="上传照片" placeholder="学生证/校园卡/录取通知书" disabled></u-field>
			</u-cell-group>
			<image class="stu_pict" v-if="form.schoolpict&&form.schoolpict!=''" :src="publicImgPath+form.schoolpict"></image>
			<!-- <view class="stu_pict"></view> -->
		</view>
		<view class="modify" @click="toEdit">修改认证</view>
	</view>
</template>

<script>
	import {
		getUser
	} from '@/common/http.api.js'
	import {
		publicImgPath
	} from '@/common/interface.js'
	export default {
		data() {
			return {
				publicImgPath: publicImgPath,
				form: {
					school: ""
				}
			};
		},
		methods: {
			toEdit() {
				uni.navigateTo({
					url: "/mine/editCertification"
				});
			},
			req_getUser() {
				getUser({
					Id: this.gUserid
				}).then(res => {
					if (res.code == 200) {
						let d = res.data
						let mform = {
							name: d.name,
							degree: d.educationalBackground,
							school: d.school,
							college: d.college,
							major: d.major,
							startYear: d.enrollmentYear,
							schoolpict: d.DegreeImage
						}
						this.form = mform
					}
				})
			}
		},
		onLoad() {
			this.req_getUser()
		}
	};
</script>

<style lang="scss" scoped>
	.wrapper {
		padding: 36rpx 10px;
		padding-bottom: 0rpx;
	}

	.card_wrapper {
		width: 100%;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 20rpx 40rpx;
		padding-bottom: 50rpx;
		box-sizing: border-box;
	}

	.stu_pict {
		width: 100%;
		height: 400rpx;
		border-radius: 20rpx;
		background: #ccc;
		margin: 0 auto;
		margin-top: 54rpx;
	}

	.modify {
		@include xBtn;
		margin-top: 40rpx;
	}
</style>
