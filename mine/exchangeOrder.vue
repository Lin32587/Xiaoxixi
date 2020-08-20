<template>
	<view class="wrapper">
		<view class="brick_box" v-for="(item,idx) in infoList" :key="idx">
			<infoBrick :infoData="item"></infoBrick>
		</view>
		<myloading :loading="loading"></myloading>
	</view>
</template>

<script>
	import {
		OrderByUser
	} from '@/common/http.api.js'
	import infoBrick from '@/mycomponents/mime/infoBrick.vue'
	import myloading from '@/mycomponents/common/myLoading.vue'
	export default {
		components: {
			infoBrick,
			myloading
		},
		data() {
			return {
				pageNum: 1,
				infoList: [],
				loading: false
			};
		},
		methods: {
			req_OrderByUser(isBottom) {
				this.loading = true
				let myPageNum = this.pageNum

				let data = {
					PageNum: isBottom == true ? myPageNum++ : myPageNum,
					PageSize: 5,
					UserId: this.gUserid
				}
				OrderByUser(data).then(res => {
					this.loading = false
					if (res.code == 200) {
						if (res.data.orders && res.data.orders.length > 0) {
							this.infoList.push(...res.data.orders)
							this.pageNum++
						}
					}
				})

			}
		},
		created() {
			this.req_OrderByUser()
		},
		onReachBottom() {
			this.req_OrderByUser(true)
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		box-sizing: border-box;
		padding: 20rpx;
	}

	.brick_box {
		box-sizing: border-box;
		border-radius: 20rpx;
		background: #fff;
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
		margin-top: 20rpx;
	}
</style>
