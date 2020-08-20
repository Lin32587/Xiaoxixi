<template>
	<view class="wrapper">
		<u-loadmore status="nomore" bg-color="#F5F6FA" v-if='list.length == 0'/>
		<view class="msg_block" @click="toDynamic" v-if='unreadNum > 0'>
			<view class="mini_avatar"></view>
			<view class="msg">您有{{unreadNum}}条最新消息</view>
		</view>
		<view class="msg_list">
			<view class="msg_brick" v-for="(item,idx) in list" :key="idx" @click="toPage(item.PostId,item.PostType)">
				<view class="date"><span class="strong">{{list.length - idx}}</span>Sep</view>
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
			<u-loadmore status="nomore" v-if='list.length > 0'/>
		</view>
	</view>
</template>

<script>
	import {
		unReadMessageCount,
		message
	} from '@/common/http.api.js'
	import {
		imgPath
	} from '@/common/interface.js'
	export default {
		data() {
			return {
				imgPath: imgPath,
				unreadNum: 0,
				pageNum: 0,
				list: []
			};
		},
		methods: {
			toDynamic() {
				uni.navigateTo({
					url: '/mine/DynamicList'
				})
			},
			req_unReadMessageCount(){
				unReadMessageCount({
					userId: 33
				}).then(res => {
					if(res.code == 200){
						this.unreadNum = res.data
					}
				})
			},
			req_message(pageN){
				message({
					userId: 33,
					pageNum: pageN,
					pageSize: 10
				}).then(res => {
					console.log(res)
					if(res.code == 200){
						if(res.totalPageNum > 1 && res.data.message.length >= 10){
							this.filters(res.data.message)
							this.list.push(...res.data.message)
							this.onLeadMessage()
						}
						this.filters(res.data.message)
						this.list.push(...res.data.message)
						this.list.reverse()
					}
				})
			},
			onLeadMessage(){
				this.pageNum += 1
				req_message(this.pageNum)
			},
			toPage(pageId,post_type){
				let userId = 33
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
		},
		onLoad(){
			this.req_unReadMessageCount();
			this.req_message(this.pageNum);
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
				background: #ccc;
				margin-right: 22rpx;
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
			padding: 50rpx;
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
						font-size: 40rpx;
						font-weight: bold;
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
