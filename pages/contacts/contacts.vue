<template>

	<view class="contacts-box">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<NavBar title="联系人" />
		<view class="functional-box">
			<view class="list-cell" @click="toNewFriends">
				新的朋友
				<u-badge bgColor="red" :isDot="true" v-show="vuex_addfriend"></u-badge>
			</view>

			<view class="list-cell">
				群聊
				<u-badge bgColor="red" :isDot="true"></u-badge>
			</view>
		</view>
		<u-index-list :index-list="indexList" :sticky="false">
			<template v-for="(item, index) in itemArr">
				<u-index-item>
					<u-index-anchor :text="indexList[index]"></u-index-anchor>
					<view class="list-cell friendShip" v-for="(cell, index) in item" @click="toAddFriendsInfo(cell)">
						<u-avatar :src="cell.avatarUrl" shape="square" size="70rpx"></u-avatar>
						<view class="nickname">
							{{cell.nickName}}
						</view>
					</view>
				</u-index-item>
			</template>
		</u-index-list>
	</view>
</template>

<script>
	import NavBar from "@/components/NavBar.vue"
	import Pinyin from 'pinyin';
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				friendsList: [],
				indexList: [],
				itemArr: []
			};
		},
		onLoad() {
			this.getFriendsList()
		},
		computed: {

		},
		methods: {
			async getFriendsList() {
				const {
					data
				} = await this.$u.api.getFriendShip_Api({
					status: "accepted"
				})
				data.result.forEach((friend) => {
					this.$store.state.vuex_user.id === friend.userId1 ? this.friendsList.push(friend
						.beRequest_friendShipInfo) : this.friendsList.push(friend.request_friendShipInfo)

				})

				// 动态生成索引列表和二维数组
				this.generateIndexAndArray();
			},

			generateIndexAndArray() {
				// 清空现有的索引列表和二维数组
				this.indexList = [];
				this.itemArr = [];

				// 将好友列表按昵称首字母排序
				var sortedFriends = this.friendsList.sort((a, b) => {
					const aFirstLetter = this.getFirstLetter(a.nickName);
					const bFirstLetter = this.getFirstLetter(b.nickName);

					return aFirstLetter.localeCompare(bFirstLetter, 'en', {
						sensitivity: 'base'
					});
				});

				// 遍历排序后的好友列表，生成索引和二维数组
				sortedFriends.forEach((friend) => {
					const firstLetter = this.getFirstLetter(friend.nickName);

					if (!this.indexList.includes(firstLetter)) {
						this.indexList.push(firstLetter);
					}

					const index = this.indexList.indexOf(firstLetter);

					if (!this.itemArr[index]) {
						this.itemArr[index] = [];
					}

					this.itemArr[index].push(friend);
				});
			},


			getFirstLetter(nickName) {
				// 使用正则表达式检测是否包含中文字符
				const containsChinese = /[\u4e00-\u9fa5]/.test(nickName);

				if (containsChinese) {
					// 中文昵称使用 Pinyin.js 获取拼音首字母
					const pinyinArray = Pinyin(nickName, {
						style: Pinyin.STYLE_FIRST_LETTER,
					});

					return pinyinArray.length > 0 ? pinyinArray[0][0].toUpperCase() : '';
				} else {
					// 英文昵称直接取首字母
					return nickName.charAt(0).toUpperCase();
				}
			},

			toNewFriends() {
				this.$u.vuex("vuex_addfriend", false)
				uni.$u.route("pages/newFriends/newFriends")
			},
			toAddFriendsInfo(item) {

				Object.assign(item, {
					isFriendShip: true
				})
				// 跳转至用户详情界面
				setTimeout(() => {
					uni.$u.route({
						url: "pages/addFriendsInfo/addFriendsInfo",
						params: item
					})
				}, 300)
			}

		}

	}
</script>

<style lang="less" scoped>
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;

		/deep/.u-badge {
			margin: 6rpx;

		}
	}

	.u-index-list {
		.friendShip {
			display: flex;
			align-items: center;

			.nickname {
				padding-left: 20rpx;
			}
		}
	}
</style>