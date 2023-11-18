<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录乐聊</view>
			<input class="u-border-bottom" v-model="username" placeholder="请输入用户名" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<button @tap="login" :style="inputStyle" class="getCaptcha" :disabled="isDissable">登录</button>
			<view class="alternative">
				<view class="password" @click="$u.route('pages/login/register')">注册</view>
				<view class="issue">遇到问题</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				username: '2569529311',
				password: '1231231233',
				isDissable: true
			}
		},

		computed: {
			inputStyle() {
				let style = {};
				if (this.username !== "" && this.password !== "" &&
					this.$u.test.enOrNum(this.username) &&
					this.$u.test.enOrNum(this.username)) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
					this.isDissable = false
				}
				return style;
			}
		},
		methods: {
			async login() {
				const {data} = await this.$u.api.userLogin_Api({
					username:this.username,
					password:this.password
				})
				if(data.code == 1000){
					uni.$u.toast("登陆成功")
					this.$u.vuex("vuex_token",data.token) //存储token
					// 获取登录用户信息
					 const {data:data1} = await this.$u.api.getUserInfo_Api()
					 this.$u.vuex("vuex_user",data1.result) 
					 // // 发送登录成功事件 获取socketId
					 // this.$socket.emit("login",{username:this.username})
					// 跳转至主页
					setTimeout(()=>{ 
						uni.$u.route({
							type:"switchTab",
							url:"/pages/index/index"
						})
					},200)
				}
				
			}
		}

	};
</script>

<style lang="less" scoped>
	
	.u-border-bottom {
		margin-bottom: 30rpx !important;
	}

	.wrap {
		font-size: 28rpx;
		.content {
			width: 600rpx;
			margin: 0 auto;
			padding: 80rpx 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				font-size: 14px;
				text-align: left;
				padding-bottom: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				border: none;
				font-size: 28rpx;
				padding: 8rpx 0;
				margin-top: 40rpx;
				&::after {
					border: none;
				}
			}

			.alternative {
				color: #a8a8a8;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}
	}
</style>