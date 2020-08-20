let env = process.env.NODE_ENV
let baseUrl = ''
if (env === 'development') {
	baseUrl = 'http://192.168.0.156:9033'
} else {
	baseUrl = 'https://www.xiaoxixiplus.com/wxapp'
}
// let baseUrl = 'http://120.78.79.186:8080'
// let baseUrl = 'http://192.168.43.103:9033'  //热点
// let baseUrl = '120.78.79.186:2375'  //docker
// export let publicImgPath=`http://192.168.0.156:9033/uploads/`
export let publicImgPath = `${baseUrl}/uploads/`


export let posts = `${baseUrl}/api/v1/circle/posts` //获取全部帖子
export let postsByFoucs = `${baseUrl}/api/v1/circle/postsByFoucs` //获取关注帖子
export let post = `${baseUrl}/api/v1/circle/post` //获取单个帖子 

export let like = `${baseUrl}/api/v1/circle/like` //点赞

export let getUser = `${baseUrl}/api/v1/person/Getuser` //获取用户

export let comment = `${baseUrl}/api/v1/circle/comment` //获取单个帖子评论详情
export let reply = `${baseUrl}/api/v1/circle/reply` //回复

export let transmit = `${baseUrl}/api/v1/circle/transmit` //查看贴子转发

export let addpost = `${baseUrl}/api/v1/circle/post` //添加帖子 

export let getUserById = `${baseUrl}/api/v1/circle/postUser` //通过用户id获取他发表的帖子
export let cpostCollect = `${baseUrl}/api/v1/person/cpost` //圈子收藏
export let ctransmit = `${baseUrl}/api/v1/circle/transmit` //圈子转发
export let delCollect = `${baseUrl}/api/v1/person/delCpost` //取消圈子收藏
export let cpostDel = `${baseUrl}/api/v1/circle/getPost` //删除帖子
export let collectPost = `${baseUrl}/api/v1/circle/collectPost` //获取收藏的圈子帖子
export let userfocus = `${baseUrl}/api/v1/person/focus` //关注他人
export let uerByFocus = `${baseUrl}/api/v1/person/uerByFocus` //判断有无关注
export let addAuthUser = `${baseUrl}/api/v1/person/user` //添加认证用户



// 图片
export let imgPath = `${baseUrl}/api/v1/image` //图片链接
export let imgUrl = `${baseUrl}/api/v1/common/image` //图片链接


// 寻伴
export let fcategory1 = `${baseUrl}/api/v1/find/fcategory1` //获取级别类型一 

export let fcategory2 = `${baseUrl}/api/v1/find/fcategory2` //获取级别类型二 
export let fposts = `${baseUrl}/api/v1/find/fposts` //根据条件获取寻伴帖子 
export let fpost = `${baseUrl}/api/v1/find/fpost` //寻伴帖子详情 
export let fcomment = `${baseUrl}/api/v1/find/fcomment` //寻伴 获取评论详情
export let flike = `${baseUrl}/api/v1/find/flike` //寻伴 获取单个点赞详情
export let ftransmit = `${baseUrl}/api/v1/find/ftransmit` //寻伴 获取单个转发详情
export let freply = `${baseUrl}/api/v1/find/freply` //寻伴 添加评论的回复
export let fpostUser = `${baseUrl}/api/v1/find/fpostUser` //寻伴 通过用户id获取他发表的帖子
export let collectFPost = `${baseUrl}/api/v1/find/collectFPost` //寻伴 获取收藏
export let addFpostCollect = `${baseUrl}/api/v1/person/fpost` //寻伴 获取收藏
export let endFpost = `${baseUrl}/api/v1/find/state/` //寻伴 结束
export let delgetfpost = `${baseUrl}/api/v1/find/getfpost` //寻伴 删除
export let delFpost = `${baseUrl}/api/v1/person/delFpost` //寻伴 取消收藏

// 登录
export let loginUrl = `${baseUrl}/login` //登录

//个人信息
export let editProfile = `${baseUrl}/api/v1/person/edituser` //修改个人信息

//获取字数限制
export let maxLength = `${baseUrl}/api/v1/common/wordCount`

// 资讯
export let getInfoByid = `${baseUrl}/api/v1/info/activity` //通过id获取资讯
export let infoCollect = `${baseUrl}/api/v1/info/collect` //收藏
export let activityandTicket = `${baseUrl}/api/v1/info/activityandTicket` //通过获取票务信息和资讯
export let infoOrder = `${baseUrl}/api/v1/info/order` //更新订单的个人信息
export let infoactivitys = `${baseUrl}/api/v1/info/activitys` //资讯 获取收藏列表
export let infoType = `${baseUrl}/api/v1/info/type` //资讯类型
export let activitysByCondition = `${baseUrl}/api/v1/info/activitysByCondition` //资讯 获取
export let OrderByUser = `${baseUrl}/api/v1/info/OrderByUser` //根据用户id获取订单(已支付)
export let orderAllByUser = `${baseUrl}/api/v1/info/orderAllByUser` //根据用户Id所有订单
export let orderNoPayByUser = `${baseUrl}/api/v1/info/orderNoPayByUser` //根据用户Id未支付
export let bandDetail = `${baseUrl}/api/v1/info/band` //获取组织详情
export let ActivityByBand = `${baseUrl}/api/v1/info/ActivityByBand` //根据组织id获取活动
export let infoBanner = `${baseUrl}/api/v1/info/banner` //根据活动类型id获取banner

// 支付
export let payment = `${baseUrl}/api/v1/info/payment` //支付
export let editpayment = `${baseUrl}/api/v1/info/editpayment` //刷新支付
export let paymentItem = `${baseUrl}/api/v1/info/paymentItem` //查看支付条目
export let findPaydetail = `${baseUrl}/api/v1/info/findPaydetail` //查看支付具体信息

// 举报
export let accReason = `${baseUrl}/api/v1/informant/reason` //举报理由
export let addAcc = `${baseUrl}/api/v1/informant/informer` //添加举报
export let accInformers = `${baseUrl}/api/v1/informant/informers` //获取该用户所有举报帖子

// 搜索
export let queryAll = `${baseUrl}/api/v1/find/queryAll` //通过查询内容获取帖子或资讯的特定内容

//消息中心
export let unReadMessageCount = `${baseUrl}/api/v1/person/unReadMessageCount` //获取未读信息数量
export let unReadMessage = `${baseUrl}/api/v1/person/unReadMessage` //获取全部未读信息
export let message = `${baseUrl}/api/v1/person/message` //获取全部信息
export let messageMode = `${baseUrl}/api/v1/person/message/` //修改信息状态
