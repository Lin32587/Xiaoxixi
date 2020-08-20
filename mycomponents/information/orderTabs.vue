<template>
	<view>
		<view class="orderTabs">
			<view class="tab" @click="childClick(item.val)" :class="curOrderTab==item.val?'active':''" v-for="item in orderTab"
			 :key="item.val">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				curOrderTab: 1,
				orderTab: [{
						name: '综合排序',
						val: 1
					},
					{
						name: '最新发布',
						val: 2
					},
					{
						name: '热门点击',
						val: 3
					},
				],
			}
		},
		methods:{
			childClick(value){
				this.curOrderTab = value;
				this.$parent.initList()
				this.$parent.req_activitysByCondition()
			}
		}
	}
</script>

<style lang="scss">
	.orderTabs {
		display: flex;
		margin-bottom: 20rpx;
		margin-top: 20rpx;
	
		.tab {
			font-size: 20rpx;
			color: #6F7280;
			background: #F5F6FA;
			border-radius: 10rpx;
			padding: 6rpx 10rpx;
			margin-left: 30rpx;
		}
	
		.active {
			background: #617397;
			color: #fff;
		}
	}
</style>
