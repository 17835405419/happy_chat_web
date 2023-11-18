module.exports = (vm) => {
	const http = uni.$u.http
	/*
	用户相关的api接口
	*/
	// 登录
	const userLogin_Api = params => {

		return http.post('/login', params)
	}
 
  // 获取登录用户信息
  const getUserInfo_Api = ()=>{
	  return http.get("/getLoginUserInfo",{
		  custom: {auth: true},
	  })
	  
  }
	// 获取当个用户信息
	const getOneUserInfo_Api = params=>{
		return  http.get(`/getUserInfo`,{
			params,
			custom: {auth: true},
		})
	}
	
	
	/* 
		好友相关接口
	 */
	// 获取好友关系 toast禁止错误弹框
	const getOneFriendShip_Api = userId =>{
		return http.get(`/friendShip/${userId}`,{	
			custom: {auth: true,toast:false},
		})
	}

	// 发送好友申请
	const sendFriendShipRequest_Api = params=>{
		return http.post(`/friendShip`,params,{
			custom: {auth: true,toast:false},
		})
	}
	// 获取好友列表
	const getFriendShip_Api = params=>{
		return http.get(`/friendShip`,{
			params,
			custom: {auth: true,toast:false},
		})
	}
	// 修改好友关系状态
	const changeFriendShip_Api = (userId,params) =>{
		return http.put(`/friendShip/${userId}`,params,{
			custom: {auth: true},
		})
	}
	return uni.$u.api = {
		userLogin_Api,
		getUserInfo_Api,
		getOneUserInfo_Api,
		getOneFriendShip_Api,
		sendFriendShipRequest_Api,
		getFriendShip_Api,
		changeFriendShip_Api
	};
}


