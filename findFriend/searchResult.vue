<template>
	<view>
		<view class="header" @click="backToSearch">
			<u-search placeholder="搜你想搜的~" :disabled="true" v-model="keyword"></u-search>
		</view>
		<view class="tabBox">
			<u-tabs :list="tabList" active-color="#1D3156" :is-scroll="false" :current="currentTab" @change="tabChange"></u-tabs>
		</view>
		<view class="searchContent">
			<view v-if="currentTab==0">
				<view class="searchItem" v-for="(item,idx) in allList" :key="idx">
					<searchBlock :searchData="item"></searchBlock>
				</view>
			</view>
			<view v-else-if="currentTab==1">
				<view class="searchItem" v-for="(item,idx) in infoList" :key="idx">
					<searchBlock :searchData="item"></searchBlock>
				</view>
			</view>
			<view v-else-if="currentTab==2">
				<view class="searchItem" v-for="(item,idx) in friendList" :key="idx">
					<searchBlock :searchData="item"></searchBlock>
				</view>
			</view>
			<myloading :loading="loading"></myloading>
		</view>
	</view>
</template>

<script>
	import {
		queryAll
	} from '@/common/http.api.js'
	import myloading from '@/mycomponents/common/myLoading.vue'
	import searchBlock from '@/mycomponents/findFriend/searchBlock.vue'
	export default {
		components: {
			searchBlock,
			myloading
		},
		data() {
			// 0:全部 1：资讯  2：寻伴 3：组织  4：x-expert
			// State 搜索的类型 全部0 资讯1 寻伴2 post
			return {
				keyword: '',
				tabList: [{
						name: '全部'
					},
					{
						name: '资讯'
					},
					{
						name: '寻伴'
					},
					{
						name: '组织'
					},
					// {
					// 	name: 'X-EXPERT'
					// },
				],
				currentTab: 0,
				pageNums: [1, 1, 1, 1, 1],
				allList: [], //全部列表
				infoList: [], //资讯列表
				friendList: [], //寻伴列表
				loading: false
			};
		},
		methods: {
			backToSearch() {
				this.$u.route('/findFriend/searchPage')
			},
			tabChange(e) {
				this.currentTab = e
				if (e == 0 && this.allList.length == 0) {
					this.req_queryAll()
				} else if (e == 1 && this.infoList.length == 0) {
					this.req_queryAll()
				} else if (e == 2 && this.friendList.length == 0) {
					this.req_queryAll()
				}
			},
			req_queryAll(isBottom) {
				this.loading = true
				let pageNum = this.pageNums[this.currentTab]
				pageNum = isBottom == true ? pageNum++ : pageNum
				let data = {
					Content: this.keyword,
					State: this.currentTab,
					PageNum: pageNum,
					PageSize: 10
				}
				queryAll(data).then(res => {
					this.loading = false
					if (res.code == 200) {
						let rawdata = res.data
						let list = [...rawdata.activities, ...rawdata.posts]
						this.handleResponse(list)
					}
				})
			},
			handleResponse(list) {
				if (list.length <= 0) {
					this.gmyToast('没有更多了')
					return
				}
				this.pageNums[this.currentTab]++
				// State 搜索的类型 全部0 资讯1 寻伴2
				switch (this.currentTab) {
					case 0:
						list = this.shuffleList(list)
						this.allList.push(...list)
						return
					case 1:
						this.infoList.push(...list)
						return
					case 2:
						this.friendList.push(...list)
						return
				}
			},
			// 打乱数组顺序----只有全部数组需要
			shuffleList(list) {
				let arr = [...list]
				for (let i = arr.length - 1; i >= 0; i--) {
					let rIndex = Math.floor(Math.random() * (i + 1));
					// 打印交换值
					// console.log(i, rIndex);
					let temp = arr[rIndex];
					arr[rIndex] = arr[i];
					arr[i] = temp;
				}
				return arr;
			}
		},
		onLoad(e) {
			if (e.content) {
				this.keyword = e.content
			}
			this.req_queryAll()
		},
		onReachBottom() {
			this.req_queryAll(true)
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		background: #fff;
		box-sizing: border-box;
		padding: 20rpx 40rpx
	}

	.tabBox {
		background: #fff;
		border-top: solid 2rpx #f8f8fb;
		box-sizing: border-box;
		padding-bottom: 10rpx;
	}

	.searchContent {
		box-sizing: border-box;
		padding: 0 20rpx;
		padding-top: 2rpx;
		padding-bottom: 40rpx;


		.searchItem {
			background: #fff;
			margin-top: 20rpx;
			box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
			box-sizing: border-box;
			padding: 30rpx 20rpx;
			border-radius: 20rpx;
		}
	}
</style>
