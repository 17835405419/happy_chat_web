import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from '@/store/index.js';
import './uni.promisify.adaptor'
import './router' // 引入路由
import io from "socket.io-client"
const socketConn = io('http://localhost:3001',{
	query:{
		token:store.state.vuex_token
	}
});  // 链接socket地址



Vue.prototype.$socket = socketConn; // 挂载socket链接

Vue.config.productionTip = false
App.mpType = 'app'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

const app = new Vue({
	store,
  ...App
})
// 挂载接口请求配置 
require("./api/http.interceptor.js")(app)
// 为接口文件挂载 vue实例 
require("./api/api.js")(app)



app.$mount()
// #endif




// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif