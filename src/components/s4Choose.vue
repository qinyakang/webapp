<style scoped>
	.yd-navbar-center-title {
		font-weight: bold;
		font-size: 0.3rem !important;
	}
	
	body {
		background: #FAFAFA;
	}
	
	.img {
		float: left;
		width: 24%
	}
	
	.content {
		float: left;
		width: 54%;
		color: rgb(92, 92, 92);
		font-size: 12px;
		font-family: 'PingFangSC';
	}
	
	.price {
		float: right;
		width: 20%;
		color: rgb(92, 92, 92);
	}
	
	.list .yd-cell-left span {
		font-size: 12px;
		color: #666666;
	}
	
	.yd-cell-item:not(:last-child):after {
		content: none
	}
	
	.yd-cell:after {
		content: none
	}
	
	.yd-grids-item {
		padding: 0.25rem;
		font-size: .25rem;
		color: #666666;
		font-family: "微软雅黑";
	}
	
	.yd-grids-2:before {
		content: none
	}
</style>

<template>
	<yd-layout style='background: #f2f2f2;'>
		<yd-navbar slot="navbar" v-bind:title="NavBar">
			<div @click="$shopBack()" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
		</yd-navbar>
		<yd-cell-group>
			<yd-cell-item>
				<span slot="left"></yd-icon>所有4S店</span>
				<p slot="right" @click="cityGo()">
					杭州
					<i class="iconfont" style="font-size: .32rem;">&#xe74a;</i>
				</p>
			</yd-cell-item>
		</yd-cell-group>
		<div style='background: #fff;margin-bottom:20px' v-for="(item,index) in $store.state.shopType">
			<div @click="shopReturn(index)" style='padding:12px;border-bottom: 1px solid #f3f3f3;'>
				<p style='font-size:.3rem;margin-bottom:.3rem;'>{{item.name}}</p>
				<p style='color:#666666'>{{item.address}}</p>
			</div>
			<div style='height:50px;padding:10px'>
				<a href='/#/baiduMap' style='display:inline-block;width:50%;text-align: center;line-height: 30px;'>
					<img src='/static/img/map.png' style='width: .2rem;'> 地图
				</a>
				<a :href="'tel:'+ item.phone " style='display:inline-block;width:40%;text-align: center;border-left:1px solid #ccc'>
					<img src='/static/img/phone.png'> 电话
				</a>
			</div>
		</div>
	</yd-layout>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				NavBar: '4S店选择',
				callPhone: 'tel:10086'
			}
		},
		methods: {
			cityGo() { //4S店城市的路由跳转
				this.$router.push({
					path: '/cityshopSelect',
				});
			},
			shopReturn(index) { //地区选择之后的路由跳转
                this.$store.commit('shopTypeChoose', index); //调用mutations修改state'
                console.log(this.$store.commit('shopTypeChoose', index));
				var query = JSON.parse(localStorage.getItem("param"));
				query.isPost = 1; //标识
				var path = '/productChooseact';
				if(query.activityId == undefined) {
					path = 'productChoosecom'
				}
				this.$router.push({
					path: path,
					query: query
				});
			},
			$shopBack() { //返回金融产品选择页
				var query = JSON.parse(localStorage.getItem("param"));
				query.isPost = 1; //标识
				var path = '/productChooseact';
				if(query.activityId == undefined) {
					path = 'productChoosecom'
				}
				this.$router.push({
					path: path,
					query: query
				});
			}
		},
		mounted() {
			console.log(this.$store.state.shopType);
		}
	}
</script>