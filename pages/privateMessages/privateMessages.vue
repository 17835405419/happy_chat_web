<template>
	<view class="privateMessage-box">

		<u-list class="message-box" :scrollIntoView="lastMessage">
			<u-list-item v-for="(item, index) in messageList" :key="index" :id="'id'+ String(index)">
				<view class="message-content" v-if="item.senderId !== vuex_user.id">
					<u-avatar shape="square" size="45" :src="userInfo.avatarUrl"></u-avatar>
					<view class="content" v-html="item.content"></view>
				</view>
				<view class="message-content my_message-content" v-else>
					<view class="content" v-html="item.content"></view>
					<u-avatar shape="square" size="45" :src="vuex_user.avatarUrl"></u-avatar>
				</view>
			</u-list-item>
		</u-list>

		<view class="bottom-func">
			<u-icon class="iconfont icon-yuyin"></u-icon>
			<u-search ref="searchInput" class="serach" v-model="message" @search="sendMessage" :clearabled="false"
				shape="square" :showAction="false" placeholder="" searchIcon="" bgColor="#fff" :focus="true"></u-search>
			<u-icon class="iconfont icon-smile expression"></u-icon>
			<u-icon class="iconfont icon-plus-circle"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				messageList: [],
				message: "",
				lastMessage: ""
			};
		},
		onLoad(e) {
			this.userInfo = e

			this.getDatas() //获取聊天消息
			// 监听私聊消息
			this.$socket.on("privateMessages", (data) => {
				this.messageList.push({
					senderId: data.senderId,
					content: data.content
				})

			})
			// 监听聊天错误信息
			this.$socket.on("messagesError", (res) => {
				if (res.errCode === 20001) {
					this.$u.toast("请您先登录")
				}
			})
		},
		onReady() {
			// 动态设置导航条
			uni.setNavigationBarTitle({
				title: this.userInfo.nickName
			});
		},
		watch: {
			"messageList.length": {
				handler(news, olds) {
					if (olds !== 0 && news !== olds  ) {
						// 等Dom更新完成
						this.$nextTick(()=>{
							// 跳转到最后一条消息
							this.lastMessage = "id" + String(news - 1)
						}) 
					}
				},

				deep: true
			}
		},
		methods: {
			async getDatas() {
				const {
					data
				} = await this.$u.api.getChatUserMessage_Api({
					id: this.userInfo.id
				})
				if (data.code === 3000) {
					// 由于后端数据是按时间降序返回 为了显示正确显示需要反转一下数组
					this.messageList = data.result.reverse()
				}

			},

			sendMessage() {
				// 发送事件
				this.$socket.emit("privateMessages", {
					receiverId: this.userInfo.id,
					content: this.message
				})
				this.messageList.push({
					senderId: this.$store.state.vuex_user.id,
					content: this.message
				})
				// 清除输入框
				this.message = ""
				// 等Dom元素加载完
				this.$nextTick(() => {
					// 因为u-search没有提供重新获取焦点的方法 只能通过 使用原生方法重新获取焦点
					this.$refs.searchInput.$el.querySelector('input').focus();

				});


			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #e1e1e1;
	}

	.message-box {
		box-sizing: border-box;
		padding: 20rpx 0;
		height: calc(100vh - 190rpx) !important;

		.message-content {
			display: flex;
			align-items: flex-start;
			padding: 20rpx 20rpx 0 20rpx;

			.content {
				background-color: #fff;
				padding: 15rpx;
				margin-left: 20rpx;
				font-size: 15px;
				max-width: 60vw;
				min-height: 3.5vh;
				word-wrap: break-word;
				border-radius: 15rpx;
				// letter-spacing: 3rpx; //字符间距
			}
		}

		.my_message-content {
			justify-content: flex-end;

			.content {
				background-color: #72e500;
				margin-right: 20rpx;
			}
		}
	}

	.bottom-func {
		height: 100rpx;
		display: flex;
		padding: 0 10rpx;
		align-items: center;
		position: sticky;
		bottom: 0;
		background-color: #f0f0f0;
		border-top: 1px solid #dadada;

		/deep/.u-search__content {
			padding: 0;
			margin: 0 20rpx;
			background-color: #fff;
		}

		.expression {
			padding-right: 10rpx;
		}

		.iconfont {
			font-size: 28px;
			color: #535353;

		}
	}
</style>