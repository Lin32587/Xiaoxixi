import {
	infoType,
	infoBanner,
	getImg
} from '@/common/http.api.js'
import {
	publicImgPath
} from '@/common/interface.js'
let myMixin = {
	data() {
		return {
			infoList: [],
			loading: false,
			pageNum: 1,
			typeList: [],
			showlist: []
		}
	},
	methods: {
		// 获取全部筛选条件
		req_infoType() {
			infoType().then(res => {
				if (res.code == 200) {
					let arr = res.data.map(item => {
						let data = {
							name: item.Name,
							val: item.Id
						}
						return data
					})
					this.typeList = arr
				}
			})
		},
		initList() {
			this.pageNum = 1;
			this.infoList = []
		},
		changeType(e) {
			this.tabData.Type = this.typeList[e].val
			this.initList();
			this.req_activitysByCondition()
		},
		changeTime(e) {
			this.tabData.Time = this.timeList[e].val
			this.initList()
			this.req_activitysByCondition()
		},
		changePay(e) {
			this.tabData.Pay = this.priceList[e].val
			this.initList()
			this.req_activitysByCondition()
		},
		// 获取banner
		req_getImg(type) {
			let data = {
				typeNameId: type
			}
			getImg(data).then(res => {
				if (res.code == 200) {
					// this.showlist = res.data.map(item => {
					// 	let data = publicImgPath + item.Image
					// 	return data
					// })
					if(res.data.FirstImage){
						this.showlist.push(publicImgPath + res.data.FirstImage)
					}
					if(res.data.SecondImage){
						this.showlist.push(publicImgPath + res.data.SecondImage)
					}
					if(res.data.ThirdImage){
						this.showlist.push(publicImgPath + res.data.ThirdImage)
					}
				}
			})
		}
	},
	created() {
		this.req_infoType()
		this.req_activitysByCondition()
	},
	onReachBottom() {
		this.req_activitysByCondition(true)
	}
}

export default myMixin
