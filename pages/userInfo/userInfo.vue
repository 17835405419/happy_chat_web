<template>
	<view class="userInfo-box">
		<u-cell-group>
			<u-cell title="头像" :isLink="true">
				<u-avatar slot='value' shape="square" :src="vuex_user.avatarUrl"></u-avatar>
			</u-cell>
			<u-cell title="昵称" :value="vuex_user.nickName" :isLink="true"></u-cell>
			<u-cell title="用户名" :value="vuex_user.username" :isLink="true"></u-cell>
			<u-cell title="邮箱" :value="vuex_user.email" :isLink="true"></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="less" scoped>

</style>