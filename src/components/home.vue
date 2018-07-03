<style lang="scss">
	#home{
		background: #fff;
		.yd-scrollview{
			.yd-grids-2 .yd-grids-item:not(:nth-child(2n)):before{
				content: none
			}
			.yd-grids-item:after{
				content: none
			}
			.yd-grids-2:before{
				content: none
			}
		}
		.yd-navbar:after{
	        content: ""
	    }
	}
</style>
<template>
	<yd-layout id="home">
		<yd-navbar slot="navbar" :title='NavBar'></yd-navbar>
		<yd-cell-group>
			<yd-cell-item arrow type="link" :href="menu.link" v-for="(menu,index) in menus">
				<yd-icon slot="icon" name="verifycode" size=".42rem" style='color:#4A84FF'></yd-icon>
	            <span slot="left">{{menu.text}}</span>
	            <span slot="right">查看</span>
	        </yd-cell-item>
	    </yd-cell-group>
	</yd-layout>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				NavBar: '浏览',
				value1: '',
				menus: [{
					text: '汽车详情',
					link: '/carDetail'
				}, {
					text: '4S店选择',
					link: '/S4Choose'
				}, {
					text: '所有品牌',
					link: '/indexList'
				}, {
					text: '产品选择',
					link: '/productChooseone'
				}, {
					text: '预约到店',
					link: '/orderShop'
				}, {
					text: '我的订单',
					link: '/orderForm'
				}, {
					text: '更多金融产品',
					link: '/productMore'
				}, {
					text: '上传资料',
					link: '/uploadData'
				}, {
					text: '实名认证',
					link: '/nameAuthenticationone'
				}, {
					text: '搜索',
					link: '/search'
				}, {
					text: '我的',
					link: '/my'
				}, {
					text: '实名认证',
					link: '/nameAuthenticationone'
				},{
					text: '营销活动专场',
					link: '/marketingActivities'
				},{
					text: '汽车商城',
					link: '/carShop'
				},{
					text:'我的礼券',
					link:"/myGift"
				},{
					text:'车型选择',
					link:"/carSelect"
				},{
					text:'我的预约',
					link:"/myOrder"
				}]
			}
		}
	}
</script>