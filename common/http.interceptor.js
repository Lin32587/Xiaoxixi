let config = {
	baseUrl: '', // 请求的本域名
	// 设置为json，返回后会对数据进行一次JSON.parse()
	dataType: 'json',
	showLoading: false, // 是否显示请求中的loading
	loadingText: '请求中...', // 请求loading中的文字提示
	// loadingTime: 10000, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
	originalData: true, // 是否在拦截器中返回服务端的原始数据
	loadingMask: false, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
	// 配置请求头信息
	header: {
		'content-type': 'application/json;charset=UTF-8'
	},
}
import {
	posts
} from '@/common/interface.js'
import {
	removeUserData
} from '@/common/util.js'
let isLogin = false
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig(config);
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// console.log(getApp().globalData.userId)
		isLogin = getApp().globalData.islogin
		let env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
		// console.log('env', env, 'isLogin', isLogin)
		if (config.url == posts || isLogin == true) {
			config.header = {
				...config.header,
				Authorization: vm.$store.state.gOpenid
			}
			return config
		} else {
			if (env === 'prod') {
				uni.showToast({
					title: '请先授权',
					icon: 'none',
					duration: 800
				})
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/indexs/mindex'
					})
					return false
				}, 810)
			}
		}
		return config
	}
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if (res.statusCode == 200) {
			let code = res.data.code
			if (code == 0) {
				vm.$u.toast('验证失败，请重新登录');

			} else if (code == 500) {
				vm.$u.toast(res.data.message);
			} else if (code == 87014) {
				vm.$u.toast(res.data.message);
			} else if (code == 502) {
				vm.$u.toast('请重新登录');
				setTimeout(() => {
					removeUserData(vm)
				})
			}
			return res.data
		} else {
			vm.$u.toast('请求失败');
		}
	}
}

export default {
	install
}
