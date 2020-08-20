import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		gUsername: '',
		gUserimage: '',
		gUserid: 0,
		gOpenid: 0,
		gAuth: 0, //认证 0无认证 1认证
	},
	mutations: {
		upDateUserid(state, payload) {
			state.gUserid = payload
		},
		upDateUsername(state, payload) {
			state.gUsername = payload
		},
		upDateUserimage(state, payload) {
			state.gUserimage = payload
		},
		upDateOpenid(state, payload) {
			state.gOpenid = payload
		},
		upDateAuth(state, payload) {
			state.gAuth = payload
		}
	},
	actions: {}
})
export default store
