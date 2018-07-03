import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home'
import CarDetail from '@/components/carDetail'
import CarSelect from '@/components/CarSelect'
import indexList from '@/components/indexList'
import S4Choose from '@/components/s4Choose'
import productChooseact from '@/components/productChooseact'
import productChoosecom from '@/components/productChoosecom'
import productChoosetwo from '@/components/productChoosetwo'
import orderShop from '@/components/orderShop'
import configurationParameter from '@/components/configurationParameter'
import vehicleSelection from '@/components/vehicleSelection'
import my from '@/components/my'
import productMore from '@/components/productMore'
import orderForm from '@/components/orderForm'
import specialConcession from '@/components/specialConcession'
import myGift from '@/components/myGift'
import uploadData from '@/components/uploadData'
import nameAuthenticationone from '@/components/nameAuthenticationone'
import nameAuthenticationtwo from '@/components/nameAuthenticationtwo'
import marketingActivities from '@/components/marketingActivities'
import video from '@/components/video'
import search from '@/components/search'
import searchTwo from '@/components/searchTwo'
import carShop from '@/components/carShop'
import baiduMap from '@/components/baiduMap'
import citySelect from '@/components/citySelect'
import cityshopSelect from '@/components/cityshopSelect'
import scan from '@/components/scan'
import carSigine from '@/components/carSigine'
import carTwoline from '@/components/carTwoline'
import myOrder from '@/components/myOrder'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/', //首页
		name: 'carShop',
		component: carShop
	}, {
		path: '/carDetail', //订单详情
		name: 'carDetail/:id',
		component: CarDetail
	}, {
		path: '/S4Choose', //4S店选择
		name: 'S4Choose',
		component: S4Choose
	}, {
		path: '/indexList',//所有品牌
		name: 'indexList',
		component: indexList
	}, {
		path: '/productChooseact',//活动车型产品选择
		name: 'productChooseact',
		component: productChooseact
	}, {
		path: '/productChoosecom',//通用车型产品选择
		name: 'productChoosecom',
		component: productChoosecom
	}, {
		path: '/productChoosetwo',//产品选择2
		name: 'productChoosetwo',
		component: productChoosetwo
	}, {
		path: '/orderShop',//预约到店
		name: 'orderShop',
		component: orderShop
	}, {
		path: '/orderForm', //我的订单
		name: 'orderForm',
		component: orderForm
	}, {
		path: '/configurationParameter', //参数配置
		name: 'configurationParameter',
		component: configurationParameter
	}, {
		path: '/vehicleSelection', //车型选择
		name: 'vehicleSelection',
		component: vehicleSelection
	}, {
		path: '/productMore', //更多产品
		name: 'productMore',
		component: productMore
	}, {
		path: '/my', //我的
		name: 'my',
		component: my
	}, {
		path: '/specialConcession', //优惠专场
		name: 'specialConcession',
		component: specialConcession 
	}, {
		path: '/myGift', //我的礼券
		name: 'myGift',
		component: myGift
	}, {
		path: '/uploadData', //上传资料
		name: 'uploadData',
		component: uploadData
	}, {
		path: '/nameAuthenticationone', //实名认证1
		name: 'nameAuthenticationone',
		component: nameAuthenticationone
	}, {
		path: '/nameAuthenticationtwo', //实名认证2
		name: 'nameAuthenticationtwo',
		component: nameAuthenticationtwo
	}, {
		path: '/search', //搜索
		name: 'search',
		component: search
	}, {
		path: '/searchTwo', //搜索页面
		name: 'searchTwo',
		component: searchTwo
	}, {
		path: '/marketingActivities', //营销活动
		name: 'marketingActivities',
		component: marketingActivities
	}, {
		path: '/video', //视频
		name: 'video',
		component: video
	}, {
		path: '/carShop', //汽车商城
		name: 'carShop',
		component: carShop
	}, {
		path: '/baiduMap', //地图
		name: 'baiduMap',
		component: baiduMap
	}, {
		path: '/citySelect', //城市选择
		name: 'citySelect',
		component: citySelect
	}, {
		path: '/cityshopSelect', //城市4S店选择
		name: 'cityshopSelect',
		component: cityshopSelect
	}, {
		path: '/scan', //扫描功能
		name: 'scan',
		component: scan
	}, {
		path: '/CarSelect', //车型选择
		name: 'CarSelect',
		component: CarSelect
	}, {
		path: '/carSigine', //单列车型
		name: 'carSigine',
		component: carSigine
	}, {
		path: '/carTwoline', //双列车型
		name: 'carTwoline',
		component: carTwoline
	}, {
		path: '/myOrder', //我的预约
		name: 'myOrder',
		component: myOrder
	}]
})