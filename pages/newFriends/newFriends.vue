<template>
	<view class="newFriend-box">
		<view class="search-box">
			<u-search placeholder="输入用户名" :disabled="true" @click="toAddFriends" shape="square" bgColor="#ffffff"
				:showAction="false"></u-search>
		</view>
		<view class="my_request-box">
			<view class="title">
				我的申请
			</view>
			<view class="content" v-for="item in myRequest" :key="item.id"
				@click="toAddFriendsInfo(item,item.status)">
				<u-avatar :src="item.avatarUrl" shape="square" size="80rpx"></u-avatar>
				<view class="nickname">
					{{item.nickName}}
				</view>
				<view class="result">
					{{showTag(item)}}
				</view>
			</view>
			<view class="not_noble" v-show="myRequest.length === 0">
				暂无
			</view>
		</view>
		<view class="request_my-box">
			<view class="title">
				我的消息
			</view>
			<view class="content" v-for="item in myInfo" :key="item.id">
				<u-avatar :src="item.avatarUrl" shape="square" size="80rpx"></u-avatar>
				<view class="nickname" @click="toAddFriendsInfo(item,item.status)">
					{{item.nickName}}
				</view>
				<view class="result">
					<u-button text="处理" @click="showAction = true" v-if="item.status == 'pending' && !selectInfo"></u-button>
					<text v-else-if="!selectInfo">{{showTag(item)}}</text> 
					<text v-else>{{selectInfo}}</text>
				</view>
				<u-action-sheet :actions="list" title="是否同意该用户好友申请" :show="showAction"
					@select="select=>selectClick(select,item)" :closeOnClickOverlay="true"
					@close="showAction = false"></u-action-sheet>
			</view>
			<view class="not_noble" v-show="myInfo.length === 0">
				暂无
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 我的请求
				myRequest: [],
				myInfo: [],
				showAction: false,
				list: [{
						name: '同意'
					},
					{
						name: '拒绝'
					}
				],
				selectInfo:""  //处理后的显示
			};
		},
		onLoad() {
			this.getFriendShip()
		},
		computed: {
			showTag() {
				return (item) => {
					switch (item.status) {
						case "pending":
							return "已申请"
						case "accepted":
							return "已同意"
						case "rejected":
							return "已拒绝"
					}
				}
			}
		},
		methods: {
			async getFriendShip() {
				const {
					data
				} = await this.$u.api.getFriendShip_Api()
				console.log(data);
				if (data.code === 2000) {
					data.result.forEach(item=>{
					
						if(item.userId1 == this.$store.state.vuex_user.id){
							this.myRequest.push(Object.assign(item.beRequest_friendShipInfo,{status:item.status}))
						}else{
							 this.myInfo.push(Object.assign(item.request_friendShipInfo,{status:item.status}))
						}
					})
				}
				
			},
			toAddFriends() {
				uni.$u.route("/pages/addFriends/addFriends")
			},
			async selectClick({
				name
			}, item) {
				let status = ""
				if (name == "同意") {
					status = "accepted"
					// 前端无感操作
					this.selectInfo = "已同意"
				} else {
					status = "rejected"
					this.selectInfo = "已拒绝"
				}
				const {data} = await this.$u.api.changeFriendShip_Api(item.id, {
					status: status
				})
				if(data.code === 2000){
					uni.$u.toast("已处理该信息")
				} 
			},
			toAddFriendsInfo(item, status) {

				if (status === "accepted") Object.assign(item, {
					isFriendShip: true
				})
				// 跳转至用户详情界面
				setTimeout(() => {
					uni.$u.route({
						url: "pages/addFriendsInfo/addFriendsInfo",
						params: item
					})
				}, 300)
			},

		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #e1e1e1;
	}

	.search-box {
		width: 100%;

		.u-search {
			padding: 20rpx;
		}
	}

	.title {
		height: 60rpx;
		margin: 10rpx 0;
		font-size: 12px;
		font-weight: 800;
		line-height: 60rpx;
		padding-left: 20rpx;
		color: #7a7a7a;
	}

	.content {
		display: flex;
		padding: 20rpx;
		background-color: #ffffff;
		margin-top: 10rpx;
		.nickname {
			font-size: 13px;
			font-weight: 700;
			padding-left: 20rpx;
		}

		.result {
			font-size: 13px;
			color: #bfbfbf;
			position: absolute;
			right: 20rpx;
		}
	}

	.not_noble {
		width: 100%;
		text-align: center;
		padding-top: 30rpx;
		font-size: 13px;

	}
</style>