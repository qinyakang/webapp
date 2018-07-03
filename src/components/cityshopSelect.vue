<style lang="scss" scoped>
	#cityshopSelect {
		background: #FFF;
		.mySection {
			margin-top: .2rem;
			.mint-indexlist {
				.mint-indexlist-content {
					.nowCity {
						padding-left: .3rem;
						padding-bottom: .3rem;
						.cityText {
							p {
								font-size: .28rem;
							}
						}
						.cityWatch {
							padding-right: .4rem;
							height: .82rem;
							p {
								&:first-child {
									float: left;
									line-height: .82rem;
									font-size: .28rem;
									color: orange;
									i {
										margin-left: .22rem;
										font-size: .22rem;
									}
								}
								&:last-child {
									float: right;
									line-height: .82rem;
									font-size: .28rem;
									color: #666666;
									i {
										margin-left: .22rem;
										font-size: .22rem;
									}
								}
							}
						}
						.directCity {
							clear: both;
							p {
								font-size: .28rem;
							}
							.directList {
								margin-top: .3rem;
								display: inline-block;
								.yd-btn-hollow {
									margin-left: .5rem;
								}
							}
						}
					}
				}
			}
		}
	}
</style>

<template>
	<yd-layout id="cityshopSelect">
		<yd-navbar slot="navbar" :title="NavBar">
			<div @click="$router.back(-1);" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
		</yd-navbar>
		<div class="mySection">
			<mt-index-list>
				<div class="nowCity">
					<div class="cityText">
						<p>当前定位城市</p>
					</div>
					<div class="cityWatch">
						<p>
							<i class="iconfont" style="font-size: .32rem;">&#xe607;</i> {{cityName}}
						</p>
						<p @click="getCity()">
							<i class="iconfont" style="font-size: .32rem;">&#xe626;</i> 刷新定位
						</p>
					</div>
					<div class="directCity">
						<p>直辖市</p>
						<div class="directList" v-for="(item,index) in directCity" :key="index">
							<yd-button @click.native="cityChange(item.name,item.code)" type="hollow">{{item.name}}</yd-button>
						</div>
					</div>
				</div>
				<mt-index-section v-for='(item,index) in cityObj' :key="index" :index="item.type">
					<div @click="cityChange(subItem.label,subItem.code)" v-for='(subItem,index) in item.items' :key="index">
						<mt-cell :title="subItem.label"></mt-cell>
					</div>
				</mt-index-section>
			</mt-index-list>
		</div>
	</yd-layout>
</template>
<script src="js/city.js"></script>
<script>
	import axios from 'axios';
	export default {
		name: '',
		data() {
			return {
				NavBar: "选择城市",
				cityName: "",
				APIS: { //城市选择页的数据接口
					getCity: API.host + '/map/queryByLatAndLng', //地理定位
					getActivitycar: API.host + '/activityquery/queryAll' //金融产品选择页所有数据(活动型)
				},
				directCity: [{
						name: "北京",
						code: "110100"
					},
					{
						name: "天津",
						code: "120100"
					},
					{
						name: "上海",
						code: "310100"
					},
					{
						name: "重庆",
						code: "500100"
					}
				],
				cityObj: []
			}
		},
		methods: {
			cityChange(cityName,cityCode){//城市选择改变跳转
				var that = this;
				var query = JSON.parse(localStorage.getItem("param"));
				query.belongRegion = cityCode;
				axios.get(that.APIS.getActivitycar, {
					params:query
				}).then((res) => {
					that.$store.commit('shopTypeSet',res.data.result.activityDealerList);//调用mutations修改state
					
					that.$router.push({ path: '/s4Choose' });
					localStorage.setItem("city",cityName);
					localStorage.setItem("code",cityCode);
				}).catch(function(err) {
					console.log(err);
				})
				
			},
			getCity() { //地理定位
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
							that.cityName = res.data.result.belongRegionName
							console.log(that.cityName)
						}).catch(function(err) {
							console.log(err);
						})
						//alert('您的位置：' + r.point.lng + ',' + r.point.lat);
					} else {
						alert('failed' + this.getStatus());
					}
				});
			},
		},
		mounted() {
			var that = this;
			var arr = {};
			window.areaData.map(function(sheng) {
				sheng.children.map(function(city) {
					if(typeof arr[city.inital] == 'undefined') {
						arr[city.inital] = [];
					}
					arr[city.inital].push({
						label: city.label,
						code: city.value
					})

				});
			});
			for(var key in arr) {
				this.cityObj.push({
					type: key,
					items: arr[key]
				});
			};
			console.log(arr);
			this.cityObj.sort(function(sort,sort1){
				if(sort.type < sort1.type) {
			      return -1;
			    }else{
			      return 1;
			    }
			});
		this.getCity();
		}	
	}
</script>