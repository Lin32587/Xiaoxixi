<template>
	<view class="wrapper">
		<template>
			<view class="lists">
				<view v-for="(item,idx) in edList" :key="idx">
					<view class="list" @click="edStatus(item.val)" v-if="item.show==true">{{item.name}}</view>
				</view>
				<view class="cancel" @click="edStatus(3)">取消</view>
			</view>
		</template>
	</view>
</template>

<script>
	import {
		cpostCollect,
		cpostDel,
		delCollect
	} from '@/common/http.api.js'
	import {
		myToast
	} from '@/common/util.js'
	export default {
		data() {
			return {
				isCollect: false,
				edList: [{
						name: '收藏',
						val: 0,
						show: true
					},
					{
						name: '删除',
						val: 1,
						show: true
					},
					{
						name: '举报',
						val: 2,
						show: true
					},
				],
			}
		},
		computed: {
			isMyself() {
				// console.log(this.userId, this.gUserid)
				return this.userId === this.gUserid ? true : false
			},
		},
		props: {
			delable: {
				default: true
			},
			userId: {
				default: ''
			},
			postId: {
				default: ''
			},
			// 收藏状态
			state: {
				default: ''
			},
			// for举报  标题
			postTitle: {
				default: ''
			}

		},
		onReady() {
			this.isCollectFunc()
		},
		methods: {
			isCollectFunc() {
				if (this.state) {
					// console.log(this.state)
					this.isCollect = true
					// this.edList[0].name = '取消收藏'
					// console.log(this.isCollect)
				}
				// console.log(this.isCollect + "初始")
				if (this.isCollect) {
					this.edList[0].name = '取消收藏'
				}
			},
			//弹出选择框
			edStatus(type) {
				this.$emit('edStatus', type);
				let commonData = {
					postId: this.postId,
					userId: this.gUserid,
					state: this.state
				}
				// console.log(type);
				switch (type) {
					// 0收藏  1删除  2 举报
					case 0:
						if (this.isCollect) {
							this.req_delCollect(commonData)
							this.edList[0].name = '收藏'
						} else {
							this.req_cpostCollect(commonData)
							this.edList[0].name = '取消收藏'
						}
						// console.log(commonData)
						return
					case 1:
						this.req_cpostDel(commonData)
						return
					case 2:
						this.toAccupage()
						return
				}

			},
			// 举报
			toAccupage() {
				let data = {
					CpostId: this.postId
				}
				let title = this.postTitle
				data = JSON.stringify(data)
				this.$u.route('/mine/accusationPage', {
					data: data,
					title: title
				})
			},
			// 添加收藏
			req_cpostCollect(data) {
				cpostCollect(data).then(res => {
					if (res.code == 200) {
						myToast('收藏成功')
						this.isCollect = true
						// console.log(this.isCollect + "收藏")
					} else {
						myToast('收藏失败')
					}
				})
			},
			// 取消收藏
			req_delCollect(data) {
				delCollect(data).then(res => {
					if (res.code == 200) {
						myToast('取消成功')
						this.isCollect = false
						// console.log(this.isCollect + "取消")
					}
				})
			},
			// 删除帖子
			req_cpostDel(data) {
				cpostDel(data).then(res => {
					if (res.code == 200) {
						myToast('删除成功')
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/circle/index'
							})
						}, 820)
					} else {
						myToast('删除失败')
					}
				})
			},
		},
		created() {
			this.edList[1].show = this.isMyself
			this.edList[2].show = !this.isMyself
		}
	}
</script>

<style lang="scss" scoped>
	.lists {
		width: 100%;
		background: #fff;
		padding-bottom: 10rpx;

		@mixin Base {
			font-size: 28rpx;
			height: 76rpx;
			background: #fff;
			@include xCenter;
			width: 630rpx;
			margin: 0 auto;
		}

		.list {
			@include Base;
			border-bottom: solid 2rpx #F5F6FA;
		}

		.cancel {
			@include Base;
			border-top: solid 2rpx #F5F6FA;

		}
	}
</style>
