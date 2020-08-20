<template>
	<view>
		<image :src="img" mode=""></image>
	</view>
</template>

<script>
	import {
		getImg
	} from '@/common/http.api.js'
	export default {
		data() {
			return {
				img:''
			};
		},
		onLoad() {
			getImg({typeNameId:5}).then(res=>{
				this.img = res.data.FirstImage
			}).catch()
		}
	}
</script>

<style lang="scss">
image{
	display: block;
	width: 100%;
}
</style>
