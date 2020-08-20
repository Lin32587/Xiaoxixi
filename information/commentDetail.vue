<template>
	<view class="wrapper">
		<view class="main_comment">
			<view class="comment_box">
				<comment>
					<view class="m_bottom">内容asssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</view>
				</comment>
			</view>
		</view>
		<view class="divider">
			<view class="count_box">评论(36)</view>
		</view>
		<view class="sub_comment">
			<view class="b_comment" v-for="item in 6" :key="item">
				<comment>
					<view class="m_bottom">内容asssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</view>
				</comment>
			</view>
		</view>
	</view>
</template>

<script>
	import comment from '@/mycomponents/circle/circleDetail/comment.vue'
	export default {
		components: {
			comment
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		box-sizing: border-box;
		padding: 20rpx;
	}

	.main_comment {
		.comment_box {
			width: 100%;
			box-sizing: border-box;
			background: #fff;
			border-radius: 20rpx;

			.m_bottom {
				max-width: inherit;
				@include mEllipsis;
				word-break: break-all;
			}
		}
	}

	.divider {
		border-top: solid 4rpx #4b4b4b;
		position: relative;
		width: 80%;
		margin: 0 auto;
		margin-top: 40rpx;

		.count_box {
			position: absolute;
			top: 0px;
			background: #F5F6FA;
			padding: 0 6rpx;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.sub_comment {
		margin-top: 40rpx;
		border-radius: 20rpx;
		padding: 20rpx;
		background: #fff;


		.b_comment {
			box-sizing: border-box;
			border-bottom: solid 1px #f8f8f8;
		}

		.m_bottom {
			max-width: inherit;
			@include mEllipsis;
			word-break: break-all;
		}

	}
</style>
