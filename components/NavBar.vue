<template>
	<!-- '自定义导航栏' -->
	<view class="navbar">
		<view class="title">
			{{title}}
		</view>
		<view class="right-box">
			<u-icon name="search" size="25"></u-icon>
			<u-icon name="plus-circle" size="20" @click="showFunc = !showFunc"></u-icon>
		</view>
	
			<view class="func-box" v-show="showFunc">
				<u-cell-group :customStyle="{'zIndex':'9999'}">
					<u-cell title="发起群聊" :border="false">
						<u-icon slot="icon" class="iconfont icon-addteam"></u-icon>
					</u-cell>
					<u-cell title="添加好友" :border="false" @click="toAddFriends">
						<u-icon slot="icon" class="iconfont icon-adduser"></u-icon>
					</u-cell>

				</u-cell-group>
			</view>

	</view>
</template>

<script>
	export default {
		name: "NavBar",
		props: {
			title: {
				type: String,
				default: "乐聊",
			}
		},
		data() {
			return {
				showFunc: false
			};
		},
		methods:{
			toAddFriends(){
				this.showFunc = false
				uni.$u.route("/pages/addFriends/addFriends")
			}
		},

	}
</script>

<style lang="less" scoped>
	.navbar {
		height: 80rpx;
		width: 100%;
		background-color: #dedede;
		line-height: 80rpx;
		text-align: center;
		font-weight: 800;
		position: relative;

		.right-box {
			position: absolute;
			right: 10rpx;
			top: 50%;
			transform: translateY(-50%);
			display: flex;

			.u-icon {
				padding: 0 15rpx;
			}
		}
	}

	.func-box {
		width: 300rpx;
		background-color: #717171;
		position: absolute;
		right: 0;
		top: 90rpx;
		border-radius: 15rpx;
		z-index: 999;

		/deep/.u-cell__title {
			margin-left: -30rpx;
		}

		/deep/.u-cell__title-text,
		.u-icon {
			color: #fff;

		}
	}
</style>