<template>
	<view class="wrapper">
		<template>
			<view class="lists">
				<view v-for="(item,idx) in edList" :key="idx">
					<view class="list" v-if="item.show==true" @click="edStatus(item.val)">{{item.name}}</view>
				</view>
				<view class="cancel" @click="edStatus(4)">取消</view>
			</view>
		</template>
	</view>
</template>

<script>
	import {
		addFpostCollect,
		delFpostCollect,
		endFpost,
		delgetfpost
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
						name: '举报',
						val: 1,
						show: true
					},
					{
						name: '结束',
						val: 2,
						show: true
					}, {
						name: '删除',
						val: 3,
						show: true
					},
				],
			}
		},
		props: {
			postId: {
				default: ''
			},
			userId: {
				default: ''
			},
			// 收藏状态
			state: {
				default: ''
			},
			accTitle: {
				default: ''
			}
		},
		computed: {
			isMyself() {
				return this.userId == this.gUserid ? true : false
			},
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
			// 弹出框选择
			edStatus(type) {
				this.$emit('edStatus')
				// 0 收藏 1：举报 2：结束  3：删除
				switch (type) {
					case 0:
						if (this.isCollect) {
							this.req_delFpostCollect()
							this.edList[0].name = '收藏'
						} else {
							this.req_addFpostCollect()
							this.edList[0].name = '取消收藏'
						}
						return
					case 1:
						this.toAccusationPage()
						return
					case 2:
						this.req_endFpost()
						return
					case 3:
						this.req_delgetfpost()
						return
				}
			},
			// 添加举报
			toAccusationPage() {
				let data = {
					FpostId: this.postId
				}
				data = JSON.stringify(data)
				let title = this.accTitle
				this.$u.route('/mine/accusationPage', {
					data: data,
					title: title
				})
			},
			// 添加收藏
			req_addFpostCollect() {
				let data = {
					postId: this.postId,
					userId: this.gUserid,
					state: this.state
				}
				// console.log(data)
				addFpostCollect(data).then(res => {
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
			req_delFpostCollect() {
				let data = {
					postId: this.postId,
					userId: this.gUserid,
					state: this.state
				}
				delFpostCollect(data).then(res => {
					if (res.code == 200) {
						myToast('取消成功')
						this.isCollect = false
						// console.log(this.isCollect + "取消")
					}
				})
			},
			// 结束寻伴
			req_endFpost() {
				console.log(this.postId)
				endFpost(this.postId).then(res => {
					if (res.code == 200) {
						myToast('已结束')
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/indexs/findex'
							})
						}, 810)
					} else {
						myToast('稍后再试')
					}
				})
			},
			// 删除寻伴
			req_delgetfpost() {
				let data = {
					postId: this.postId,
					userId: this.userId,
				}
				delgetfpost(data).then(res => {
					if (res.code == 200) {
						myToast('删除成功')
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/indexs/findex'
							})
						}, 810)
					} else {
						myToast('稍后再试')
					}
				})
			}
		},
		created() {
			this.edList[1].show = !this.isMyself //举报
			this.edList[2].show = this.isMyself //结束
			this.edList[3].show = this.isMyself //结束
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
