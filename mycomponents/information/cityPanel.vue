<template>
	<view class="wrapper">
		<brickShell title="常用地点">
			<view class="btn_groups">
				<view class="baseBtn mr10" :class="item.val==active?'active':''" @click="singleCtrl(item)" v-for="(item,idx) in usualList">{{item.name}}</view>
			</view>
		</brickShell>
		</brickShell>
		<brickShell title="热门地点">
			<view class="btn_groups hot_btns">
				<view :class="item.val==active?'active':''" @click="singleCtrl(item)" class="baseBtn mb10" v-for="(item,idx) in cityList"
				 :key="idx">{{item.name}}</view>
			</view>
		</brickShell>
		<brickShell title="院校列表">
			<view :class="item.val==active?'longAcive':''" class="longBtn mb10" @click="singleCtrl(item)" v-for="(item,idx) in schoolList"
			 :key="idx">{{item.name}}</view>
		</brickShell>
		<view class="comfirm_btn" @click="comfirmBtn">确定</view>
	</view>
</template>

<script>
	import brickShell from '@/mycomponents/findFriend/brickShell.vue'
	export default {
		components: {
			brickShell
		},
		data() {
			return {
				active: 'u2',
				activeItem: {},
				usualList: [{
						name: '武汉',
						val: 'u1'
					},
					{
						name: '全国',
						val: 'u2'
					},
				],
				cityList: [{
						name: '北京',
						val: 'c1'
					},
					{
						name: '上海',
						val: 'c2'
					},
					{
						name: '广州',
						val: 'c3'
					},
					{
						name: '深圳',
						val: 'c4'
					},
					{
						name: '杭州',
						val: 'c5'
					},
					{
						name: '南京',
						val: 'c6'
					},
					{
						name: '武汉',
						val: 'c7'
					},
					{
						name: '成都',
						val: 'c8'
					},
					{
						name: '长沙',
						val: 'c9'
					},
				],
				schoolList: [{
						name: '武汉大学',
						val: 's1'
					},
					{
						name: '华中科技大学',
						val: 's2'
					},
					{
						name: '武汉理工大学',
						val: 's3'
					},
				],
			}
		},
		props: {
			fatherAcive: {
				default: ''
			}
		},
		methods: {
			singleCtrl(item) {
				this.active = item.val
				this.activeItem = item
				// this.$emit('cityEvent', item)
			},
			comfirmBtn() {
				this.$emit('closeCity', this.activeItem)
			}
		},
		created() {
			if (this.fatherAcive != '') {
				this.active = this.fatherAcive
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		border-bottom-right-radius: 20rpx;
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		background: #fff;
	}

	@mixin baseBtn {
		background: #F5F6FA;
		color: #101010;
		@include xCenter;
		border-radius: 28rpx;
		width: 198rpx;
		height: 56rpx;
		font-size: 28rpx;
	}

	.btn_groups {
		display: flex;
	}

	.hot_btns {
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.baseBtn {
		@include baseBtn
	}

	.active {
		color: #fff;
		background: #384E79;
	}

	.mt {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.longBtn {
		@include baseBtn;
		width: 100%;
	}

	.longAcive {
		color: #fff;
		background: #384E79;
	}

	.comfirm_btn {
		color: #fff;
		font-size: 28rpx;
		@include xCenter;
		height: 96rpx;
		background: #384E79;
		margin-top: 20rpx;
	}

	.mt10 {
		margin-top: 20rpx;
	}

	.mb10 {
		margin-bottom: 20rpx;
	}

	.mr10 {
		margin-right: 20rpx;
	}
</style>
