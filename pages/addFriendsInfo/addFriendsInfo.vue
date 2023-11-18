<template>
	<view class="addFriendsInfo-box">
		<view class="userInfo-box">
			<u-avatar shape="square" :src="userInfo.avatarUrl" size="50"></u-avatar>
			<view class="userInfo">
				<view class="nickname">
					{{userInfo.nickName}}
				</view>
				<view class="username">
					用户名:&nbsp;&nbsp;{{userInfo.username}}
				</view>
			</view>
		</view>
		<u-cell-group :customStyle="{'background':'#ffffff'}" :border='true'>
			<u-cell title="设置备注" :isLink="true"></u-cell>
		</u-cell-group>
		<u-cell-group :customStyle="{'background':'#ffffff'}" :border='false' class="group_two">
			<u-cell title="个性签名" value=""></u-cell>
			<u-cell title="朋友圈"></u-cell>
		</u-cell-group>
		<u-cell-group :customStyle="{'background':'#ffffff'}" :border='false' class="group_three">
			<u-button text="添加好友" class="sendButton" v-if="!userInfo.isFriendShip" @click="sendFriendsRequest"></u-button>
			<view class="button-box " v-else>
				<u-button text="发送消息"  icon="chat" ></u-button>
				<u-button text="视频聊天" icon="phone" ></u-button>
			</view>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			};
		},
		onLoad(e) {
			this.userInfo = e
		},
		methods:{
			// 发送好友申请
			async sendFriendsRequest(){
				const {data} = await this.$u.api.sendFriendShipRequest_Api({userId2:this.userInfo.id})
				if(data.code === 2000)this.$u.toast("发送申请成功")

				if(data.errCode === 20001)this.$u.toast(data.errMessage)
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #e1e1e1;
	}

	.userInfo-box {
		display: flex;
		align-items: center;
		height: 260rpx;
		background-color: #ffffff;
		padding-left: 40rpx;

		.userInfo {
			padding-left: 40rpx;
			font-size: 13px;

			.nickname {
				font-weight: 800;
				padding-bottom: 20rpx;
			}

			.username {
				font-size: 12px;
				color: #a5a5a5;
			}
		}
	}

	.group_two {
		margin-top: 30rpx;
	}
	.group_three{
		margin-top: 18rpx;
		.sendButton{
			color: #7474af !important;
		}
		.button-box{
			/deep/.u-icon{
				padding-right: 10rpx;
			}
		}
	}
</style>