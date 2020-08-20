export let timefomat = (time, formater) => {
	if (!time) return time
	// let time = timeStamp.toString().replace("/Date(", "").replace(")/", "")
	// const date = new Date(time.replace(/-/g, '/')) // parseInt(time)
	let fmt = (formater != null) ? formater : 'yyyy-MM-dd hh:mm:ss'
	const o = {
		'M+': time.getMonth() + 1, // 月
		'd+': time.getDate(), // 日
		'h+': time.getHours(), // 小时
		'm+': time.getMinutes(), // 分
		's+': time.getSeconds(), // 秒
		'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
		'S': time.getMilliseconds() // 毫秒
	}

	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
	for (const k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
		}
	}

	return fmt
}


export let myuniReq = (url, data, method) => {
	return uni.request({
		url: url,
		method: method,
		data: data
	})
}

export let myToast = (msg) => {
	uni.showToast({
		icon: 'none',
		title: msg,
		duration: 800
	})
}

export let filter = (dome) => {
	dome.forEach((item)=>{
		switch (item.ActionType) {
			case 1:
				item.text = '评论'
				return
			case 2:
				item.text = '转发您的帖子'
				return
			case 3:
				item.text = '给您点赞'
				return
			case 4:
				item.text = '发表帖子'
				return
			case 5:
				item.text = '举报您'
				return
		}
	})
}

/**
 * @property{Number}userid
 * @property{Number}opendi
 * 
 */
export let setUserData = (rawData, context) => {
	// setUserData(e.data.data.Id, e.data.data.OpenId, that)
	let userid = rawData.Id
	let openid = rawData.OpenId
	let UserImage = rawData.UserImage
	let username = rawData.username
	let userAuth = rawData.Auth
	uni.setStorageSync('userId', userid)
	uni.setStorageSync('openId', openid)
	uni.setStorageSync('userName',username)
	uni.setStorageSync('userImage',UserImage)
	uni.setStorageSync('userAuth',userAuth)
	getApp().globalData.userId = userid
	getApp().globalData.openId = openid
	getApp().globalData.userName = username
	getApp().globalData.userImage = UserImage
	getApp().globalData.userAuth = userAuth
	context.$store.commit('upDateUserid', userid)
	context.$store.commit('upDateUsername', username)
	context.$store.commit('upDateUserimage', UserImage)
	context.$store.commit('upDateOpenid', openid)
	context.$store.commit('upDateAuth', userAuth)
}

export let removeUserData = (context) => {
	getApp().globalData.islogin = false
	uni.removeStorageSync('userId')
	uni.removeStorageSync('openId')
	getApp().globalData.userId = ''
	getApp().globalData.openId = ''
	context.$store.commit('upDateUserid', 0)
	context.$store.commit('upDateOpenid', 0)
	uni.switchTab({
		url: '/pages/indexs/mindex'
	})
}
