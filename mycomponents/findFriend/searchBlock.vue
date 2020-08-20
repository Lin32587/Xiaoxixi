<template>
	<view class="searchWrapper" @click="toDetailPage">
		<view class="searchTop">
			<view class="sleft">
				<image v-if="postImg!=false" class="ph" :src="postImg"></image>
				<view v-else class="ph">
					<u-icon name="photo" size="60" color="#c0c4cc"></u-icon>
				</view>
			</view>
			<view class="sright">
				<view class="rightTop">
					<view class="title">{{searchData.Title}}</view>
					<view class="date">{{searchData.CreateAt|timeFilter}}</view>
				</view>
				<view class="content">{{searchData.Title}}</view>
			</view>
		</view>
		<view class="searchBottom">
			<!-- 种类 InfoType:1 校内 2 校析析 3校外 -->
			结果来源:<span>{{sourceFilter()}}</span>
		</view>
	</view>
</template>

<script>
	import {
		timefomat
	} from '@/common/util.js'
	import {
		publicImgPath
	} from '@/common/interface.js'
	export default {
		data() {
			return {
				timefomat: timefomat,
				publicImgPath: publicImgPath
			}
		},
		filters: {
			timeFilter(val) {
				let data = timefomat(new Date(val), 'yyyy-MM-dd hh:mm')
				return data
			},
		},
		props: {
			searchData: {
				default: ''
			},
		},
		computed: {
			searchType() {
				//0 寻伴 1 资讯
				if (this.searchData != '') {
					if (this.searchData.State == 0) {
						return 0
					} else if (this.searchData.State == 1) {
						return 1
					}
				} else {
					return false
				}
			},
			postImg() {
				//0 寻伴 1 资讯
				if (this.searchData != '') {
					if (this.searchData.State == 0) {
						if (this.searchData.Fimage.length <= 0) {
							return false
						} else {
							return this.publicImgPath + this.searchData.Fimage[0]
						}
					} else if (this.searchData.State == 1) {
						if (this.searchData.IImage && this.searchData.IImage != null) {
							return this.publicImgPath + this.searchData.IImage
						} else {
							return false
						}
					}
				} else {
					return false
				}
			}
		},
		methods: {
			sourceFilter() {
				let preFix = ''
				let name = ''
				let rawdata = this.searchData
				if (rawdata.State == 0) {
					preFix = '寻伴'
				} else if (rawdata.State == 1) {
					preFix = '资讯-'
					switch (rawdata.InfoType) {
						case 1:
							name = "校内"
							break
						case 2:
							name = '校析析'
							break
						case 3:
							name = "校外"
							break
					}
				}
				let str = preFix + name
				return str
			},
			toDetailPage() {
				if (this.searchType == 1) {
					this.$u.route('/information/activityDetail', {
						id: this.searchData.Id
					})
				} else if (this.searchType == 0) {
					this.$u.route('/findFriend/infoDetail', {
						id: this.searchData.Id
					})
				}
			}
		},

	}
</script>

<style lang="scss" scoped>
	.searchTop {
		display: flex;

		.sleft {
			.ph {
				width: 124rpx;
				height: 124rpx;
				border-radius: 10rpx;
				background: $xPhbg;
				@include xCenter;
			}
		}

		.sright {
			width: 100%;
			margin-left: 22rpx;

			.rightTop {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				align-items: center;

				.title {
					color: #1D3156;
					font-size: 32rpx;
					font-weight: bold;
				}

				.date {
					color: #B2B2B2;
					font-size: 24rpx;
				}
			}

			.content {
				color: #999999;
				font-size: 24rpx;
				@include mEllipsis;
				margin-top: 4rpx;
			}
		}
	}

	.searchBottom {
		color: #999999;
		font-size: 20rpx;
		margin-top: 20rpx;
	}
</style>
