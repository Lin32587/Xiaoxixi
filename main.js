import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false
import globalMixin from '@/common/globalMixin.js'
import store from '@/store/index.js'

// Vue.prototype.$store = store //把vuex定义成全局组件

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
Vue.mixin(globalMixin)
// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)
app.$mount()

export default app;
