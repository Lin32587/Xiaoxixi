import * as INTER from './interface.js'
import vm from '@/main.js'

// 获取全部帖子
export let posts = (data) => {
	return vm.$u.get(INTER.posts, data)
}
// 获取关注帖子
export let postsByFoucs = (data) => {
	return vm.$u.get(INTER.postsByFoucs, data)
}
// 获取单个帖子详情
export let post = (data) => {
	// let url = INTER.post + data
	return vm.$u.get(INTER.post, data)
}

// 点赞
export let addLike = (data) => {
	return vm.$u.post(INTER.like, data)
}

// 取消点赞
export let removeLike = (data) => {
	return vm.$u.put(INTER.like, data)
}

// 获取单个点赞详情
export let getLikeDetail = (data) => {
	return vm.$u.get(INTER.like, data)
}

// 获取用户
export let getUser = (data) => {
	// console.log('获取用户', INTER.getUser)
	return vm.$u.get(INTER.getUser, data)
}

// 获取单个帖子评论详情
export let commentapi = (data) => {
	return vm.$u.get(INTER.comment, data)
}
// 圈子 添加评论
export let addComment = (data) => {
	return vm.$u.post(INTER.comment, data)
}
// 圈子转发
export let addctransmit = (data) => {
	return vm.$u.post(INTER.ctransmit,data)
}
// 圈子 添加评论的回复

export let addReply = (data) => {
	return vm.$u.post(INTER.reply, data)
}
// 圈子 通过用户id获取他发表的帖子
export let getUserPostById = (data) => {
	return vm.$u.get(INTER.getUserById, data)
}

// 添加帖子
export let addCircle = (data) => {
	return vm.$u.post(INTER.addpost, data)
}

// 查看帖子的转发详情
export let transmit = (data) => {
	return vm.$u.get(INTER.transmit, data)
}

// 获取级别类型一
export let fcategory1 = (data) => {
	return vm.$u.get(INTER.fcategory1, data)
}

// 获取级别类型二
export let fcategory2 = (data) => {
	return vm.$u.get(INTER.fcategory2, data)
}

// 根据条件获取寻伴帖子
export let fposts = (data) => {
	return vm.$u.get(INTER.fposts, data)
}

// 获取寻伴单个帖子
export let singlePost = (data) => {
	// let url = INTER.fpost + "/" + data
	return vm.$u.get(INTER.fpost, data)
}

export let fcomment = (data) => {
	return vm.$u.get(INTER.fcomment, data)
}
export let flike = (data) => {
	return vm.$u.get(INTER.flike, data)
}
export let ftransmit = (data) => {
	return vm.$u.get(INTER.ftransmit, data)
}

// 添加评论
export let addfComment = (data) => {
	return vm.$u.post(INTER.fcomment, data)
}

// 寻伴添加点赞
export let addfLike = (data) => {
	return vm.$u.post(INTER.flike, data)
}

// 寻伴取消点赞
export let removefLike = (data) => {
	return vm.$u.put(INTER.flike, data)
}

// 寻伴增加转发
export let addftransmit = (data) => {
	return vm.$u.post(INTER.ftransmit, data)
}

// 寻伴添加评论的回复
export let freply = (data) => {
	return vm.$u.post(INTER.freply, data)
}

// 发表寻伴帖子
export let addfpost = (data) => {
	return vm.$u.post(INTER.fpost, data)
}

// 通过用户id获取他发表的帖子
export let getfpostByid = (data) => {
	return vm.$u.get(INTER.fpostUser, data)
}

// 获取公共图片
export let getImg = (data) => {
	return vm.$u.get(INTER.imgUrl, data)
}

// 上传图片
export let uploadImg = (data) => {
	return vm.$u.post(INTER.imgPath, data)
}

// 删除图片
export let delImg = (data) => {
	return vm.$u.get(INTER.imgPath, data)
}

// 资讯
// 通过id获取资讯
export let getInfoByid = (data) => {
	// let url = INTER.getInfoByid + "/" + data
	return vm.$u.get(INTER.getInfoByid, data)
}

// 添加收藏
export let infoAddCollect = (data) => {
	return vm.$u.post(INTER.infoCollect, data)
}

// 取消收藏
export let infoRemoveCollect = (data) => {
	return vm.$u.put(INTER.infoCollect, data)
}

// 通过获取票务信息和资讯
export let activityandTicket = (data) => {
	return vm.$u.get(INTER.activityandTicket, data)
}

// 更新订单的个人信息
export let infoOrder = (data) => {
	return vm.$u.put(INTER.infoOrder, data)
}

// 添加资讯订单
export let addInfoOrder = (data) => {
	return vm.$u.post(INTER.infoOrder, data)
}
// 通过id获取订单
export let getInfoOrderByoid = (data) => {
	return vm.$u.get(INTER.infoOrder, data)
}

