<template>
	<view class="wrapper">
		<view class="msg_block" v-for="item in list" :key="item.ID" @click="toPage(item.PostId,item.PostType,item.ID)">
			<comment>
				<view class="msg_block_text">{{item.CreateAt}}</view>
				<view class="content">
					<view>{{item.UserName}} {{item.text}}</view>
				</view>
			</comment>
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
				usersId: ''
			}
		},
		methods: {
			req_unReadMessage(pageN){
				unReadMessage({
					userId: 33,
					pageNum: pageN,
					pageSize: 10
				}).then(res => {
					if(res.code == 200){
						this.filters(res.data.message)
						this.timeFilter(res.data.message)
						this.list.push(...res.data.message)
						this.list.reverse()
						if(res.data.totalPageNum > res.data.pageNum){
							this.onLeadMessage()
						}
					}
				})
			},
			req_messageMode(messgeId){
				messageMode(messgeId).then(res => {
					if(res.code == 200){
						this.pageNum = 1
						this.list = []
						this.req_unReadMessage(this.pageNum)
					}
				})
			},
			onLeadMessage(){
				this.pageNum += 1
				this.req_unReadMessage(this.pageNum)
			},
			toPage(pageId,post_type,messgeId){
				let userId = this.usersId
				this.req_messageMode(messgeId)
				switch (post_type) {
					case 1:
						uni.navigateTo({
							url: "/pages/circle/circleDetail?id="+pageId+"&UserId="+userId
						})
						return
					case 2:
						uni.navigateTo({
							url: "/findFriend/infoDetail?id="+pageId+"&UserId="+userId
						})
						return
				}
			},
			timeFilter(val) {
				val.forEach((item)=>{
					item.CreateAt = timefomat(new Date(item.CreateAt), 'MM-dd hh:mm')
				})
			},
		},
		onLoad(){
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
			background: #fff;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
			.msg_block_text{
				text-align: right;
				color: gray;
				font-size: 24rpx;
			}
			.content {
				max-width: 520rpx;
				@include singleEllipsis
				font-size: 30rpx;
				margin-left: 16rpx;
			}
		}
		
	}
	.middle{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap-reverse;
	}
</style>
