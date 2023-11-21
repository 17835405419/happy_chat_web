<script>
	export default {
		onLaunch: function() {

			console.log('App Launch')
		},
		onShow: function() {
			// 监听添加好友事件
			this.$socket.on("addFriend", (res) => {
				if(res.addfriend){
					console.log(res.addfriend);
					this.$u.vuex("vuex_addfriend",res.addfriend)
				}
			})
			
			
		
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	
    @import url('//at.alicdn.com/t/c/font_4322493_8ibmotecnb2.css'); //引入在线图标
	// app占位符样式
	.status_bar {
	    height: var(--status-bar-height);
	    width: 100%;
	}
</style>

