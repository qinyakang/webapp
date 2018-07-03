<style lang="scss">
	#carDetail {
		background: #FAFAFA;
		.yd-navbar-center-title {
			font-weight: bold;
			font-size: 0.3rem !important;
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
	}
	
	.yd-scrollview:after {
		content: none
	}
</style>

<template>
	<yd-layout id="carDetail">
		<yd-navbar slot="navbar" v-bind:title="NavBar">
			<div @click="$router.back(-1);" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
			<router-link to="/uploadData" slot="right">
				上传资料
			</router-link>
		</yd-navbar>
		<br/>
		<yd-cell-group>
			<yd-cell-item>
				<span slot="left"><yd-icon size=".4rem" name="shopcart"></yd-icon>{{detail.merchantName}}</span>
				<span slot="right" style='color:red'>{{detail.tache}}</span>
			</yd-cell-item>
		</yd-cell-group>

		<div style='height:1.4rem'>
			<div class='img'>
				<img style='width:1.1rem;height: 1.1rem;margin-left:10px' src="http://img1.shikee.com/try/2016/06/23/14381920926024616259.jpg_220x220.jpg">
			</div>
			<div class='content'>
				<p style='font-weight:600;margin-bottom:6px;'>
					{{detail.carModelName}}
				</p>
				<p style='color:#aaa;font-size:12px'>
					{{detail.dealerName}}
				</p>
			</div>
			<div class='price'>
				<p style='font-weight:600;margin-bottom:6px;'>{{detail.totalAmount}}</p>
				<p style='color:#aaa;font-size:12px'>
					总价
				</p>
			</div>
		</div>

		<div class='list' style='clear:both;'>
			<yd-cell-group>
				<yd-cell-item>
					<span style='font-size:.3rem;font-weight: bold;' slot="left">支付信息</span>
				</yd-cell-item>
				<yd-cell-item v-for="(item,index) in items" :key="index">
					<span slot="left">{{item.left}}</span>
					<span slot="right">{{item.right}}</span>
				</yd-cell-item>
				<yd-cell-item>
					<span style='font-size:.3rem;font-weight: bold;' slot="left">本次支付</span>
					<span style='color:red' slot="right">8989元</span>
				</yd-cell-item>
			</yd-cell-group>
		</div>

		<yd-cell-group style='margin-bottom: 0;'>
			<yd-cell-item>
				<span slot="left">订单进度</span>
				<!-- <span slot="right">
					查看更多记录
					<i class="iconfont">&#xe64c;</i>
				</span> -->
			</yd-cell-item>
		</yd-cell-group>

		<yd-timeline>
			<yd-timeline-item v-for="(item,index) in items2" :key="index">
				<p>{{item.text}}</p>
				<p style="margin-top: 10px;">{{item.time}}</p>
			</yd-timeline-item>
		</yd-timeline>
		<br/><br/>
		<div class='list' style='clear:both;'>
			<yd-cell-group>
				<yd-cell-item>
					<span slot="left">订单编号</span>
					<span slot="right">{{detail.orderNo}}</span>
				</yd-cell-item>
				<yd-cell-item>
					<span slot="left">下单时间</span>
					<span slot="right">{{detail.createTime}}</span>
				</yd-cell-item>
			</yd-cell-group>
		</div>
		<div v-if="html == 2">
			
			<yd-cell-group >
				<yd-cell-item>
					<span slot="left">支付方式</span>
				</yd-cell-item>
				<yd-cell-item style='background: #fafafa;' type="checkbox">
					<img slot="icon" src="static/img/pay.png">
					<span slot="left"> 
	 					中国工商银行储蓄卡<br/>
					</span>
					<input slot="right" type="checkbox" value="Han MeiMei" checked/>
				</yd-cell-item>
				<yd-cell-item style='background: #fafafa;margin-top:-10px;padding-left:.8rem'>
					<span slot="left"> 
	 					**** **** **** 8527
					</span>
				</yd-cell-item>
			</yd-cell-group>
			<yd-button @click.native="openWindow = true" style="margin-bottom:0px;border-radius: 0;background: #F54D42;font-family: 'PingFangSC';" size="large" type="danger">
				立即支付
			</yd-button>
		</div>
		<yd-popup v-model="openWindow" position="bottom" height="8rem" masker-opacity="0.1">
			<yd-cell-group>
				<yd-cell-item>
					<span @click="openWindow = false" slot="left">
							<i class="iconfont">&#xe6eb;</i>
						</span>
					<span slot="right" style="padding-right: 3rem;color: #282828;font-size: .36rem;">付款详情</span>
				</yd-cell-item>
				<yd-cell-item>
					<span style="font-size: .28rem;color: #999999;" slot="left">订单信息</span>
					<span style="font-size: .28rem;color: #282828;" slot="right">宝马7系 2017款 740Li xDrive 豪华型 手动款</span>
				</yd-cell-item>
				<yd-cell-item>
					<span style="font-size: .28rem;color: #999999;" slot="left">付款方式</span>
					<span style="font-size: .28rem;color: #282828;" slot="right">中国工商银行储蓄卡【8527】</span>
				</yd-cell-item>
				<yd-cell-item>
					<span style="font-size: .28rem;color: #999999;" slot="left">订单金额</span>
					<span style="font-size: .28rem;color: #282828;" slot="right">288000元</span>
				</yd-cell-item>
				<yd-cell-item>
					<span style="font-size: .28rem;color: #999999;" slot="left">需付金额</span>
					<span style="font-size: .28rem;color: #282828;" slot="right">288000元</span>
				</yd-cell-item>
			</yd-cell-group>
			<div>
				<yd-button style="position: fixed;bottom: 0;" size="large" type="danger" @click.native="keyBoard = true;openWindow = false">确定付款</yd-button>
			</div>
		</yd-popup>
		<yd-keyboard title="" v-model="keyBoard" :callback="done1" ref="keyboardDemo1"></yd-keyboard>
	</yd-layout>
