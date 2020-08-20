import {
	myToast,
	filter
} from '@/common/util.js'
let obj = {
	data() {
		return {}
	},
	onShareAppMessage() {

	},
	onShareTimeline() {

	},
	computed: {
		gUserid() {
			let env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
			// return  this.$store.state.gUserid
			// return env == 'dev' ? 26 : this.$store.state.gUserid
			return this.$store.state.gUserid
		},
		gOpenid() {
			let env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
			// return  this.$store.state.gUserid
			return this.$store.state.gOpenid
		},
		gUsername() {
			return this.$store.state.gUsername
		},
		gUserimage() {
			return this.$store.state.gUserimage
		}
	},
	methods: {
		gmyToast(msg) {
			myToast(msg)
		},
		filters(deom) {
			filter(deom)
		}
	}
}

export default obj
