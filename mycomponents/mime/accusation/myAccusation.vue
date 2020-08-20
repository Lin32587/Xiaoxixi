<template>
	<view class="wrapper">
		<view class="card" v-for="(item,idx) in accinfoList" :key="idx" @click="toStep(item)">
			<!-- <image :src="item."></image> -->
			<view class="ph">
				<u-icon size="100" name="photo" :color="$u.color['lightColor']"></u-icon>
			</view>
			<view class="right">
				<view class="r_top">
					<view class="name">{{nameFilter(item)}}</view>
					<view class="status" v-if="item.State==0">审核中</view>
					<view class="status" v-else>审核通过</view>
				</view>
				<view class="tags">#{{item.Reason.Name}}</view>
				<view class="content">{{item.Description}}</view>
			</view>
		</view>
		<myloading :loading="loading"></myloading>
	</view>
</template>

<script>
	import myloading from '@/mycomponents/common/myLoading.vue'
	import {
		accInformers
	} from '@/common/http.api.js'
	export default {
		components: {
			myloading
		},
		data() {
			return {
				accinfoList: [],
				loading: false,
				pageIdx: 1
			}
		},
		methods: {
			toStep(item) {
				uni.navigateTo({
					url: '/mine/accusationSteps?status='+item.State
				})
			},
			// 获取举报列表
			req_accInformers(isBottom) {
				this.loading = true
				let pageNum = this.pageIdx
				pageNum = isBottom == true ? pageNum++ : pageNum
				let data = {
					InformerId: this.gUserid,
					PageNum: pageNum,
					PageSize: 10
				}
				accInformers(data).then(res => {
					this.loading = false
					if (res.code == 200) {
						if (res.data.informers && res.data.informers.length > 0) {
							this.accinfoList.push(...res.data.informers)
							this.pageIdx = res.data.pageNum + 1
						}
					}
				})
			},
			nameFilter(data) {
				/**
				 ReportedId 被举报者 
				 CpostId 圈子帖子id 
				 FpostId 寻伴帖子id 
				 ActivityId 活动帖子id
				 */
				let name = ''
				if (data.ReportedId != 0) {
					name = '举报用户:' + data.Reported.username
				} else if (data.CpostId != 0) {
					name = '举报圈子帖子:' + data.Cpost.Content
				} else if (data.FpostId != 0) {
					name = '举报寻伴帖子:' + data.Fpost.Description
				} else if (data.ActivityId != 0) {
					name = '举报活动帖子:' + data.Activity.Title
				}
				return name
			}
		},
		created() {
			this.req_accInformers()
		},
		onReachBottom(isBottom) {
			this.req_accInformers()
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		border-radius: 20rpx;
		background: #fff;
		padding: 30rpx 26rpx;
		display: flex;
		box-sizing: border-box;
		margin-bottom: 20rpx;

		.ph {
			border-radius: 10rpx;
			min-width: 200rpx;
			width: 200rpx;
			height: 140rpx;
			margin-right: 34rpx;
			background: rgb(244, 245, 246);
			@include xCenter;
			// background: #ccc;
		}

		.right {
			width: 100%;

			.r_top {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.name {
					max-width: 260rpx;
					color: #393D46;
					font-size: 24rpx;
					@include singleEllipsis
				}

				.status {
					font-size: 20rpx;
					color: #1D3156;
					border: solid 2rpx #1D3156;
					border-radius: 20rpx;
					@include xCenter;
					box-sizing: border-box;
					padding: 4rpx 24rpx
				}
			}

			.tags {
				color: #6F7280;
				font-size: 24rpx;
				margin-top: 20rpx;
			}

			.content {
				margin-top: 16rpx;
				max-width: 400rpx;
				color: #6F7280;
				font-size: 24rpx;
				@include singleEllipsis;
			}
		}

	}
</style>
