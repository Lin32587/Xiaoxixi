<template>
	<view class="mywrapper">
		<view class="header" @click="toUserInfo">
			<view class="user_img_niming" v-if="udata.Anonymous==1">
				<u-icon name="nimingyonghu" custom-prefix="custom-icon" size="60" color="#CDCDCD"></u-icon>
			</view>
			<image v-else :src="udata.User.UserImage" :key="udata.User.UserImage" class="user_img"></image>
			<view class="user_info">
				<view class="name_box">
					<view class="name">{{udata.Anonymous|nameFilter(this)}}</view>
					<view class="time" v-if="!showDetailBtn">{{udata.CreateAt|timeFilter(this)}}</view>
					<Rounds style="margin-left: 12rpx;" />
					<view class="editBtn" v-if="showDetailBtn" @click="showEdList">
						<uni-icons type="more-filled" color="#B2BED5" size="20"></uni-icons>
					</view>
				</view>
				<view class="school">{{udata.Anonymous|schoolFilter(this)}}</view>
			</view>
		</view>
		<view class="aricle" @click="toDetail">{{udata.Content}}</view>
		<view v-if="udata.Cimage==null||udata.Cimage.length==0" class="circle_img_null"></view>
		<u-swiper :prefix="prePath" img-mode="aspectFill" @click="swiperEvent" :autoplay="false" height="350" v-else :list="udata.Cimage"
		 name="CimageUrl"></u-swiper>
		<!-- <image v-else :src="udata.Cimage[0].CimageUrl" @click="toDetail();imgPreview(udata.Cimage)" class="circle_img"></image> -->
		<view class="bottom_section" v-if="isShowBottom">
			<!-- <view class="b_block" @click="toTransmitPage">
				<u-icon class="b_img" name="zhuanfa" color="#DADCE3" size="36"></u-icon>
				<view class="b_count">{{udata.TransmitNum}}</view>
			</view> -->
			<button class="b_block share_btn" open-type="share" @click="share" type="default" >
				<u-icon class="b_img" name="zhuanfa" color="#DADCE3" size="36"></u-icon>
				<view class="b_count">{{udata.TransmitNum}}</view>
			</button>
			<view class="b_block" @click="toDetail">
				<u-icon class="b_img" name="chat" color="#DADCE3" size="36"></u-icon>
				<view class="b_count">{{udata.CommentNum}}</view>
			</view>
			<view class="b_block" @click="chooseLike">
				<u-icon v-if="isLike==1" class="b_img" name="thumb-up-fill" color="#DADCE3" size="36"></u-icon>
				<u-icon v-else class="b_img" name="thumb-up" color="#DADCE3" size="36"></u-icon>
				<view class="b_count">{{likeCount}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		publicImgPath,
	} from '@/common/interface.js'
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import Rounds from "@/mycomponents/common/round.vue";
	import {
		addLike,
		removeLike,
		addctransmit
	} from "@/common/http.api.js";
	export default {
		components: {
			Rounds,
			uniIcons
		},
		filters: {
			nameFilter(val, context) {
				if (val == 1) {
					return "匿名用户";
				} else {
					return context.udata.User.username;
				}
			},
			schoolFilter(val, context) {
				if (val == 1) {
					return "*********";
				} else {
					return context.udata.User.school;
				}
			},
			contentFilter(val) {
				let resultStr = val.replace(/[\r\n]/g, ""); //去掉回车换行
				return resultStr;
			},
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
				// isShowBottom: true,
				prePath: publicImgPath,
				isLike: this.udata.Like.IsLike,
				likeCount: this.udata.LikeNum,
			};
		},
		onShareAppMessage(e) {
		    return {
		        title:`${this.udata.Content}`,
		        path:'pages/circle/circleDetail?id=' + this.udata.Id,
		        imageUrl:'',
		        desc:'',
		        content:''
		    }
		},
		props: {
			showDetailBtn: {
				default: false
			},
			isDetailSaying: {
				default: false
			},
			udata: {
				default: ""
			},
			isShowBottom: {
				default: true
			}
		},
		methods: {
			share(){
				if(!this.$store.state.gAuth){
					this.gmyToast('请完成认证')
					return
				}
				addctransmit({postId: this.udata.Id ,userId:this.$store.state.gUserid}).then(()=>{}).catch()
			},
			toDetail() {
				// console.log("执行");
				let id = this.udata.Id;
				if (this.isDetailSaying == false) {
					uni.navigateTo({
						url: "/pages/circle/circleDetail?id=" + this.udata.Id
					});
				}
			},
			toUserInfo() {
				this.$emit("toUserInfo", this.udata.Anonymous, this.udata.UserId);
			},
			showEdList() {
				this.$emit("showEdList");
			},
			chooseLike() {
				if(!this.$store.state.gAuth){
					this.gmyToast('请完成认证')
					return
				}
				let data = {
					PostId: this.udata.Id,
					UserId: this.gUserid
				}
				switch (this.isLike) {
					case 1:
						this.req_removeLike(data)
						return
					case 0:
						this.req_addLike(data)
						return
				}
			},
			// 添加点赞
			req_addLike(data) {
				// let data = this.udata.Like;
				addLike(data).then(res => {
					// console.log(typeof res)
					if (res.code == 200) {
						this.isLike = 1;
						this.likeCount++
						this.$forceUpdate();
					}
				});
			},
			// 取消点赞
			req_removeLike(data) {
				// let data = this.udata.Like;
				console.log('取消')
				removeLike(data).then(res => {
					// res = JSON.parse(res)
					if (res.code == 200) {
						this.isLike = 0;
						this.likeCount--
						this.$forceUpdate();
					}
				});
			},
			swiperEvent(current) {
				if (this.isDetailSaying == false) {
					this.toDetail()
				} else {
					this.imgPreview(current)
				}
			},
			// 图片预览
			imgPreview(current) {
				let list = this.udata.Cimage.map(item => {
					let url = this.prePath + item.CimageUrl
					return url
				})
				let data = {
					current: current,
					urls: list,
					loop: true,
					success(e) {
						// console.log('成功', e)
					},
					fail(e) {
						// console.log('失败', e)
					}
				}
				uni.previewImage(data)
			},
			// 跳转到转发页面
			toTransmitPage() {
				uni.navigateTo({
					url: '/pages/circle/transmit'
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.mywrapper {
		box-sizing: border-box;
		padding: 40rpx 42rpx;
		border-radius: 20rpx;
		background: #fff;
		margin-bottom: 20rpx;
	}

	.header {
		display: flex;

		.user_img {
			width: 80rpx;
			min-width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			// background: #ccc;
			margin-right: 20rpx;
			@include xCenter;
			border: solid 2rpx #ccc;
		}

		.user_img_niming {
			width: 80rpx;
			min-width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background: #F5F6FA;
			margin-right: 20rpx;
			@include xCenter;
		}

		.user_info {
			width: 100%;

			.name_box {
				display: flex;
				align-items: center;
				position: relative;
				width: 100%;

				.name {
					color: 28rpx;
					color: #1d3156;
					font-weight: bold;
				}

				.time {
					font-size: 20rpx;
					position: absolute;
					right: 0rpx;
					color: #909caa;
				}

				.editBtn {
					position: absolute;
					right: 0rpx;
					top: -10rpx;
				}
			}

			.school {
				color: #999caa;
				font-size: 24rpx;
			}
		}
	}

	.aricle {
		word-wrap: break-word;
		word-break: normal;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #999caa;
		font-size: 20rpx;
		margin-top: 24rpx;
		margin-bottom: 20rpx;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
	}

	.circle_img {
		margin: 0 auto;
		margin-top: 20rpx;
		width: 100%;
		// height: 300rpx;
		max-height: 300rpx;
		// background: #ccc;
		border-radius: 20rpx;
	}

	.bottom_section {
		display: flex;
		padding: 0px;
		margin: 0 auto;
		margin-top: 38rpx;
		align-items: center;
		box-sizing: border-box;
		padding: 0 20rpx;
		justify-content: space-between;

		.b_block {
			display: flex;
			align-items: center;

			.b_img {
				margin-right: 12rpx;
			}

			.b_count {
				font-size: 26rpx;
				color: #b2bed5;
			}
			
			&.share_btn{
				margin: 0;
				padding: 0;
				background-color: #ffffff;
				&::after{
					border: none;
					border-radius: none;
				}
			}
		}
	}
</style>