// 添加支付
export let addpayment = (data) => {
	return vm.$u.get(INTER.payment, data)
}

// 刷新支付信息
export let refreshPayment = (data) => {
	return vm.$u.get(INTER.editpayment, data)
}

// 查看支付条目
export let paymentItem = (data) => {
	return vm.$u.get(INTER.paymentItem, data)
}


// 圈子  添加帖子收藏
export let cpostCollect = (data) => {
	return vm.$u.post(INTER.cpostCollect, data)
}
// 圈子 取消收藏
export let delCollect = (data) => {
	return vm.$u.post(INTER.delCollect, data)
}
// 圈子  删除帖子
export let cpostDel = (data) => {
	return vm.$u.get(INTER.cpostDel, data)
}

// 圈子  获取收藏
export let collectPost = (data) => {
	return vm.$u.get(INTER.collectPost, data)
}

// 关注他人
export let userfocus = (data) => {
	return vm.$u.post(INTER.userfocus, data)
}

// 获取寻伴收藏
export let collectFPost = (data) => {
	return vm.$u.get(INTER.collectFPost, data)
}
// 获取资讯收藏
export let infoactivitys = (data) => {
	return vm.$u.get(INTER.infoactivitys, data)
}

// 添加寻伴收藏
export let addFpostCollect = (data) => {
	return vm.$u.post(INTER.addFpostCollect, data)
}

//删除寻伴收藏
export let delFpostCollect = (data) => {
	return vm.$u.post(INTER.delFpost,data)
}

// 结束寻伴
export let endFpost = (data) => {
	let url = INTER.endFpost + data
	return vm.$u.put(url, {})
}
// 获取举报理由
export let accReason = (data) => {
	return vm.$u.get(INTER.accReason, data)
}

// 寻伴 删除
export let delgetfpost = (data) => {
	return vm.$u.get(INTER.delgetfpost, data)
}

//添加举报
export let addAcc = (data) => {
	return vm.$u.post(INTER.addAcc, data)
}

//获取该用户的所有举报帖子
export let accInformers = (data) => {
	return vm.$u.get(INTER.accInformers, data)
}

//资讯 获取全部筛选的类型
export let infoType = (data) => {
	return vm.$u.get(INTER.infoType, data)
}
//资讯 根据条件获取资讯帖子
export let activitysByCondition = (data) => {
	return vm.$u.get(INTER.activitysByCondition, data)
}

//资讯 查看支付具体信息
export let findPaydetail = (data) => {
	return vm.$u.get(INTER.findPaydetail, data)
}

//我的 资讯 查看支付具体信息
export let OrderByUser = (data) => {
	return vm.$u.get(INTER.OrderByUser, data)
}
//圈子 判断有无关注
export let uerByFocus = (data) => {
	return vm.$u.get(INTER.uerByFocus, data)
}

//圈子 取消关注
export let removeUerByFocus = (data) => {
	return vm.$u.put(INTER.userfocus, data)
}

//资讯 根据用户Id所有订单
export let orderAllByUser = (data) => {
	return vm.$u.get(INTER.orderAllByUser, data)
}

//资讯 根据用户Id未支付
export let orderNoPayByUser = (data) => {
	return vm.$u.get(INTER.orderNoPayByUser, data)
}

//通过查询内容获取帖子或资讯的特定内容
export let queryAll = (data) => {
	return vm.$u.get(INTER.queryAll, data)
}

//添加认证用户
export let addAuthUser = (data) => {
	return vm.$u.put(INTER.addAuthUser, data)
}

//获取组织详情
export let bandDetail = (data) => {
	return vm.$u.get(INTER.bandDetail, data)
}

//根据组织id获取活动
export let ActivityByBand = (data) => {
	return vm.$u.get(INTER.ActivityByBand, data)
}

//根据活动类型id获取banner
export let infoBanner = (data) => {
	return vm.$u.get(INTER.infoBanner, data)
}

//修改用户个人信息
export let editProfile = (data) => {
	return vm.$u.post(INTER.editProfile, data)
}

//获取未读信息数量
export let unReadMessageCount = (data) => {
	return vm.$u.get(INTER.unReadMessageCount, data)
}
//获取全部未读信息
export let unReadMessage = (data) => {
	return vm.$u.get(INTER.unReadMessage,data)
}
//获取全部信息
export let message = (data) => {
	return vm.$u.get(INTER.message,data)
}
//修改信息状态
export let messageMode = (data) => {
	let url = INTER.messageMode + data
	return vm.$u.put(url, {})
}
//获取字体数量限制
export let maxLength = (data) => {
	return vm.$u.get(INTER.maxLength, data)
}