<style lang="scss">
	.yd-grids-5 .yd-grids-item:not(:nth-child(5n)):before {
		content: none !important;
	}
	
	.yd-grids-5:before {
		border: none !important;
		;
	}
	
	.yd-grids-item:after {
		content: none !important;
	}
	
	.yd-grids-txt {
		text-overflow: clip !important;
	}
</style>

<template>
	<yd-layout id="carShop">
		<yd-navbar slot="navbar" :title="NavBar">
			<div @click="$router.back(-1);" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
			<router-link to="scan" slot="right">
				<i class="iconfont">&#xe64b;</i>
			</router-link>
			<router-link to="/my" slot="right">
				<i class="iconfont">&#xe602;</i>
			</router-link>
		</yd-navbar>
		<div class="carBanner">
			<div class="carSearch">
				<div class="cityName" @click="cityGo()">
					<span>{{cityName}}</span>	
					<i class="iconfont">&#xe74a;</i>
				</div>
<!--				<yd-search placeholder="这里搜索你想要的"></yd-search>-->
                <router-link to="search">
                    <div class="search">
                        <i class="iconfont">&#xe741;</i>
                        <span>这里搜索你想要的</span>
                    </div>
                </router-link>
			</div>
			<div class="carImg">
				<yd-slider autoplay="3000">
					<yd-slider-item v-for="(banner,index) in items.banners" :key="index">
						<img @click="bannerGo(banner)" :src="banner.refererPicture">
					</yd-slider-item>
				</yd-slider>
			</div>
			<div class="carActivity">
				<div class="carActivitytext">
					<yd-rollnotice autoplay="2000">
						<yd-rollnotice-item v-for="(notice,index) in items.notices" :key="index">
							<p style="font-size: .24rem;color: #666666;">{{notice.information}}</p>
						</yd-rollnotice-item>
					</yd-rollnotice>
				</div>
			</div>
			<div class="carButton">
				<yd-grids-group :rows="5">
					<yd-grids-item v-for="(brand,index) in items.brands" :key="index" @click.native="brandGo(brand)">
						<img slot="icon" :src="brand.icon">
						<span slot="text">{{brand.name}}</span>
					</yd-grids-item>
					<yd-grids-item link='indexList'>
						<i slot="icon" class="iconfont" style="color:#FF6C3E;font-size: .4rem;;">&#xe612;</i>
						<span style="color: #F54D42;" slot="text">更多</span>
					</yd-grids-item>
				</yd-grids-group>
			</div>
		</div>
		<div v-if="activityBanner.bannerItems != undefined && activityBanner.bannerItems != ''" class="carMainactivity" :style="{ 'backgroundImage': 'url(' + activityBanner.backImg + ')' , 'backgroundSize': 'cover' }">
			<div class="Banneract">
				<img :src="activityBanner.cover" alt="" srcset="">
			</div>
			<div class="Swiperact swiper-container">
				<div class="swiperContent swiper-wrapper">
					<div class="activityPic swiper-slide" v-for="(item,index) in activityBanner.bannerItems" @click="actSwiperGo(item)">
						<img :src="item.cover" alt="" srcset="">
					</div>
				</div>
			</div>
		</div>
		<div v-for="(item,index) in items.carInfos" :key="index">
			<!--
				通用类型的车型
            -->
			<div class="carInfonor" v-if="item.type == 'NORMAL' ">
				<div class="infoHead">
					<p>{{item.name}}</p>
					<p @click="moreGo(item)">更多</p>
				</div>
				<div class="infoListsig" v-if="item.layoutType == 'SIGINE' ">
					<div class="infoDetail" v-for="(subItem,index) in item.groupDetailList" :key="index">
						<img @click="commonGo(subItem)" :src="subItem.refererPicture" />
					</div>
				</div>
				<div class="infoListtwo" v-if="item.layoutType == 'TWOLINES' ">
					<div class="infoDetail" v-for="(subItem,index) in item.groupDetailList" :key="index">
						<img @click="commonGo(subItem)" :src="subItem.refererPicture" />
					</div>
				</div>
			</div>
			<!--
				活动类型的车型
            -->
			<div class="carInfoact" v-if="item.type == 'ACTIVITE' ">
				<div class="infoHead">
					<p>{{item.name}}</p>
				</div>
				<div class="infoList" v-for="(subItem,index) in item.groupDetailList" :key="index">
					<div @click="activityGo(subItem)" class="infoImg">
						<img :src="subItem.refererPicture" />
					</div>
					<div class="detailList">
						<div class="infoDetail" v-for="(thrItem,index) in subItem.activityCarModelList" :key="index">
							<img @click="activitysmGo(thrItem)" :src="thrItem.cover" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</yd-layout>
</template>

