<template>
	<view class="wrapper">
		<view class="b_comment">
			<image class="b_user_ph"  @click="toUser" :src="userdata.UserImage"></image>
			<!-- <view class="b_user_ph"></view> -->
			<view class="middle">
				<view class="m_top" @click="toUser">
					<view class="m_t_left">
						<view class="user_name">{{userdata.username}}</view>
						<Rounds></Rounds>
					</view>
					<!-- <view class="date" v-if="dates">{{dates}}</view> -->
					<view class="range" v-if="range">#{{range}}</view>
				</view>
				<slot></slot>
			</view>
		</view>
		<!-- <view style="margin-left: -30rpx;"> -->
			<slot name="reply"></slot>
		<!-- </view> -->
	</view>
</template>

<script>
	import Rounds from '@/mycomponents/common/round.vue'
	import {timefomat} from '@/common/util.js' 
	import {
		imgPath
	} from '@/common/interface.js'
	export default {
		components: {
			Rounds
		},
		props: {
			date: {
				default: ''
			},
			range: {
				default: ''
			},
			userdata: {
				default: function() {
					return {}
				}
			}
		},
		data(){
			return{
				dates: '',
				imgPath: imgPath
			}
		},
		methods:{
			toUser(){
				this.$u.route('/pages/circle/userInfo',{
					id:this.userdata.Id
				})
			},
			timeFilter(val) {
				let data = timefomat(new Date(val), 'yyyy.MM.dd hh:mm')
				this.dates = data;
			}
		},
		onLoad(){
			this.date ? this.timeFilter(this.date) : ''
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		width: 100%;

		.b_comment {
			box-sizing: border-box;
			padding-top: 20rpx;
			border-top: solid 4rpx #FAFAFC;
			display: flex;
			padding: 20rpx 40rpx;
			// padding-left: 0rpx;


			.b_user_ph {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				background: #ccc;
				min-width: 80rpx;
				margin-right: 20rpx;
			}

			.middle {
				width: 100%;

				.m_top {
					display: flex;
					justify-content: space-between;

					.m_t_left {
						display: flex;
						align-items: center;

						.user_name {
							color: #1D3156;
							font-size: 28rpx;
							font-weight: bold;
							margin-right: 34rpx;
						}
					}

					.range {
						color: #999CAA;
						font-size: 30rpx;
						font-weight: bold;
					}

					.date {
						color: #B2B2B2;
						font-size: 24rpx;
					}
				}

				.m_bottom {
					font-size: 30rpx;
					color: #999CAA;
					word-wrap: break-word;
					word-break: break-all
				}
			}
		}
	}
</style>
