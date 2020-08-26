<template>
	<view class="wrapper">
		<view class="msg_block" v-for="item in list" :key="item.ID" @click="toPage(item.PostId,item.PostType,item.ID)">
			<view class="msg_block_img">
				<image :src="item.Images"></image>
			</view>
			<view style="flex-grow: 2">
				<view class="msg_block_text">
					<text>{{item.UserName}}</text>
					<text>{{item.CreateAt|timeFilter(this)}}</text>
				</view>
				<view class="content">
					<view>{{item.text}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		unReadMessage,
		messageMode
	} from '@/common/http.api.js'
	import {
		timefomat
	} from '@/common/util.js'
	import comment from '@/mycomponents/circle/circleDetail/comment.vue'
	export default {
		components: {
			comment
		},
		data() {
			return {
				list: [],
				pageNum: 1,
				usersId: '',
			}
		},
		filters: {
			timeFilter(val) {
				let FormatTime = ''
				let nowYear = new Date().getFullYear() //当前年
				let nowMonth = new Date().getMonth() + 1 //当前月
				let nowDay = new Date().getDate() //当前日
				if (nowYear == parseInt(val.substr(0, 4)) && nowMonth == parseInt(val.substr(5, 2)) && nowDay == parseInt(val.substr(
						8, 2))) {
					FormatTime = val.substr(11, 5)
					// 	val = val.substr(5, val.length - 9)
					// 	FormatTime = val.split("-")[0] + "月" + val.split("-")[1].split("T")[0] + "日" + " " + val.split("T")[1]
				} else if (nowYear == parseInt(val.substr(0, 4))) {
					val = val.substr(0, val.length - 4)
					FormatTime = parseInt(val.split("-")[1]) + "月" + parseInt(val.split("-")[2].split(
						"T")[0]) + "日"+" " + val.split("T")[1].substr(0,5)
				} else {
					FormatTime = parseInt(val.substr(0, 4)) + "年" + parseInt(val.substr(5, 2)) + "月"
				}
				return FormatTime
			}
		},
		methods: {
			req_unReadMessage(pageN) {
				unReadMessage({
					userId: this.usersId,
					pageNum: pageN,
					pageSize: 10
				}).then(res => {
					if (res.code == 200) {
						this.filters(res.data.message)
						//this.timeFilter(res.data.message)
						this.list.push(...res.data.message)
						if (res.data.totalPageNum > res.data.pageNum) {
							this.onLeadMessage()
						}
					}
				})
			},
			req_messageMode(messgeId) {
				messageMode(messgeId).then(res => {
					if (res.code == 200) {
						this.pageNum = 1
						this.list = []
						this.req_unReadMessage(this.pageNum)
					}
				})
			},
			onLeadMessage() {
				this.pageNum += 1
				this.req_unReadMessage(this.pageNum)
			},
			toPage(pageId, post_type, messgeId) {
				let userId = this.usersId
				this.req_messageMode(messgeId)
				switch (post_type) {
					case 1:
						uni.navigateTo({
							url: "/pages/circle/circleDetail?id=" + pageId + "&UserId=" + userId
						})
						return
					case 2:
						uni.navigateTo({
							url: "/findFriend/infoDetail?id=" + pageId + "&UserId=" + userId
						})
						return
				}
			},
			// timeFilter(val) {
			// 	val.forEach((item)=>{
			// 		item.CreateAt = timefomat(new Date(item.CreateAt), 'MM-dd hh:mm')

			// 	})
			// },
		},
		onLoad() {
			uni.getStorage({
				key: 'userId',
				success: res => {
					this.usersId = res.data
					this.req_unReadMessage(this.pageNum)
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		box-sizing: border-box;
		padding: 20rpx;

		.msg_block {
			display: flex;
			flex-direction: row;
			background: #fff;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);

			.msg_block_img {
				width: 80rpx;
				height: 80rpx;
				margin: 16rpx 30rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.msg_block_text {
				margin-block-start: 16rpx;
				color: gray;
				font-size: 26rpx;

				text:nth-child(1) {
					color: black;
					font-weight: bold;
					font-size: 30rpx;
				}

				text:nth-child(2) {
					float: right;
					margin-inline-end: 30rpx;
				}
			}

			.content {
				max-width: 550rpx;
				@include singleEllipsis font-size: 30rpx;
				margin-block-end: 16rpx;
			}
		}

	}

	.middle {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap-reverse;
	}
</style>
