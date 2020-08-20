<template>
	<view class="wrapper">
		<view class="card_wrapper">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<u-form-item prop="name" label-width="128" :border-bottom="false" label="姓名">
					<u-input placeholder="您的真实姓名" v-model="form.name" />
				</u-form-item>
				<u-form-item prop="degree" label-width="128" :border-bottom="false" label="学历">
					<u-input placeholder="您当前的学历" v-model="form.degree" type="select" @click="degreeShow=true" />
					<u-select v-model="degreeShow" mode="single-column" :list="degreeList" @confirm="degreeConfirm"></u-select>
				</u-form-item>
				<u-form-item prop="school" label-width="128" :border-bottom="false" label="学校">
					<u-input placeholder="未选择" v-model="form.school" type="select" @click="chooseSchool" />
				</u-form-item>
				<u-form-item prop="college" label-width="128" :border-bottom="false" label="学院">
					<u-input placeholder="您所在的学院名称" v-model="form.college" />
				</u-form-item>
				<u-form-item prop="major" label-width="128" :border-bottom="false" label="专业">
					<u-input placeholder="您就读的专业" v-model="form.major" />
				</u-form-item>
				<u-form-item prop="year" label-width="128" :border-bottom="false" label="入学年份">
					<u-input placeholder="您入学的年份" v-model="form.year" type="select" @click="timeShow=true" />
					<u-picker mode="time" v-model="timeShow" :params="timeParams" @confirm="timeConfirm"></u-picker>
				</u-form-item>
				<u-form-item label-width="128" :border-bottom="false" label="上传照片">
					<u-input v-model="form.pictwran" :disabled="true" />
				</u-form-item>
			</u-form>
			<view>
				<u-upload @on-remove="remove" :max-size="1024*1024" @on-choose-complete="imgsChange" :custom-btn="true" max-count="1"
				 ref="uUpload" :action="action" :auto-upload="false">
					<view slot="addBtn" class="stu_pict">
						<u-icon name="plus" size="100" color="#fff"></u-icon>
					</view>
				</u-upload>
			</view>
		</view>
		<view class="modify" @click="submit">提交认证</view>
	</view>
</template>

<script>
	import {
		addAuthUser,
		getUser
	} from '@/common/http.api.js'
	import {
		imgPath
	} from '@/common/interface.js'
	import {
		delImg
	} from '@/common/http.api.js'
	export default {
		data() {
			return {
				errorType: ['message'],
				form: {
					school: '',
					pictwran: "学生证/校园卡/录取通知书",
					degreeImage: ''
				},
				timeShow: false,
				timeParams: {
					year: true,
					month: true,
				},
				degreeShow: false,
				degreeList: [{
					label: '高中',
					value: '高中'
				}, {
					label: '大专',
					value: '大专'
				}, {
					label: '本科',
					value: '本科'
				}, {
					label: '研究生',
					value: '研究生'
				}, {
					label: '博士',
					value: '博士'
				}],
				rules: {
					name: [{
						required: true,
						message: "请输入姓名",
						trigger: ["blur"]
					}],
					degree: [{
						required: true,
						message: "请输入学历",
						trigger: ["blur"]
					}],
					school: [{
						required: true,
						message: "请选择学校",
						trigger: ["blur"]
					}],
					college: [{
						required: true,
						message: "请输入学院",
						trigger: ["blur"]
					}],
					major: [{
						required: true,
						message: "请输入专业",
						trigger: ["blur"]
					}],
					year: [{
						required: true,
						message: "请输入入学年份",
						trigger: ["blur"]
					}]
				},
				sex: "",
				sexList: [{
						text: "男"
					},
					{
						text: "女"
					},
					{
						text: "保密"
					}
				],
				show: false,
				action: "http://www.example.com/upload"
			};
		},
		methods: {
			showAction() {
				this.show = true;
			},
			schoolCallback(e) {
				this.form.school = this.sexList[e].text;
			},
			onUploaded(lists) {
				this.filesArr = lists;
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if (this.form.degreeImage == '') {
							this.gmyToast('请上传学生证')
							return
						}
						this.req_addAuthUser()
						// console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			},
			chooseSchool() {
				this.$u.route('/mine/schoolSearch')
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
			},
			req_addAuthUser() {
				let f = this.form
				console.log('来了', f)
				console.log(this.gUserid)
				let data = {
					id: this.gUserid,
					name: f.name,
					educationalBackground: f.degree, //学历
					school: f.school,
					college: f.college,
					major: f.major,
					enrollmentYear: f.year, //入学年份
					degreeImage: f.degreeImage
				}
				addAuthUser(data).then(res => {
					if (res.code == 200) {
						this.gmyToast('提交成功')
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/indexs/mindex'
							})
						}, 810)
					}
				})
			},
			timeConfirm(e) {
				this.form.year = e.year + '年' + e.month + '月'
			},
			degreeConfirm(e) {
				this.form.degree = e[0].value
			},
			imgsChange(e) {
				this.req_upload(e[e.length - 1].url).then(res => {
					let rawdata = JSON.parse(res)
					this.form.degreeImage = rawdata.data.url
					// console.log(this.form.degreeImage)
				})
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
			remove(index) {
				this.req_remove(this.form.degreeImage).then((res) => {
					// this.fileList.splice(index, 1);
				})
			},
			req_remove(url) {
				return delImg({
					Url: url
				})
			},
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(e) {
			this.req_getUser()
			if (e.schoolName) {
				this.form.school = e.schoolName
			}
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
		width: 634rpx;
		height: 292rpx;
		border-radius: 20rpx;
		background: #f5f6fa;
		margin: 0 auto;
		margin-top: 54rpx;
		@include xCenter;
	}

	.modify {
		@include xBtn;
		margin-top: 40rpx;
		margin-bottom: 30rpx;
	}
</style>
