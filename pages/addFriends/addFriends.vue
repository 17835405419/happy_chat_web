<template>
	<view class="addFriends-box">
		<view class="search-box">
			<u-search placeholder="输入用户名" shape="square" bgColor="#ffffff" :showAction="false"
				v-model="searchKey"></u-search>
		</view>
		<view class="username">
			我的用户名:&nbsp;&nbsp;{{vuex_user.username}}
		</view>
		<view class="serach-content" v-show="searchKey" @click="getUserInfo">
			<view class="icon-box">
				<u-icon class="iconfont icon-adduser"></u-icon>

			</view>
			<view class="search_text">
				搜索：<text>{{searchKey}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKey: "",
				searchContent: {},

			};
		},
		methods: {
			async getUserInfo() {
				// 根据用户名搜索
				const {
					data
				} = await this.$u.api.getOneUserInfo_Api({
					username: this.searchKey
				})
					console.log(data);
				if (data.code == 1000) {
					this.searchContent = data.result
					// 查询好友关系列表
					const {
						data: data1
					} = await this.$u.api.getOneFriendShip_Api(data.result.id)
		
					if (data1.code == 2000 && data1.result.status === "accepted") {
						Object.assign(this.searchContent, {
							isFriendShip: true
						})
					}
					
					// 跳转至用户详情界面
					setTimeout(()=>{
						uni.$u.route({
							url:"pages/addFriendsInfo/addFriendsInfo",
							params:this.searchContent
						})
					},300)
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #e1e1e1;
	}

	.addFriends-box {
		display: flex;
		flex-direction: column;
		align-items: center;

		.search-box {
			width: 100%;

			.u-search {
				padding: 20rpx;
			}
		}

		.username {
			font-size: 13px;
			color: #595959;
		}

		.serach-content {
			margin-top: 20rpx;
			width: 100%;
			height: 140rpx;
			background-color: #ffffff;
			display: flex;
			align-items: center;

			.icon-box {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100rpx;
				height: 100rpx;
				margin: 20rpx;
				background-color: #00aa00;
				color: #ffffff;

				.iconfont {
					font-size: 20px;
				}
			}

			.search_text {
				font-size: 14px;

				text {
					color: #00aa00;
				}
			}
		}
	}
</style>