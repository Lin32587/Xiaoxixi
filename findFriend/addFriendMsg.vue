<template>
	<view class="wrapper">
		<u-form :model="form" ref="uForm">
			<view class="brick_box">
				<view class="title">标题</view>
				<u-form-item prop="title" :label-width="0" :border-bottom="false">
					<u-input :border="false" v-model="form.title" placeholder="输入信息显示的标题" />
				</u-form-item>
			</view>
			<view class="brick_box">
				<view class="title">类别</view>
				<u-form-item prop="type" :label-width="0" :border-bottom="false">
					<u-input v-model="form.type" type="select" :border="false" @click="typeShow = true" />
					<u-select value-name="Id" v-model="typeShow" mode="mutil-column-auto" :list="asyncList" @confirm="typeConfirm"></u-select>
					<!-- <u-action-sheet :list="typeList" v-model="typeShow" @click="typeCallback"></u-action-sheet> -->
				</u-form-item>
			</view>
			<view class="brick_box">
				<view class="title">关键词</view>
				<u-form-item :label-width="0" prop="keyWords" :border-bottom="false">
					<u-input :border="false" v-model="form.keyWords" placeholder="关键词以'#'分割" />
				</u-form-item>
			</view>
			<view class="brick_box">
				<view class="title">学校</view>
				<u-form-item prop="school" :label-width="0" :border-bottom="false">
					<view class="u-flex" v-if="form.school">
						<u-input class="u-flex-1" v-model="form.school" :border="false" :clearable="false" @click="chooseSchool" />
						<image class="clear_ico" src="../static/img/clear.png" mode="" @click="form.school = ''"></image>
					</view>
					<u-input v-model="form.school" type="select" :border="false" @click="chooseSchool" v-else />
					<!-- 					<u-picker mode="selector" v-model="schoolShow" :range="schoolList" range-key="name" @confirm="regionConfirm"></u-picker> -->
				</u-form-item>
			</view>
			<view class="brick_box">
				<view class="title">地域</view>
				<u-form-item prop="area" :label-width="0" :border-bottom="false">
					<view class="u-flex" v-if="form.area">
						<u-input class="u-flex-1" v-model="form.area" :clearable="false" :border="false" @click="form.school ? '' : areaShow = true" />
						<image class="clear_ico" src="../static/img/clear.png" mode="" @click="clearArea"></image>
					</view>
					<u-input v-model="form.area" type="select" :border="false" @click="form.school ? '' : areaShow = true" v-else />
					<u-picker mode="region" v-model="areaShow" :area-code='["13", "1303", "130304"]' @confirm="regionConfirm"></u-picker>

					<!-- <u-action-sheet :list="areaList" v-model="areaShow" @click="areaCallback"></u-action-sheet> -->
				</u-form-item>
			</view>
			<view class="brick_box">
				<view class="title">要求</view>
				<u-form-item :label-width="0" :border-bottom="false">
					<u-input type="text" :border="false" v-model="form.require" placeholder="写下您对参与伙伴的要求吧" />
				</u-form-item>
			</view>
			<view class="brick_box">
				<view class="title">文字描述</view>
				<u-form-item prop="describe" :label-width="0" :border-bottom="false">
					<u-input type="textarea" :border="false" :clearable="false" :maxlength="maxLength" v-model="form.describe" :height="212"
					 :disabled="textAble" :placeholder="textContent" />
				</u-form-item>
				<uploadImgs @fileList="getImgFileList"></uploadImgs>
			</view>
			<view class="mt10">
				<cryptonymBtn :show.sync="isCryptonym"></cryptonymBtn>
			</view>
			<view class="baseBtn mt10" @click="submitBtn">发布</view>
			<view class="word_count">
				上限{{maxLength}}字，当前已输入{{form.describe.length}}字
			</view>
		</u-form>
	</view>
</template>

