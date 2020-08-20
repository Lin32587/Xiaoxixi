<template>
	<view>
		<view class="header">
			<u-search @change="changeEvent" @search="searchEvent" @custom="customEvent" placeholder="请输入学校" v-model="keyword"></u-search>
		</view>
		<view class="coreBox" v-if="dataList.length>0">
			<view class="h_item" v-for="(item,idx) in dataList" :key="idx" @click="toEdPage(item)">
				<u-icon name="play-right-fill" size="30" color="#606266"></u-icon>
				<!-- #ifndef MP-WEIXIN -->
				<view class="title" v-html="keywordFilter(item.name)"></view>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<view class="title">{{item.name}}</view>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>
<script>
	import schoolList from './allSchool.js'
	export default {
		data() {
			return {
				rawList: schoolList,
				tempSearchList: [],
				keyword: '',
				dataList: []
			};
		},
		computed: {
			firstKeyword() {
				return this.keyword == '' ? '' : this.keyword.substring(0, 1)
			}
		},
		watch: {
			firstKeyword(val, oldval) {
				this.getNewTemList(val)
			}
		},
		methods: {
			changeEvent() {
				let arr = []
				if (this.keyword != '') {
					// 搜索临时数组
					if (this.tempSearchList.length == 0) {
						this.getNewTemList(this.firstKeyword)
					}
					// console.log('临时', this.tempSearchList)
					arr = this.tempSearchList.filter(item => {
						if (item.name.indexOf(this.keyword) >= 0) {
							return true
						} else {
							return false
						}
					})
				}
				this.dataList = arr
			},
			getNewTemList(val) {
				if (val == '') {
					this.tempSearchList = []
				} else {
					let arr = this.rawList.filter(item => {
						if (item.name.indexOf(val) >= 0) {
							return true
						} else {
							return false
						}
					})
					this.tempSearchList = arr
				}
			},
			keywordFilter(val) {
				let str = this.keyword
				let result = val.replace(new RegExp(str, 'g'), '<text class="my_highlight">' + str + '</text>');
				return result
			},
			searchEvent() {},
			customEvent() {
				this.changeEvent()
			},
			doSearch(type, val) {
				// type 0 原始  1 临时数组
			},
			toEdPage(item) {
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				prevPage.$vm.form.school = item.name
				uni.navigateBack({
					delta: 1
				})
				// this.$u.route('/mine/editCertification', {
				// 	schoolName: item.name
				// })
			}
		},
		created() {}
	}
</script>
<style lang="scss" scoped>
	.header {
		background: #fff;
		box-sizing: border-box;
		padding: 20rpx 40rpx
	}

	.coreBox {
		width: 90%;
		margin: 0 auto;
		margin-top: 20rpx;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20px 40rpx;
		background: #fff;
		max-height: 85vh;
		overflow-y: auto;

		.h_item {
			margin-bottom: 20rpx;
			display: flex;

			.title {
				margin-left: 20rpx;
				font-size: 30rpx;
				color: #606266;
			}
		}
	}
</style>
