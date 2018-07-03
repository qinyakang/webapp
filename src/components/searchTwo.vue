<style lang="scss">
	.sortPrice {
		li {
			height: 1rem;
			text-align: center;
			line-height: 1rem;
		}
		li:hover {
			background-color: #ccc;
		}
	}
	.priceTwo{
		span:hover{
			background-color: #ccc;
		}
	}
	.yd-popup-bottom{
	}
</style>

<template>
	<yd-layout id="search">
		<yd-navbar slot="navbar">
			<div @click="$router.back(-1);" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
			<template slot="center">
				<yd-search v-model="value1" placeholder="大家都在搜索"></yd-search>
			</template>
		</yd-navbar>
		<yd-grids-group :rows="3">
			<yd-grids-item @click.native="show2 = true">
				<span slot="text">
					默认排序
					<i style="font-size: .24rem;margin-left: .16rem;" class="iconfont">&#xe749;</i>
				</span>
			</yd-grids-item>
			<yd-grids-item>
				<span slot="text">
					<router-link to="/indexList">
					品牌
					<i style="font-size: .24rem;margin-left: .16rem;" class="iconfont">&#xe749;</i>
					</router-link>
				</span>
			</yd-grids-item>
			<yd-grids-item @click.native="show3 = true">
				<span slot="text">
					价格
					<i style="font-size: .24rem;margin-left: .16rem;" class="iconfont">&#xe749;</i>
				</span>
			</yd-grids-item>
		</yd-grids-group>
		<yd-popup class="priceOne" v-model="show2" height="6rem" masker-opacity="0.00001">
			<ul class="sortPrice" v-for="(item,index) in sorts">
				<li @click="show2 = false">{{item.sortType}}</li>
			</ul>
		</yd-popup>
		<yd-popup style='' class="priceTwo" v-model="show3" height="5rem" masker-opacity="0.000001">
			<yd-grids-group :rows="3">
				<yd-grids-item v-for="(item,idnex) in price">
					<span @click="show3 = false" slot="text">{{item.carPrice}}</span>
				</yd-grids-item>
			</yd-grids-group>
		</yd-popup>
		<yd-list theme="5">
			<yd-list-item v-for="item, key in list" :key="key" type="link" href="/productChooseone">
					<img slot="img" :src="item.img">
				<yd-list-other slot="other">
					<div class="brand">
						<span class="demo-list-brand">{{item.brand}}</span>
					</div>
					<div class="price">
						<span class="demo-list-del-price">{{item.price}}</span>
					</div>
				</yd-list-other>
				<yd-list-other slot="other">
					<div class="output">
						<span class="demo-list-output">{{item.output}}</span>
					</div>
					<div class="demo-list-reference">参考价</div>
				</yd-list-other>
			</yd-list-item>
		</yd-list>
	</yd-layout>
</template>

<script>
	import $ from 'jquery'
	export default {
		name: '',
		data() {
			return {
				value1: '',
				show2: false,
				show3: false,
				list: [{
						img: "static/img/car1.png",
						brand: "宝马7系",
						price: "30-50万元",
						output: "排量1.5T 1.8T / 油耗 6.8"
					},
					{
						img: "static/img/car1.png",
						brand: "宝马7系",
						price: "30-50万元",
						output: "排量1.5T 1.8T / 油耗 6.8"
					},
					{
						img: "static/img/car1.png",
						brand: "宝马7系",
						price: "30-50万元",
						output: "排量1.5T 1.8T / 油耗 6.8"
					},
					{
						img: "static/img/car1.png",
						brand: "宝马7系",
						price: "30-50万元",
						output: "排量1.5T 1.8T / 油耗 6.8"
					}
				],
				price: [{
					carPrice:'不限车价'
				},{
					carPrice:'3万以下'
				}, {
					carPrice:'3-5万'
				}, {
					carPrice:'5-8万'
				}, {
					carPrice:'8-10万'
				}, {
					carPrice:'10-15万'
				}, {
					carPrice:'15-20万'
				}, {
					carPrice:'20-25万'
				}, {
					carPrice:'25-30万'
				}, {
					carPrice:'30-35万'
				}, {
					carPrice:'35-45万'
				}, {
					carPrice:'45万以上'
				}],
				sorts: [{
					sortType: '默认排序'
				},{
					sortType: '销量最高'
				},{
					sortType: '车价最低'
				},{
					sortType: '车价最高'
				},{
					sortType: '首付最低'
				},{
					sortType: '月供最低'
				}]
			}
		},
		watch: {
			show2: function(val) {
				if(val) {
					console.log(val);
					$('.priceOne').find('.yd-popup-bottom').css({
						top: '100px',
						bottom: '100px'
					}).show();
				} else {
					$('.yd-popup-bottom').hide();
				}
			},
//			show3: function(val) {
//				if(val) {
//					console.log(val);
//					$('.priceTwo').find('.yd-popup-bottom').css({
//						top: '100px',
//						bottom: '100px'
//					}).show();
//				} else {
//					$('.yd-popup-bottom').hide();
//				}
//			}
			show3: function(val) {
				if(val) {
					console.log(val);
					$('.priceTwo').find('.yd-popup-bottom').css('top','100px').show();
				} else {
					$('.yd-popup-bottom').hide().css('top','100px');
				}
			}
		}
	}
</script>