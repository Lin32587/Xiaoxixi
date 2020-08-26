<template>
	<view class="wrapper">
		<view class="msg_block" @click="toDynamic" v-if='unreadNum > 0'>
			<view class="mini_avatar">
				<image :src="userImage"></image>
			</view>
			<view class="msg">您有{{unreadNum}}条最新消息</view>
		</view>
		<view class="msg_list">
			<view class="msg_brick" v-for="(item,idx) in list" :key="idx" @click="toPage(item.PostId,item.PostType)">
				<view class="date"><span class="strong">{{item.CreateAt.substring(0,item.CreateAt.indexOf('T')).split("-")[2]}}</span>{{item.time}}</view>
				<view class="avatar">
					<image :src="item.Images"></image>
				</view>
				<view class="msg u-line-1">
					<view class="u-flex">
						<text class="u-flex-1 u-line-1">{{item.UserName}}</text>
						<text class="msg_type">{{item.text}}</text>
					</view>
					<view class="u-line-1 content">{{item.Content}}</view>
				</view>
			</view>
			<u-loadmore status="nomore"/>
		</view>
	</view>
</template>

<script>
	import {
		unReadMessage,
		unReadMessageCount,
		message
	} from '@/common/http.api.js'
	export default {
		data() {
			return {
				unreadNum: 0,
				pageNum: 1,
				list: [],
				usersId: '',
				userImage: ''
			}
		},
		methods: {
			toDynamic() {
				uni.navigateTo({
					url: '/mine/DynamicList'
				})
			},
			req_unReadMessageCount(){
				unReadMessageCount({
					userId: this.usersId
				}).then(res => {
					if(res.code == 200){
						this.unreadNum = res.data
					}
				})
			},
			req_message(pageN){
				message({
					userId: this.usersId,
					pageNum: pageN,
					pageSize: 10
				}).then(res => {
					if(res.code == 200 && res.data != null){
						this.filters(res.data.message)
						this.filterIni(res.data.message)
						this.list.push(...res.data.message)
						if(res.data.totalPageNum > res.data.pageNum){
							this.onLeadMessage()
						}else{
							this.image = res.data.message[0].Images
						}
					}
				})
			},
			onLeadMessage(){
				this.pageNum += 1
				this.req_message(this.pageNum)
			},
			toPage(pageId,post_type){
				let userId = this.usersId
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
			filterIni(time){
				let monthEnglish = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
				time.forEach((item)=>{
					item.time = monthEnglish[new Date(new Date(item.CreateAt)).getMonth()]
					// resData.yue = this.monthEnglish[new Date(new Date(item)).getMonth()]
				})
			},
			req_unReadMessage(){
				unReadMessage({
					userId: this.usersId,
					pageNum: 1,
					pageSize: 1
				}).then(res => {
					if(res.code == 200){
						this.userImage = res.data.message[0].Images
					}
				})
			},
		},
		onLoad(){
			uni.getStorage({
			    key: 'userId',
			    success: res => {
			        this.usersId = res.data
					this.req_message(this.pageNum)
					this.req_unReadMessageCount()
					this.req_unReadMessage()
			    }
			})
			
		},
		onShow(){
			if(this.usersId != ''){
				this.req_unReadMessageCount()
				this.req_unReadMessage()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		box-sizing: border-box;
		padding: 20rpx;

		.msg_block {
			border-radius: 50rpx;
			padding: 16rpx 50rpx;
			background: #fff;
			display: flex;
			align-items: center;
			box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);

			.mini_avatar {
				width: 48rpx;
				height: 48rpx;
				border-radius: 50%;
				margin-right: 22rpx;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}

			.msg {
				font-size: 28rpx;
				color: #C5C9D2;
				.msg-t{
					display: inline-block;
					margin-right: 30rpx;
				}
				
				
			}
		}

		.msg_list {
			border-radius: 20rpx;
			//padding: 50rpx;
			padding: 40rpx;
			box-sizing: border-box;
			background: #fff;
			margin-top: 20rpx;

			.msg_brick {
				display: flex;
				margin-bottom: 50rpx;

				.date {
					white-space: nowrap;
					margin-right: 20rpx;

					.strong {
						display: inline-block;
						width: 60rpx;
						font-size: 40rpx;
						font-weight: bold;
						text-align: right;
					}
				}

				.avatar {
					width: 100rpx;
					min-width: 100rpx;
					height: 100rpx;
					background: #ccc;
					margin-right: 20rpx;
					
					image{
						width: 100%;
						height: 100%;

					}
				}
				
				.avatar,.avatar > image{
					border-radius: 10rpx;
				}
				
				.msg {
					color: #101010;
					width: 100%;
					font-size: 28rpx;
					
					.msg_type{
						font-size: 24rpx;
						color: #82848A;
						overflow-x: hidden;
					}
					
					.content{
						margin-top: 18rpx;
					}
				}
				
				.msg text:nth-child(1){
					font-weight: bold;
				}
			}
		}
	}
</style>
