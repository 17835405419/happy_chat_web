module.exports = (vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	uni.$u.http.setConfig((config) => {
		config.baseURL = 'http://localhost:3000';
		config.dataType = 'json';
		config.custom.toast = true; //默认错误弹窗
		return config
	})


	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作

		// 根据custom参数中配置的是否需要token，添加对应的请求头
		
		if (config?.custom?.auth) {
			
			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			config.header.Authorization = "Bearer " + vm.$store.state.vuex_token
		
		}
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data

		// 自定义参数
		const custom = response.config?.custom
		if (data.errCode && custom.toast) uni.$u.toast(data.errMessage)
		return response
	}, (response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response)
	})
}