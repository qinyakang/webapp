<style>
#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
</style>

<template>
	<yd-layout>
		<yd-navbar slot="navbar" v-bind:title="NavBar">
			<div @click="$router.back(-1);" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
		</yd-navbar>
		<div id="allmap"></div>
	</yd-layout>
</template>

<script>
	// 百度地图API功能
	export default {
		name: '',
		data() {
			return {

			}
		},
		mounted(){
			var map = new BMap.Map("allmap");    // 创建Map实例
			map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
			//添加地图类型控件
			map.addControl(new BMap.MapTypeControl({
				mapTypes:[
		            BMAP_NORMAL_MAP,
		            BMAP_HYBRID_MAP
		        ]}));	  
			map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
			map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
		}
	}
</script>