</template>

<script>
	import axios from 'axios';
	export default {
		name: '',
		data() {
			return {
				APIS:{
					getOrderdetail:'http://192.168.1.66:8085/orderInfo/getExtByOrderNo'
				},
				html:1,
				NavBar: '订单详情',
				openWindow: false,
				keyBoard: false,
				detail:{},
				items: [{
					left: '首付金额',
					right: '--'
				}, {
					left: '贷款金额',
					right: '--'
				}, {
					left: '分期金额',
					right: '--'
				},{
					left: '分期期数',
					right: '--'
				}],
				items2: [{
					text: '--',
				}],

			}
		},
		watch: {
			keyBoard:function(val){
				if(val == false){
					this.openWindow = true;
				}
			}
		},
		mounted(){
			this.html = localStorage.getItem("orderstatus")
			var that = this;
			axios({
				url:that.APIS.getOrderdetail+"?orderNo="+localStorage.getItem("orderID"),
				headers:{
					'Content-Type':'application/x-www-form-urlencoded',
					"authorization":localStorage.getItem("login"),
				},
			})
			.then((res) => {
				that.detail = res.data.result
				that.items[0].right = that.detail.firstPayment ? this.thousand(that.detail.firstPayment) : '- -'
				that.items[1].right = that.detail.loanAmount ? this.thousand(that.detail.loanAmount) : '- -'
				that.items[2].right = that.detail.instalmentAmount ? this.thousand(that.detail.instalmentAmount) : '- -'
				that.items[3].right = that.detail.periods ? that.detail.periods : '- -'

				var list =[
					{label:1000,value:'征信'},
					{label:1001,value:'贷款审核'},
					{label:1002,value:'提车'},
					{label:1003,value:'还款'},
					{label:1004,value:'还款完'},
				]
				that.detail.totalAmount = this.thousand(that.detail.totalAmount)
				for(var j of list){
					if(that.detail.tache == j.label){
						that.detail.tache =  j.value
					}
				}
				that.items2[0].text = that.detail.tache
			})
		},
		methods: {
			done1(val) {
				console.log('输入的密码是：' + val);
				this.$dialog.loading.open('验证支付密码');

				/* 模拟异步验证密码 */
				setTimeout(() => {
					this.$refs.keyboardDemo1.$emit('ydui.keyboard.error', '对不起，您的支付密码不正确，请重新输入。');
					this.$dialog.loading.close();
				}, 2000);
			},
			thousand(val){
				var int = val / 10000
				return this.returnFloat(int)  + '万'
			},
			returnFloat(value){
				var value=Math.round(parseFloat(value)*100)/100;
				var xsd=value.toString().split(".");
				if(xsd.length==1){
				 	value=value.toString()+".00";
				 	return value;
				}
				if(xsd.length>1){
				 	if(xsd[1].length<2){
					 	value=value.toString()+"0";
					}
				 return value;
				}
			}
		}
	}
</script>