<script>
	import {
		fcategory1,
		addfpost,
		maxLength
	} from '@/common/http.api.js'
	import schoolList from '../mine/allSchool.js'
	import cryptonymBtn from '@/mycomponents/common/cryptonymBtn.vue'
	import uploadImgs from '@/mycomponents/common/uploadImgs.vue'
	import brickShell from '@/mycomponents/findFriend/brickShell.vue'
	export default {
		components: {
			cryptonymBtn,
			uploadImgs,
			brickShell
		},
		data() {
			return {
				form: {
					typeid: '',
					areaid: '',
					describe: '',
					school: ''
				},
				imgList: [],
				rules: {
					title: [{
						required: true,
						message: '请输入标题',
						trigger: ['blur']
					}],
					type: [{
						required: true,
						message: '请选择类别',
						trigger: ['blur']
					}],
					// area: [{
					// 	required: true,
					// 	message: '请选择地域',
					// 	trigger: ['blur']
					// }],
					describe: [{
						required: true,
						message: '请输入描述',
						trigger: ['blur']
					}],
				},
				typeShow: false,
				areaShow: false,
				schoolShow: false,
				isCryptonym: false,
				schoolList: schoolList,
				asyncList: [],
				typeList: [{
						text: '哈哈哈'
					},
					{
						text: '哈哈哈'
					},
					{
						text: '哈哈哈'
					},
				],
				areaList: [{
						text: '地域1'
					},
					{
						text: '地域2'
					},
					{
						text: '地域3'
					},
				],
				isFirst: true,
				textContent: '写下您想发布的寻伴信息',
				textAble: false,
				postContent: '',
				maxLength: 0
			};
		},
		watch: {
			//文本描述可用性--类型
			typeShow(newBool, oldBool) {
				if (newBool) {
					this.textContent = ''
					this.postContent = this.form.describe
					this.form.describe = ''
				} else {
					this.textContent = '写下您想发布的寻伴信息'
					this.form.describe = this.postContent
				}
				this.textAble = !this.textAble
				console.log(newBool, oldBool, this.textAble, this.textContent, this.postContent)
			},
			//文本描述可用性--地域
			areaShow(newBool, oldBool) {
				if (newBool) {
					this.textContent = ''
					this.postContent = this.form.describe
					this.form.describe = ''
				} else {
					this.textContent = '写下您想发布的寻伴信息'
					this.form.describe = this.postContent
				}
				this.textAble = !this.textAble
				console.log(newBool, oldBool, this.textAble, this.textContent)
			}
		},
		onLoad() {
			this.initMaxLength()
		},
		methods: {
			initMaxLength() {
				maxLength({
					types: '寻伴'
				}).then(res => {
					this.maxLength = res.data.Total
				}).catch()
			},
			clearArea() {
				this.form.area = ''
				this.form.areaid = ''
			},
			chooseSchool() {
				if (!this.form.area) {
					this.$u.route('/mine/schoolSearch')
				}
			},
			typeCallback(index) {
				this.form.type = this.typeList[index].text
			},
			areaCallback(idx) {
				this.form.area = this.areaList[idx].text
			},
			// 图片
			getImgFileList(e) {
				console.log(e)
				this.imgList = e
			},
			req_fcategory1() {
				fcategory1().then(res => {
					if (res.code == 200) {
						this.asyncList = res.data
						// console.log(this.asyncList)
					}
				})
			},
			handleChildren(e) {
				let arr = e.map(item => {
					let data = { ...item,
						value: item.Id
					}
					return data
				})
				return arr
			},
			typeConfirm(e) {
				console.log(e)
				let lastIdx = e.length - 1
				this.form.type = e[lastIdx].label
				this.form.typeid = e[lastIdx].value
			},
			regionConfirm(e) {
				console.log(e)
				if (e.area.value == "null") {
					this.form.area = e.province.label + e.city.label
					this.form.areaid = e.city.value + '00'
				} else {
					this.form.area = e.province.label + e.city.label + e.area.label
					this.form.areaid = e.area.value
				}
			},
			// 添加寻伴
			req_addfpost() {
				let f = this.form
				let myImgs = []
				if (this.imgList.length > 0) {
					this.imgList.forEach(item => {
						myImgs.push({
							fimageUrl: item
						})
					})
				}
				let data = {
					description: f.describe,
					fimage: myImgs.length >= 0 ? myImgs : '',
					// anonymous: this.isCryptonym == false ? 0 : 1, //0不匿名  1匿名
					anonymous: 0, //0不匿名  1匿名
					keyword: f.keyWords ? f.keyWords : '',
					require: f.require,
					college: f.school, //大学
					territory: parseInt(f.areaid), //地域,
					title: f.title,
					typeId: f.typeid, //类别 第二
					userId: this.gUserid
				}
				addfpost(data).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: '提交成功，审核通过后自动发布',
							icon: 'none',
							duration: 700
						})
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/indexs/findex'
							})
						}, 800)
					} else {
						this.isFirst = true
					}
				})
			},
			submitBtn() {
				if (this.isFirst) {
					this.isFirst = false;
					let res = this.keyWordValid()
					this.$refs.uForm.validate(valid => {
						if (valid == true && res == true) {
							this.req_addfpost()
						} else {
							console.log('验证失败');
							this.isFirst = true;
						}
					});
				}
			},
			keyWordValid() {
				if (this.form.keyWords) {
					let result = /#/.test(this.form.keyWords)
					if (result == false) {
						uni.showToast({
							icon: 'none',
							title: '关键词以#号分割',
							duration: 800
						})
						return false
					} else {
						return true
					}
				} else {
					return true
				}

			}
		},
		onShow() {
			this.req_fcategory1()
		},
		mounted() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		box-sizing: border-box;
		padding: 20rpx;
		padding-bottom: 0px;
	}

	.brick_box {
		box-sizing: 20rpx;
		border-radius: 20rpx;
		background: #fff;
		padding: 20rpx;
		margin-bottom: 30rpx;
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);

		.title {
			font-size: 28rpx;
			color: #393D46;
			box-sizing: border-box;
			padding-left: 20rpx;
			border-left: solid 4rpx #393D46;
		}

		.clear_ico {
			width: 32rpx;
			height: 32rpx;
			margin-right: 16rpx;
		}
	}

	.mt10 {
		margin-top: 20rpx;
	}

	.baseBtn {
		@include xBtn;
		font-size: 36rpx;
		height: 80rpx;
	}

	.word_count {
		margin-top: 30rpx;
		margin-bottom: 54rpx;
		font-size: 28rpx;
		color: #999CAA;
		text-align: center;
	}
</style>
