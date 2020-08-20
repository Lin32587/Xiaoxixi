<template>
	<view class="wrapper">
		<view class="msg_block" v-for="item in list" :key="item.ID" @click="toPage(item.PostId,item.ID)">
			<comment :date="item.CreateAt">
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
	import comment from '@/mycomponents/circle/circleDetail/comment.vue'
	export default {
		components: {
			comment
		},
		data() {
			return {
				list: [],
				pageNum: 1,
			};
		},
		methods: {
			req_unReadMessage(pageN){
				unReadMessage({
					userId: 33,
					pageNum: pageN,
					pageSize: 10
				}).then(res => {
					if(res.code == 200){
						if(res.totalPageNum > 1 && res.data.message.length >= 10){
							this.filters(res.data.message)
							this.list.push(...res.data.message)
							this.onLeadMessage()
						}
						this.filters(res.data.message)
						this.list.push(...res.data.message)
					}
				})
			},
			req_messageMode(messgeId){
				messageMode(messgeId).then(res => {
					if(res.code == 200){
						this.req_unReadMessage(1)
					}
				})
			},
			onLeadMessage(){
				this.pageNum += 1
				req_unReadMessage(this.pageNum)
			},
			toPage(pageId,messgeId){
				let userId = 33
				uni.navigateTo({
					url: "/pages/circle/circleDetail?id="+pageId+"&UserId="+userId
				})
				this.req_messageMode(messgeId)
			}
		},
		onLoad(){
			this.req_unReadMessage(this.pageNum);
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

			.content {
				max-width: 520rpx;
				@include singleEllipsis
			}
		}
		
	}
	.middle{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap-reverse;
	}
</style>
