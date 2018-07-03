<style lang="scss">

</style>

<template>
	<yd-layout id="marketingActivities">
		<div class="banner" :style="{ 'backgroundImage': 'url(' + items.marinPic + ')' , 'backgroundSize': '7.5rem 4.4rem' }">
			<div class="bannerImg" >
				<div class="backText" @click="$router.back(-1);" slot="left">
					<i class="iconfont">&#xe720;</i>返回
				</div>
			</div>
		</div>
		<div class="carList" :style="{ 'backgroundImage': 'url(' + items.bacPic + ')' , 'backgroundSize': '7.5rem 4.4rem' }">
			<div v-for="(item,index) in items.subItems" class="carDetail" @click="chooseGo(item)">
				<img :src="item.cover"/>
			</div>
		</div>
	</yd-layout>
</template>

<script>
	import axios from 'axios';
	export default {
		name: '',
		data() {
			return {
				//NavBar: '营销活动专场',
				APIS: { //活动专场的数据接口
					getActivitys: API.host + '/activityinfo/selectActivityInfo', //活动专场的数据接口
				},
				items: {//活动专场的全部数据
					marinPic: '', //上部的背景图片
					bacPic: '',  //下部分的背景图片
					subItems: [] //活动专场的车列表数据					
				} 
			}
		},
		methods: {
			getActivitys() { //活动专场的数据接口
				let that = this;
				let id = this.$route.query.id;
				axios.get(that.APIS.getActivitys, {
					params: {
						id: id
					}
				}).then((res) => {
					that.items = res.data.result;
					that.items.subItems = res.data.result.activityCarModelList;
					that.items.marinPic = res.data.result.mainPicture;
					that.items.bacPic = res.data.result.backgroundPicture;
					console.log(that.items.marinPic);
				}).catch(function(err) {
					console.log(err);
				})
			},
			chooseGo(item) { //跳转活动金融产品页的路由
				var query = {//参数
					activityId: item.activityId,
					carModelId: item.carModelId
				}
				localStorage.setItem("param",JSON.stringify(query));//存储跳转参数
				this.$router.push({
					path: '/productChooseact',
					query: query
				})
			}
		},
		mounted() {
			this.getActivitys();
		}
	}
</script>