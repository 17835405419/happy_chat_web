<template>
	<view class="my-box">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="top_user-box" @click="toUserInfo">
			<u-avatar :src="vuex_user.avatarUrl" shape="square" size="120rpx"></u-avatar>
			<view class="info-box">
				<view class="nickname">
					{{vuex_user.nickName}}
				</view>
				<view class="username">
					用户名:&nbsp;&nbsp;{{vuex_user.username}}
				</view>
			</view>
		</view>
		<view class="func-box">
			<u-cell-group :customStyle="{'background':'#ffffff'}" :border="false">
				<u-cell title="收藏" :border="false">
					<u-icon slot="icon" class="iconfont icon-star"></u-icon>
				</u-cell>
				<u-cell title="朋友圈" :border="false">
					<u-icon slot="icon" class="iconfont icon-image"></u-icon>
				</u-cell>
				<u-cell title="表情" :border="false">
					<u-icon slot="icon" class="iconfont icon-smile"></u-icon>
				</u-cell>

			</u-cell-group>
			<u-cell title="设置" :border="false" class="setting">
				<u-icon slot="icon" class="iconfont icon-setting"></u-icon>
			</u-cell>


		</view>
	</view>
</template>

<script>
	
	export default {
		onLoad() {
			console.log(this.$store.state.vuex_user.avatarUrl);
		},
		data() {
			return {
				src: 'https://img2.baidu.com/it/u=59726952,2203943565&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800'
			};
		},
		methods:{
			toUserInfo(){
				uni.$u.route("/pages/userInfo/userInfo")
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #e1e1e1;
	}

	.top_user-box {
		display: flex;
		padding:100rpx 50rpx 0 50rpx;
		height: 180rpx;
		background-color: #ffffff;

		.info-box {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 30rpx;
			padding-bottom: 10rpx;
			height: 120rpx;
			.nickname {
				font-size: 17px;
				font-weight: 700;
			}

			.username {
				font-size: 13px;
				color: #a5a5a5;
			}
		}
	}

	.func-box {
		margin-top: 20rpx;

		.iconfont {
			padding-right: 20rpx;
		}

		.setting {
			margin-top: 20rpx;
			background-color: #ffffff;
		}
	}
</style>