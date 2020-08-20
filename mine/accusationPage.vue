<template>
	<view>
		<view class="header">
			<u-tabs :list="tabList" :is-scroll="false" :current="currentTab" @change="change" bar-width="100" active-color="#1D3156"></u-tabs>
		</view>
		<view class="core_block">
			<!-- 发起举报 -->
			<view class="sendAccusation" v-if="currentTab==0">
				<sendAccusation @switchTab="currentTab=1" :reqdata="reqdata" :title="accTitle"></sendAccusation>
			</view>
			<!-- 我的举报 -->
			<view class="myAccustion" v-if="currentTab==1">
				<myAccustion></myAccustion>
			</view>
		</view>
	</view>
</template>

<script>
	import sendAccusation from '@/mycomponents/mime/accusation/sendAccusation.vue'
	import myAccustion from '@/mycomponents/mime/accusation/myAccusation.vue'
	export default {
		components: {
			sendAccusation,
			myAccustion
		},
		data() {
			return {

				tabList: [{
					name: '发起举报'
				}, {
					name: '我的举报'
				}],
				currentTab: 0,
				reqdata: '',
				accTitle: ''
			}
		},
		methods: {
			change(index) {
				this.currentTab = index;
			},
		},
		onLoad(e) {
			this.reqdata = e.data
			this.accTitle = e.title
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		background: #fff;
		box-sizing: border-box;
		padding-bottom: 10rpx;
	}

	.core_block {
		padding: 20rpx;
		box-sizing: border-box;
	}
</style>
