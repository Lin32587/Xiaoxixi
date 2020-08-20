<template>
	<!-- 帖子详情页面 -->
	<view class="infoDetailwrapper">
		<view class="loadingbox" v-if="isloading==true">
			<u-loading mode="circle"></u-loading><span>加载中</span>
		</view>
		<view v-else>
			<frindSaying :udata="friendData" @moreEvent="edshow=true"></frindSaying>
			<u-popup mode="bottom" v-model="edshow">
				<frindEdList :accTitle="friendData.Description" :postId="friendData.Id" :userId="friendData.User.Id" :state="friendData.Collect.State"
				 @edStatus="edshow=false"></frindEdList>
			</u-popup>
		</view>
		<view class="bottom_section" v-if="isloading==false">
			<!-- 头部 -->
			<view class="b_header">
				<view class="left">
					<view @click="changeActive(0)" class="block" :class="activeType==0?'active':''" style="margin-right: 24rpx;">
						<span>转发</span>
						{{friendData.TransmitNum}}
					</view>
					<view @click="changeActive(1)" class="block" :class="activeType==1?'active':''">
						<span>评论</span>
						{{friendData.CommentNum}}
					</view>
				</view>
				<view class="block" :class="activeType==2?'active':''" @click="changeActive(2)">
					<span>点赞</span>
					{{friendData.LikeNum}}
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
				<comment :userdata="item.User" v-for="(item,idx) in commentList" :key="idx">
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
				<comment v-for="(item,idx) in likeList" :userdata="item.User" :key="idx">
					<view class="m_bottom">{{item.User.username}}点赞了您的帖子</view>
				</comment>
			</view>
			<!-- 评论end -->
			<myloading :loading="listLoading"></myloading>
		</view>
		<view class="handle_bar" v-if="checkAuth">
		<!-- 	<navigator class="bar_item" @click="toTransmit" :url="'/pages/circle/transmit?item='+ encodeURIComponent(JSON.stringify(friendData))">
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
			<view class="bar_item" @click="chooseLike">
				<u-icon v-if="isLike==false" name="thumb-up" color="#DADCE3" size="36"></u-icon>
				<u-icon v-else name="thumb-up" color="#1D3156" size="36"></u-icon>
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
		singlePost,
		fcomment,
		flike,
		ftransmit,
		addfComment,
		addfLike,
		removefLike,
		freply,
		addftransmit
	} from "@/common/http.api.js";
	import frindSaying from "@/mycomponents/findFriend/friendSaying.vue";
	import frindEdList from "@/mycomponents/findFriend/friendEdList.vue";
	import comment from "@/mycomponents/circle/circleDetail/comment.vue";
	import myloading from '@/mycomponents/common/myLoading.vue'
	import {
		myToast,
		timefomat
	} from '@/common/util.js'
	export default {
		components: {
			frindSaying,
			comment,
			frindEdList,
			myloading
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
		computed:{
			checkAuth:{
				get(){
					return this.$store.state.gAuth
				}
			}
		},
		data() {
			return {
				isCollect: false,
				friendData: {},
				show: false,
				resText: "",
				activeType: 1,
				bttomHeight: 0,
				id: "", //24
				pageIndx: 1,
				commentList: [],
				transmitList: [],
				likeList: [],
				pageIdxs: [1, 1, 1],
				isLike: false,
				isReply: false,
				ReplyTarget: "",
				tempReplyData: "",
				isloading: true,
				listReqData: {},
				listLoading: false,
				edshow: false, //popup显示
				checked: false,
			};
		},
		watch: {
			friendData: {
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
		onLoad(e) {
			// this.id = e.id
			if (e.id) {
				this.id = e.id
			}
			this.req_singlePost(e);
			this.changeActive(1)
			// this.req_fcomment();
			// this.req_ftransmit();
			// this.req_flike();
		},
		onReachBottom(res) {
			this.initCommentBox(true)
			// this.req_post()
		},
		onShareAppMessage(res) {
		    return {
		        title:`${this.friendData.Title} - 寻伴`,
		        path:'findFriend/infoDetail?id=' + this.id,
		        imageUrl:'',
		        desc:'',
		        content:''
		    }
		},
		methods: {
			share(){
				addftransmit({postId: parseInt(this.id),userId: this.gUserid}).then().catch()
			},
			changeActive(idx) {
				// 0: 转发  1：评论   2：点赞
				this.activeType = idx;
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
						this.req_ftransmit()
						return
					case 1:
						this.req_fcomment()
						return;
					case 2:
						this.req_flike()
						return
				}
			},
			listCommonData(isReachBottom) {
				let nowPage = this.pageIndex
				let currentPage = this.pageIdxs[this.activeType]
				let myPageNum = isReachBottom == true ? currentPage++ : currentPage
				let data = {
					PostId: this.id,
					PageNum: myPageNum,
					PageSize: 10,
					UserId: this.gUserid
				};
				this.listReqData = data
			},
			handleAllList(type, data) {
				this.listLoading = false
				if (!data || data.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '没有更多了',
						duration: 500
					})
					return
				}
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
				this.friendData.TransmitNum++
			},
			// 获取单个帖子
			req_singlePost(result) {
				let data = {
					Id:result.id || this.id,
					UserId: result.UserId || this.gUserid
				}
				singlePost(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.friendData = res.data;
						this.isLike = res.data.Like.IsLike == 1 ? true : false;
						// console.log(this.friendData.Collect.State)
						if (this.friendData.Collect.State) {
							this.isCollect = true
						}
					}
				});
			},
			// 获取评论
			req_fcomment() {
				let data = this.listReqData

				fcomment(data).then(res => {
					if (res.code == 200) {
						this.handleAllList(1, res.data.comments)
					}
				});
			},
			// 获取转发
			req_ftransmit() {
				let data = this.listReqData

				ftransmit(data).then(res => {
					if (res.code == 200) {
						this.handleAllList(0, res.data.transmits)
					}
				});
			},
			// 获取点赞
			req_flike() {
				let data = this.listReqData

				flike(data).then(res => {
					if (res.code == 200) {
						this.handleAllList(2, res.data.likes)
					}
				});
			},
			reloadPage() {
				uni.redirectTo({
					url: "/findFriend/infoDetail"
				});
			},
			// 添加评论
			req_addfComment() {
				// addfComment()
				if (this.resText.length == 0) {
					uni.showToast({
						title: "请输入回复",
						duration: 500,
						icon: 'none'
					});
				} else {
					let data = {
						Content: this.resText,
						userId: this.gUserid,
						PostId: this.friendData.Id,
						state: this.checked ? 1 : 0,
					};
					addfComment(data).then(res => {
						if (res.code == 200) {
							uni.showToast({
								title: "评论成功",
								duration: 500
							});
							// setTimeout(() => {
							// 	this.reloadPage();
							// }, 510);
							let data = {
								Id: res.data.CommentId,
								User: {
									UserImage: this.gUserimage,
									username: this.gUsername,
									Id: this.gUserid
								},
								Content: this.resText,
								CreateAt:timefomat(new Date(),'yyyy.MM.dd hh:mm')
							};
							console.log(data)
							this.friendData.CommentNum++
							this.commentList.unshift(data);
							this.show = false;
						}
					});
				}
			},
			chooseLike() {
				switch (this.isLike) {
					case true:
						this.req_removefLike();
						return;
					case false:
						this.req_addfLike();
						return;
				}
			},
			// 添加点赞
			req_addfLike() {
				let data = {
					// id: this.friendData.Like.Id,
					postId: this.friendData.Id,
					userId: this.gUserid
				};
				addfLike(data).then(res => {
					if (res.code == 200) {
						this.isLike = !this.isLike;
						this.friendData.LikeNum++
					}
				});
			},
			// 取消点赞
			req_removefLike() {
				let data = {
					// id: this.friendData.Like.Id,
					postId: this.friendData.Id,
					userId: this.gUserid
				};
				removefLike(data).then(res => {
					if (res.code == 200) {
						this.isLike = !this.isLike;
						this.friendData.LikeNum--
					}
				});
			},
			norComment() {
				this.isReply = false;
				this.show = true;
				this.resText = ''
				// console.log(this.isReply);
			},
			replyBtn() {
				console.log(this.isReply);
				switch (this.isReply) {
					case true:
						this.req_freply();
						return;
					case false:
						this.req_addfComment();
						return;
				}
			},
			addRelpy(item, idx) {
				this.isReply = true;
				console.log(item);
				this.resText = "";
				this.ReplyTarget = "@" + item.User.username;
				this.tempReplyData = { ...item,
					targetIdx: idx
				};
				this.show = true;
			},
			req_freply() {
				let data = {
					userId: this.gUserid,
					atuserId: this.tempReplyData.User.Id,
					commentId: this.tempReplyData.Id,
					postId: this.friendData.Id,
					content: this.resText
				};
				data.content = this.resText;
				freply(data).then(res => {
					if (res.code == 200) {
						let data = {
							User: {
								UserImage: this.gUserimage,
								username: this.gUsername,
								Id: this.gUserid
							},
							Content: this.resText,
							CreateAt:timefomat(new Date(),'yyyy-MM-dd hh:mm')
						};
						let idx = this.tempReplyData.targetIdx;
						if (this.commentList[idx].Reply == null) {
							this.commentList[idx].Reply = [];
						}
						this.commentList[idx].Reply.push(data);
						this.show = false;
					}
				});
			}
		}
	};
</script>
<style>
	page {
		height: 100% !important;
		background: #f0f1f5;
	}
</style>
<style lang="scss" scoped>
	.infoDetailwrapper {
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
		font-size: 20rpx;
		color: #999caa;
		word-wrap: break-word;
		word-break: break-all;
		margin-top: 20rpx;
	}

	.time {
		font-size: 20rpx;
		position: absolute;
		margin-top: -30rpx;
		right: 100rpx;
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

			span {
				color: #999caa;
				font-size: 22rpx;
				margin-left: 10rpx;
			}
		}

		.borders {
			border-right: solid 2rpx #f5f6fa;
			border-left: solid 2rpx #f5f6fa;
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

	.loadingbox {

		display: flex;
		justify-content: center;

		span {
			margin-left: 8rpx;
		}
	}
</style>
