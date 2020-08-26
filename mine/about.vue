<template>
	<view>
		<image :src="publicImgPath+img" mode=""></image>
	</view>
</template>

<script>
	import {
		getImg
	} from '@/common/http.api.js'
	import {
		publicImgPath
	} from '@/common/interface.js'
	export default {
		data() {
			return {
				img:'',
				publicImgPath:publicImgPath
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
	display: flex;
	width: 100vw;
	height: 100vh;
}
</style>
