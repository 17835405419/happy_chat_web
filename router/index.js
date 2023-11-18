import Vue from 'vue'
import uniCrazyRouter from "uni-crazy-router";
import store from "@/store"
Vue.use(uniCrazyRouter)

uniCrazyRouter.beforeEach(async (to, from ,next)=>{
    // 逻辑代码
	// 判断是否登录，没有登陆就跳转到登录页，并且要去除对登录页的拦截，否则会死循环
		const notLoginArr = ["/pages/index/index","/pages/login/login","/page/resiter/resiter"]
		notLoginArr.forEach(item=>{
			if(!store.state.vuex_token && to.url !==item){
				uniCrazyRouter.afterNotNext(() => {
					// 拦截路由，并且跳转去登录页
					uni.showToast({
						title: '您未登录，请先登录'
					})
					setTimeout(() => { 
						uni.navigateTo({
							url: '/pages/login/login'
						})
					})
				}, 1000)
				return // 拦截路由，不执行next
			}
		
		})
    next()
})

uniCrazyRouter.afterEach((to, from)=>{
    // 逻辑代码
})

uniCrazyRouter['on'+'Error']((to, from)=>{
    // 逻辑代码
})