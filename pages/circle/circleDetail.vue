<template>
	<view class="circleDetailwrapper">
		<view class="loading_box" v-if="isloading==true">
			<u-loading size="36"></u-loading><span>加载中</span>
		</view>
		<!-- 帖子详情页面 -->
		<view v-if="isloading==false">
			<Saying :isShowBottom="false" :isDetailSaying="true" :udata="sayingData" :showDetailBtn="true" @showEdList="showEdList" />
			<u-popup mode="bottom" v-model="edshow">
				<editList :postTitle="sayingData.Content" :postId="sayingData.Id" :userId="sayingData.User.Id" :state="sayingData.Collect.State"
				 @edStatus="edshow=false" :delable="deleteAble"></editList>
			</u-popup>
			<view class="bottom_section">
				<!-- 头部 -->
				<view class="b_header">
					<view class="left">
						<view @click="changeActive(0)" class="block" :class="activeType==0?'active':''" style="margin-right: 24rpx;">
							<span>转发</span>
							{{sayingData.TransmitNum}}
						</view>
						<view @click="changeActive(1)" class="block" :class="activeType==1?'active':''">
							<span>评论</span>
							{{sayingData.CommentNum}}
						</view>
					</view>
					<view class="block" :class="activeType==2?'active':''" @click="changeActive(2)">
						<span>点赞</span>
						{{sayingData.LikeNum}}
					</view>
				</view>
				<!-- 转发 -->
				<view v-if="activeType==0">
					<comment :userdata="item.User" v-for="(item,idx) in transmitList" :key="idx">
						<view class="m_bottom">{{item.User.username}}转发了您的帖子</view>
					</comment>
				</view>
				<!-- 评论 -->
				<view v-if="activeType==1">
					<comment :userdata="item.User" :range="idx+1" v-for="(item,idx) in commentList" :key="idx">
						<view class="time">{{item.CreateAt|timeFilter(this)}}</view>
						<view class="m_bottom" @click="addRelpy(item,idx)">{{item.Content}}</view>
						<comment slot="reply" :userdata="sitem.User" v-for="(sitem,sidx) in item.Reply" :key="sidx">
							<view class="m_bottom">
								<span class="fstrong">@{{item.User.username}}</span>
								{{sitem.Content}}
							</view>
						</comment>
					</comment>
				</view>
				<!-- 点赞 -->
				<view v-if="activeType==2">
					<comment :userdata="item.User" v-for="(item,idx) in likeList" :key="idx">
						<view class="m_bottom">{{item.User.username}}点赞了您的帖子</view>
					</comment>
				</view>
				<!-- 评论end -->
				<myloading :loading="listLoading"></myloading>
			</view>
		</view>
		<view class="handle_bar" v-if="checkAuth">
			<!-- <navigator class="bar_item" @click="toTransmit" :url="'/pages/circle/transmit?item='+ encodeURIComponent(JSON.stringify(sayingData))">
				<u-icon name="zhuanfa" color="#DADCE3" size="36"></u-icon>
				<span>转发</span>
			</navigator> -->
			<button class="bar_item share_btn" open-type="share" @click="share" type="default">
				<u-icon name="zhuanfa" color="#DADCE3" size="36"></u-icon>
				<span>转发</span>
			</button>
			<view class="bar_item borders" @click="norComment">
				<u-icon name="chat" color="#DADCE3" size="36"></u-icon>
				<span>评论</span>
			</view>
			<view class="bar_item" @click="thumbUpChoose">
				<u-icon v-if="sayingData.Like&&sayingData.Like.IsLike==1" name="thumb-up" color="#1D3156" size="36"></u-icon>
				<u-icon v-else name="thumb-up" color="#DADCE3" size="36"></u-icon>
				<span>点赞</span>
			</view>
		</view>
		<u-popup v-model="show" mode="bottom">
			<view class="comment_box">
				<view class="checked_box">
					<u-switch v-model="checked" :active-value="1" :inactive-value="0" :size="30"></u-switch>
					<text>仅楼主可见</text>
				</view>
				<view class="input_box">
					<input v-if="isReply==false" v-model="resText" :cursor-spacing="300" placeholder="写下你的精彩评论吧~" />
					<input v-else v-model="resText" :cursor-spacing="300" :placeholder="ReplyTarget+'写下你的精彩评论吧~'" />
				</view>
				<view v-show="resText.length==0" class="sendbtn">发送</view>
				<view v-show="resText.length>0" @click="replyBtn" class="sendbtn_active">发送</view>
				<view class="clear"></view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		post,
		commentapi,
		getLikeDetail,
		addLike,
		removeLike,
		transmit,
		addComment,
		addReply,
		addctransmit
	} from "@/common/http.api.js";
	import {
		myToast,
		timefomat
	} from '@/common/util.js'
	import myloading from '@/mycomponents/common/myLoading.vue'
	import editList from "@/mycomponents/circle/editList.vue";
	import Saying from "@/mycomponents/circle/Saying.vue";
	import comment from "@/mycomponents/circle/circleDetail/comment.vue";
	export default {
		components: {
			Saying,
			comment,
			editList,
			myloading
		},
		computed:{
			checkAuth:{
				get(){
					return this.$store.state.gAuth
				}
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
						"T")[0]) + "日"
				}else {
					FormatTime = parseInt(val.substr(0,4)) + "年" + parseInt(val.substr(5,2)) + "月"
				}
				return FormatTime
			}
		},
		data() {
			return {
				listLoading: false,
				isloading: true,
				sayingData: {},
				activeType: 1,
				id: 28, //24
				pageIndex: 1,
				pageIdxs: [1, 1, 1],
				commentList: [],
				likeList: [],
				transmitList: [],
				resText: '',
				show: false,
				isReply: false,
				ReplyTarget: "",
				tempReplyData: "",
				listReqData: {},
				deleteAble: false,
				edshow: false, //编辑列表显示 popup
				checked: false
			};
		},

		watch: {
			sayingData: {
				immediate: true,
				handler: function(val) {
					if (val.Id) {
						this.isloading = false
					} else {
						this.isloading = true
					}
				}
			}
		},
		onLoad(res) {
			if (res.id) {
				this.id = res.id;
			}
			this.req_post(res);
		},
		onReachBottom() {
			this.initCommentBox(true)
		},
		onShareAppMessage(res) {
		    return {
		        title:`${this.sayingData.Content}`,
		        path:'pages/circle/circleDetail?id=' + this.id,
		        imageUrl:'',
		        desc:'',
		        content:''
		    }
		},
		methods: {
			share(){
				addctransmit({postId:parseInt(this.id),userId: this.$store.state.gUserid}).then().catch()
			},
			changeActive(idx) {
				this.activeType = idx;
				// this.pageIndex = 1
				if (idx == 0 && this.transmitList.length == 0) {
					this.initCommentBox()
				} else if (idx == 1 && this.commentList.length == 0) {
					this.initCommentBox()

				} else if (idx == 2 && this.likeList.length == 0) {
					this.initCommentBox()

				}
			},
			// 处理请求前三个数组
			initCommentBox(isReachBottom) {
				this.listLoading = true
				this.listCommonData(isReachBottom)
				switch (this.activeType) {
					case 0:
						this.req_transmit()
						return
					case 1:
						this.req_commentapi()
						return;
					case 2:
						this.req_getLikeDetail()
						return
				}
			},
			// 处理三个数组：评论，转发，点赞
			handleAllList(type, data) {
				this.listLoading = false
				if (!data || data.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '已经到底',
						duration: 500
					})
					return
				}
				// this.pageIndex++
				this.pageIdxs[this.activeType]++
				switch (type) {
					case 0:
						this.transmitList.push(...data)
						return
					case 1:
						this.commentList.push(...data)
						return
					case 2:
						this.likeList.push(...data)
						return
				}
			},
			toTransmit() {
				// uni.navigateTo({
				// 	url: "/pages/circle/transmit"
				// });
				this.sayingData.TransmitNum++
			},
			showEdList() {
				this.edshow = true
			},
			replyBtn() {
				switch (this.isReply) {
					case true:
						this.req_addReply();
						return;
					case false:
						this.req_addComment();
						return;
				}
			},
			req_addComment() {
				let data = {
					content: this.resText,
					postId: this.sayingData.Id,
					userId: this.gUserid,
					state: this.checked ? 1 : 0,
				}
				addComment(data).then(res => {
					if (res.code == 200) {
						let data = {
							Id: res.data.CommentId,
							User: {
								UserImage: this.gUserimage,
								username: this.gUsername,
								Id: this.gUserid
							},
							Content: this.resText,
							State: this.checked,
							CreateAt: timefomat(new Date(), 'yyyy.MM.dd hh:mm')
						};
						// console.log(data);
						this.sayingData.CommentNum++
						this.commentList.unshift(data);
						this.show = false;

					}
				})
			},
			req_addReply() {
				let data = {
					userId: this.gUserid,
					atuserId: this.tempReplyData.User.Id, //目标
					commentId: this.tempReplyData.Id, //评论id
					content: this.resText,
					postId: this.sayingData.Id //帖子id
				}
				console.log(this.tempReplyData)
				addReply(data).then(res => {
					if (res.code == 200) {
						let data = {
							User: {
								UserImage: this.gUserimage,
								username: this.gUsername,
								Id: this.gUserid
							},
							Content: this.resText
						};
						let idx = this.tempReplyData.targetIdx;
						if (this.commentList[idx].Reply == null) {
							this.commentList[idx].Reply = [];
						}
						this.commentList[idx].Reply.push(data);
						this.show = false;
					}
				})
			},
			norComment() {
				this.isReply = false;
				this.show = true;
				this.resText = ''
			},
			addRelpy(item, idx) {
				this.isReply = true;
				console.log(this.isReply);
				this.resText = "";
				this.ReplyTarget = "@" + item.User.username;
				this.tempReplyData = { ...item,
					targetIdx: idx
				};
				this.show = true;
			},
			// 获取单个帖子
			req_post(result) {
				let data = {
					Id: result.id || this.id ,
					UserId:result.UserId || this.gUserid
				}
				console.log(result)
				post(data).then(res => {
					if (res.code == 200) {
						this.sayingData = res.data;
						this.deleteAble = res.data.User.Id == this.gUserid ? true : false
						// console.log('deleteAble', res.data.User.Id, this.gUserid, this.deleteAble)
						this.initCommentBox()
						this.isloading = false
						// console.log(res.data.Cimage)
					}
				});
			},
			// 获取评论
			req_commentapi() {
				// console.log(this.gUserid)
				let data = this.listReqData
				commentapi(data).then(res => {
					if (res.code == 200) {
						this.handleAllList(1, res.data.comments)
					}
				});
			},
			listCommonData(isReachBottom) {
				let nowPage = this.pageIndex
				let currentPage = this.pageIdxs[this.activeType]
				let myPageNum = isReachBottom == true ? currentPage++ : currentPage
				let data = {
					PostId: this.id,
					PageNum: myPageNum,
					PageSize: 5,
					UserId: this.gUserid,
				};
				this.listReqData = data
				// return data
			},
			// 获取点赞详情
			req_getLikeDetail() {
				let data = this.listReqData
				getLikeDetail(data).then(res => {
					if (res.code == 200) {
						this.handleAllList(2, res.data.likes)
					}
				});
			},
			thumbUpChoose() {
				console.log(this.sayingData.Like.IsLike);
				switch (this.sayingData.Like.IsLike) {
					case 1:
						this.req_removeLike();
						return;
					case 0:
						this.req_addLike();
						return;
				}
			},
			// 添加点赞
			req_addLike() {
				let data = {
					postId: parseInt(this.id),
					userId: this.gUserid
				}
				// let data = this.sayingData.Like;
				addLike(data).then(res => {
					if (res.code == 200) {
						this.sayingData.Like.IsLike = 1;
						this.sayingData.LikeNum++
					}
				});
			},
			// 取消点赞
			req_removeLike() {
				let data = {
					postId: parseInt(this.id),
					userId: this.gUserid
				}
				// let data = this.sayingData.Like;
				removeLike(data).then(res => {
					if (res.code == 200) {
						this.sayingData.Like.IsLike = 0;
						this.sayingData.LikeNum--
					}
				});
			},
			// 查看转发
			req_transmit() {
				let data = this.listReqData
				transmit(data).then(res => {
					if (res.code == 200) {
						this.handleAllList(0, res.data.transmits)
					}
				});
			},
		},
	};
</script>
<style>
	page {
		height: 100% !important;
		background: #f0f1f5;
	}
</style>
<style lang="scss" scoped>
	.circleDetailwrapper {
		box-sizing: border-box;
		padding: 20rpx;
		padding-bottom: 200rpx;
	}

	.bottom_section {
		margin-top: 20rpx;
		border-radius: 20rpx;
		background: #fff;
		// padding: 26rpx 40rpx;
		padding: 26rpx 0px;
		box-shadow: 0rpx 10rpx 20rpx 0px rgba(0, 0, 0, 0.05);

		.b_header {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			margin-bottom: 14rpx;
			padding: 0rpx 40rpx;
		}

		.left {
			align-items: center;
			display: flex;
		}

		.block {
			display: block;
			display: flex;
			align-items: center;
			color: #999caa;
			font-size: 28rpx;
			font-weight: bold;
			border-bottom: solid 4rpx #fff;
			transition: all 0.3s;

			span {
				margin-right: 10rpx;
			}
		}

		.active {
			transition: all 0.3s;
			color: #1d3156;
			border-bottom: solid 4rpx #1d3156;
		}
	}

	.m_bottom {
		font-size: 30rpx;
		color: #999caa;
		word-wrap: break-word;
		word-break: break-all;
	}
	
	.time {
		font-size: 20rpx;
		// position: absolute;
		// margin-top: -30rpx;
		// right: 100rpx;
		color: #909caa;
	}

	.handle_bar {
		width: calc(100% - 40rpx);
		height: 88rpx;
		position: fixed;
		bottom: 40rpx;
		border-radius: 50rpx;
		box-shadow: 0px 6rpx 24rpx 0px rgba(234, 234, 234, 1);
		background: #fff;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		overflow: hidden;

		.bar_item {
			width: (100% / 3);
			display: flex;
			align-items: center;
			justify-content: center;
			height: 68rpx;

			image {
				width: 36rpx;
				height: 36rpx;
				margin-right: 10rpx;
			}

			span {
				color: #999caa;
				font-size: 22rpx;
			}
		}

		.borders {
			border-right: solid 2rpx #f5f6fa;
			border-left: solid 2rpx #f5f6fa;
		}
	}

	.loading_box {
		display: flex;
		justify-content: center;


		span {
			margin-left: 8rpx;
		}
	}

	.comment_box {
		left: 0rpx;
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		padding: 30rpx;

		.checked_box {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;

			text {
				margin-left: 20rpx;
			}
		}

		.input_box {
			border-radius: 20rpx;
			width: 100%;
			background: #f5f6fa;
			// height: 160rpx;
			box-sizing: border-box;
			padding: 20rpx;
			overflow-y: auto;

			.area {
				overflow-y: auto;
			}
		}

		@mixin baseBtn {
			float: right;
			color: #999caa;
			font-size: 28rpx;
			margin-top: 6rpx;
			margin-right: 12rpx;
		}

		.sendbtn {
			@include baseBtn;
		}

		.sendbtn_active {
			@include baseBtn;
			color: #393d46;
		}

		.clear {
			clear: both;
		}
	}

	.fstrong {
		font-weight: bold;
	}
</style>
