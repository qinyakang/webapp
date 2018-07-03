<style lang="scss">
.yd-cell:after{
	border: none;
}
</style>

<template>
	<yd-layout id="orderForm">
		<yd-navbar slot="navbar" v-bind:title="NavBar">
			<div @click="$router.back(-1);" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
		</yd-navbar>
		<yd-cell-group v-for="(item,index) in list" @click.native="orderdetail(item.orderNo)">
			<yd-cell-item>
				<span slot="left">下单时间：{{item.createTime}}</span>
				<span slot="right" class="upLoading">{{item.tache}}</span>
			</yd-cell-item>
			<div class="carContent">
				<div class='carImg'>
					<img :src="item.carPicture">
				</div>
				<div class='mainContent'>
					<p>{{item.carModelName}}</p>
					<p>{{item.dealerName}}</p>
				</div>
				<div class='carPrice'>
					<p>{{item.totalAmount}}</p>
					<p>总价</p>
				</div>
			</div>
			<div class="plan" v-if="item.firstPayment">
				<div class='planRight'>
					<p>分期方案：</p>
					<p>首付<span>{{item.firstPayment}}</span></p>
					<p>+ 月供<span>{{item.monthlyPayment}}</span></p>
					<p>×<span>{{item.periods}}</span>期</p>
				</div>
			</div>
			<div class="buttonHandle">
				<router-link v-if="item.uploadData" to="/uploadData">
					<yd-button shape="circle" type="danger">上传资料</yd-button>
				</router-link>
				<yd-button shape="circle" type="danger" @click.native="gopayment(item.orderNo)">立即支付</yd-button>
				<!-- <router-link v-for="(subButtom,index) in item.buttom" :to="subButtom.link">
					<yd-button v-if="subButtom.show == true" @click.native='openConfrim' shape="circle" :type="subButtom.type">{{subButtom.tex}}</yd-button>
					<yd-button v-else-if="subButtom.show2 == true" @click.native="payId = item.id;openWindow = true;return false;" shape="circle" :type="subButtom.type">{{subButtom.tex}}</yd-button>
					<yd-button v-else shape="circle" :type="subButtom.type">{{subButtom.tex}}</yd-button>
				</router-link> -->
			</div>
		</yd-cell-group>

		<yd-popup v-model="openWindow" position="bottom" height="8rem" masker-opacity="0.1">
			<yd-cell-group v-for="(item,index) in items" v-if="item.id == payId">
				<yd-cell-item>
					<span @click="openWindow = false" slot="left">
							<i class="iconfont">&#xe6eb;</i>
						</span>
					<span slot="right" style="padding-right: 3rem;color: #282828;font-size: .36rem;">付款详情</span>
				</yd-cell-item>
				<yd-cell-item>
					<span style="font-size: .28rem;color: #999999;" slot="left">订单信息</span>
					<span style="font-size: .28rem;color: #282828;" slot="right">{{item.carType}}</span>
				</yd-cell-item>
				<yd-cell-item>
					<span style="font-size: .28rem;color: #999999;" slot="left">付款方式</span>
					<span style="font-size: .28rem;color: #282828;" slot="right">中国工商银行储蓄卡【8527】</span>
				</yd-cell-item>
				<yd-cell-item>
					<span style="font-size: .28rem;color: #999999;" slot="left">订单金额</span>
					<span style="font-size: .28rem;color: #282828;" slot="right">{{item.orderPrice}}元</span>
				</yd-cell-item>
				<yd-cell-item>
					<span style="font-size: .28rem;color: #999999;" slot="left">需付金额</span>
					<span style="font-size: .28rem;color: #282828;" slot="right">{{item.orderPrice}}元</span>
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
				APIS: { //接口
					getOrder: 'http://192.168.1.66:8085/orderInfo/queryDataList', //我的订单列表
					Login: 'http://192.168.1.66:8085//simulation/doLogin?loginName=13111111111', //登陆
				},
				NavBar: '我的订单',
				openWindow: false,
				keyBoard: false,
				payId: '',

				list:[],
				headers:'',
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
			let that = this;
				axios.get(that.APIS.Login).then((res) => {
					localStorage.setItem("login",res.data.result)
					axios({
						url:that.APIS.getOrder,
						headers:{
							'Content-Type':'application/x-www-form-urlencoded'
							,"authorization":localStorage.getItem("login")
						}
					})
					.then((res) => {
						that.list = res.data.result
						var list =[
							{label:1000,value:'征信'},
							{label:1001,value:'贷款审核'},
							{label:1002,value:'提车'},
							{label:1003,value:'还款'},
							{label:1004,value:'还款完'},
							]
						for(var i of that.list){
							i.totalAmount = this.thousand(i.totalAmount)
							for(var j of list){
								if(i.tache == j.label){
									i.tache =  j.value
								}
							}
						}
					})
				})
		},
		methods: {
			getDate(str,no){
		        var re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/ 
		    　　if (!re.test(str)) { 
		    　　　　return ''
		    　　}
		        var oDate = new Date(str)  
		        var oYear = oDate.getFullYear()  
		        var oMonth = oDate.getMonth()+1  
		        var oDay = oDate.getDate()
		        var oHour = oDate.getHours()   
		        var oMin = oDate.getMinutes()
		        var oSen = oDate.getSeconds()
		        if(no){//判断是否传第二个参数  有则返回年月日 反之返回年月日+时分秒
		             return oYear +'-'+ this.getzf(oMonth) +'-'+ this.getzf(oDay)
		        }else{
		             return oYear +'.'+ this.getzf(oMonth) +'.'+ this.getzf(oDay) +'  ' + this.getzf(oHour) +':'+ this.getzf(oMin)//最后拼接时间      
		        }
		    },
		    getzf(num){
				if(num==true&&parseInt(num) < 10){  
				    num = '0'+num;  
				}  
				return num;  
			},
			openConfrim() {
				this.$dialog.confirm({
					title: '订单取消',
					mes: '确定取消订单？',
					opts: () => {
						this.$dialog.toast({
							mes: '取消成功',
							timeout: 1000
						});
					}
				});
			},
			done1(val) {
				console.log('输入的密码是：' + val);
				this.$dialog.loading.open('验证支付密码');

				/* 模拟异步验证密码 */
				setTimeout(() => {
					this.$refs.keyboardDemo1.$emit('ydui.keyboard.error', '对不起，您的支付密码不正确，请重新输入。');
					this.$dialog.loading.close();
				}, 2000);
			},
			orderdetail(id){
				localStorage.setItem("orderID",id)
				localStorage.setItem("orderstatus",1)
				this.$router.push({path:'/carDetail'})
			},
			gopayment(id) {
				localStorage.setItem("orderID",id)
				localStorage.setItem("orderstatus",2)
				this.$router.push({path:'/carDetail'})
				
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