<script>
	import axios from 'axios'
	import Swiper from 'swiper';
	export default {
		name: '',
		data() {
			return {
				NavBar: "汽车商城",
				cityName: '', //城市名称
				APIS: { //首页的数据接口
					getAll: API.host + '/sysallocation/queryAll', //首页所有信息
					getCity: API.host + '/map/queryByLatAndLng', //首页地理定位
				},
				items: { //首页获取的所有数据 
					banners: [], //首页的banner图
					notices: [], //首页的公告
					brands: [], //品牌配置数据
					carInfos: [], //首页汽车信息
				},
				activityBanner: {
					backImg: '', //活动背景图
					cover: '', //活动banner图
					bannerItems: [] //swiper轮播图
				},
				//lat: '', //首页经度
				//ing: '', //首页纬度
				cityName: '', //城市名称
			}
		},
		methods: {
			getAll() { //获取首页所有信息
				let that = this;
				axios.get(that.APIS.getAll).then((res) => {
					that.items = res.data.result;
					that.items.banners = res.data.result.carouselConfigList;
					that.items.brands = res.data.result.brandsConfigList;
					that.items.notices = res.data.result.noticeList;
					that.items.carInfos = res.data.result.groupList;
					that.activityBanner.bannerItems = res.data.result.activityConfig.activityInfoList;
					that.activityBanner.cover = res.data.result.activityConfig.cover;
					that.activityBanner.backImg = res.data.result.activityConfig.backgroundPicture;
					console.log(that.activityBanner.bannerItems);
				}).catch(function(err) {
					console.log(err);
				})
			},
			cityGo() { //首页城市的路由跳转
				this.$router.push({
					path: '/citySelect',
				});
			},
			actSwiperGo(item) { //首页的swiperBanner图的路由跳转
				this.$router.push({
					path: '/marketingActivities',
					query: {
						id: item.id	
					}
				})
			},
			getCity() { //首页地理定位
				let that = this;
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r) { //调取百度接口获得经纬度
					if(this.getStatus() == BMAP_STATUS_SUCCESS) {
						var mk = new BMap.Marker(r.point);
						axios.get(that.APIS.getCity, {
							params: {
								lat: r.point.lat,
								lng: r.point.lng
							}
						}).then((res) => {
							that.cityName = localStorage.getItem("city");
							console.log(res)
							if(that.cityName != res.data.result.belongRegionName) {
								that.$dialog.confirm({
									title: '定位服务',
									mes: '你目前所在城市为杭州,是否切换',
									opts: () => {
										that.$dialog.toast({
											mes: '切换成功',
											timeout: 1000,
											callback: function() {
												that.cityName = res.data.result.belongRegionName;
												that.cityCode = res.data.result.belongRegion;
												localStorage.removeItem("city");
												localStorage.removeItem("code");
												localStorage.setItem("city", that.cityName);
												localStorage.setItem("code", that.cityCode);
											}
										});
									}
								});
							}
						}).catch(function(err) {
							console.log(err);
						})
						//alert('您的位置：' + r.point.lng + ',' + r.point.lat);
					} else {
						alert('failed' + this.getStatus());
					}
				});
			},

			bannerGo(banner) { //轮播图的路由跳转
				if(banner.refererType == 'ACTIVITE') {
					this.$router.push({
						path: '/marketingActivities',
						query: {
							id: banner.refererNo
						}
					});
				} else if(banner.refererType == 'CARMODEL') {
					this.$router.push({
						path: '/productChoosecom',
						query: {
							id: banner.refererNo
						}
					});
				}
			},
			brandGo(brand) { //品牌列表的路由跳转
				this.$router.push({
					path: '/carSelect',
					query: {
						brandId: brand.brandsId,
						icon: brand.icon,
						name: brand.name
					}
				});
			},
			moreGo(item) { //首页通用车型更多跳转
				if(item.layoutType == 'TWOLINES') { //跳转双列
					this.$router.push({
						path: '/carTwoline',
						query: {
							groupId: item.id,
							name: item.name
						}
					});
				} else if(item.layoutType == 'SIGINE') { //跳转单列
					this.$router.push({
						path: '/carSigine',
						query: {
							groupId: item.id,
							name: item.name
						}
					});
				}
			},
			activityGo(subItem) { //活动类型大图的路由跳转
				this.$router.push({
					path: '/marketingActivities',
					query: {
						id: subItem.refererNo
					}
				});
			},
			activitysmGo(thrItem) { //活动类型小图图的路由跳转
				var query = {//参数
					activityId: thrItem.activityId,
					carModelId: thrItem.carModelId
				}
				localStorage.setItem("param",JSON.stringify(query));//存储跳转参数
				this.$router.push({
					path: '/productChooseact',
					query:query
				});
			},
			commonGo(subItem) { //通用类型图的路由跳转
					var query = { //参数
					id: subItem.refererNo
				}
				localStorage.setItem("param",JSON.stringify(query));//存储跳转参数
				this.$router.push({
					path: '/productChoosecom',
					query: query
				});
			}
		},
		mounted() {
			this.getAll(); //获取首页所有信息
			this.getCity(); //首页地理定位
		},
		updated:function(){
			new Swiper('.swiper-container', {
			  spaceBetween: 10,
			  slidesPerView: 'auto'
		    });
		}
	}
</script>