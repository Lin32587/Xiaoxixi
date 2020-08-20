<template>
	<view class="xwrapper">
		<view class="infoCard">
			<view class="gBox">
				<view class="ph"></view>
				<view class="namebox">Lomo</view>
				<view class="bottomBox">
					<view class="norFont">可用:1000</view>
					<view class="norFont ml">历史总计:1000</view>
				</view>
			</view>
			<view class="fBox">
				<text class="num">600</text>
				<view class="maxPer">
					<view class="allPer" :style="{width:allCountLength+'%'}"></view>
					<view class="minPer" :style="{width:canUseLength+'%'}"></view>
				</view>
				<text class="num">1800</text>
			</view>
		</view>
		<!-- info end -->
		<view class="chooseBox">
			<view class="citem" v-for="(item,idx) in chooseList">
				<u-icon name="photo" size="60" color="#393D46"></u-icon>
				<text class="title">{{item.name}}</text>
			</view>
		</view>
		<!-- chooseBox end -->
		<view class="shopArea">
			<view class="stitle">兑换商城</view>
			<view class="pictBox">
				<scroll-view class="scroll-view_H" scroll-x="true">
					<view class="sitem" v-for="item in 6" :key="item">{{item}}</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				maxCount: 1800,
				allCount: 1200,
				canUseCount: 1000,
				chooseList: [{
					name: '领析贝',
					icon: '',
					val: 0
				}, {
					name: '兑会员',
					icon: '',
					val: 1
				}, {
					name: '兑福利',
					icon: '',
					val: 2
				}, {
					name: '兑活动',
					icon: '',
					val: 3
				}, ]
			};
		},
		computed: {
			canUseLength() {
				let res = (this.canUseCount / this.maxCount) * 100
				return res
			},
			allCountLength() {
				let res = (this.allCount / this.maxCount) * 100
				return res
			}
		}
	}
</script>

<style lang="scss" scoped>
	.xwrapper {
		box-sizing: border-box;
		padding: 20rpx
	}

	.infoCard {
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 68rpx 56rpx;
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
		background: #fff;
	}

	.gBox {
		display: grid;
		grid-template-columns: 92rpx 8fr;
		grid-template-rows: 40rpx 40rpx;
		grid-template-areas:
			"left rightTop"
			"left rightBottom";

		.ph {
			width: 80rpx;
			height: 80rpx;
			grid-area: left;
			border-radius: 50%;
			background: #ccc;
		}

		.namebox {
			grid-area: rightTop;
			font-size: 32rpx;
		}

		.bottomBox {
			grid-area: rightBottom;
			display: flex;

			.norFont {
				color: #6F7280;
				font-size: 22rpx;
			}

			.ml {
				margin-left: 52rpx;
			}
		}
	}

	.fBox {
		display: flex;
		margin-top: 20rpx;
		align-items: center;

		.num {
			color: #617397;
			font-size: 24rpx;
		}

		.maxPer {
			margin: 0 30rpx;
			height: 20rpx;
			width: 440rpx;
			background: #F5F6FA;
			border-radius: 10rpx;
			position: relative;

			.allPer {
				position: relative;
				height: inherit;
				border-radius: inherit;
				background: #B2BED5;
			}

			.minPer {
				position: absolute;
				top: 0rpx;
				height: inherit;
				border-radius: inherit;
				background: #617397;
			}
		}
	}

	.chooseBox {
		box-sizing: border-box;
		padding: 26rpx 66rpx;
		border-radius: 20rpx;
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
		display: flex;
		background: #fff;
		margin-top: 20rpx;
		justify-content: space-between;

		.citem {
			display: flex;
			flex-direction: column;
			align-items: center;

			.title {
				font-size: 20rpx;
				color: #6F7280;
				margin-top: 16rpx;
			}
		}

	}

	.shopArea {
		box-sizing: border-box;
		background: #fff;
		border-radius: 20rpx;
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
		margin-top: 20rpx;
		padding: 40rpx;

		.stitle {
			font-size: 32rpx;
			color: #393D46;
			font-weight: bold;
			border-left: solid 4rpx #393D46;
			padding-left: 20rpx;
		}
	}

	.pictBox {
		margin-top: 40rpx;

		.scroll-view_H {
			white-space: nowrap;

			.sitem {
				display: inline-block;
				width: 390rpx;
				height: 216rpx;
				background: #ccc;
				border-radius: 10rpx;
				margin-right: 22rpx;
				text-align: center;
			}
		}
	}
</style>
