<script>
	import {
		getUser,
		loginUrl,
	} from '@/common/interface.js'
	export default {
		globalData: {
			userId: '',
			openId: '',
			userName:'',
			userImage:'',
			userAuth:'',
			islogin: false
		},
		onLaunch: function() {
			console.log(process.env.NODE_ENV)
			this.globalData.userId = uni.getStorageSync('userId')
			this.globalData.openId = uni.getStorageSync('openId')
			this.globalData.userName = uni.getStorageSync('userName')
			this.globalData.userImage = uni.getStorageSync('userImage')
			this.globalData.userAuth = uni.getStorageSync('userAuth')
			let that = this
			if (this.globalData.userId == '' || this.globalData.openId == '') {
				this.globalData.islogin = false
			} else {
				this.globalData.islogin = true
				this.$store.commit('upDateUserid', this.globalData.userId)
				this.$store.commit('upDateOpenid', this.globalData.openId)
				this.$store.commit('upDateUserimage', this.globalData.userImage)
				this.$store.commit('upDateUsername', this.globalData.userName)
				this.$store.commit('upDateAuth', this.globalData.userAuth)
			}
		},
		onShow: function() {
			
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 此处为style标签内容的最前面 */
	@import "./static/iconfont.css";
	@import "uview-ui/index.scss";

	page {
		height: 100% !important;
		background: #F5F6FA 100%;
	}
</style>
