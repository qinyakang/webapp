<style lang="scss">
</style>
<template>
	<yd-layout id="orderShop">
		<yd-navbar slot="navbar" v-bind:title="NavBar">
			<div @click="$router.back(-1);" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
		</yd-navbar>
		<div class="carInfo">
			<div class="carImg">
				<img :src="$route.query.cover">
			</div>
			<div class="carText">
				<p>{{$route.query.carModelName}}</p>
			</div>
		</div>
        		<yd-cell-group>
			<yd-cell-item>
				<span slot="left">联系人</span>
				<yd-input class="nameInput" slot="right" placeholder=""></yd-input>
			</yd-cell-item>
			<div class="sexSelect">
                <el-radio-group v-model="form.sex">
                    <el-radio-button label="先生"></el-radio-button>
                    <el-radio-button label="女士"></el-radio-button>
                </el-radio-group>
			</div>
			<div class="shopTime">
				<p>到店时间</p>
				<yd-datetime style="margin-left: .4rem;float: left;width: 3.76rem;font-size: .28rem;color: #282828;" type="datetime" v-model="form.datetime5"></yd-datetime>
				<p>
					<i class="iconfont">&#xe736;</i>
				</p>
			</div>
			<div class="phoneNumber">
				<p>手机号</p>
				<input class="phoneInput" type="number" placeholder="请输入手机号"  value="tel">
			</div>
			<yd-cell-item>
				<p slot="left">验证码</p>
				<input type="text" slot="right" placeholder="请输入">

				<!-- ↓↓关键代码是这里↓↓ -->
				<yd-sendcode slot="right" init-str="获取验证码" v-model="start1" @click.native="sendCode1" type="warning"></yd-sendcode>
				<!-- ↑↑关键代码是这里↑↑ -->

			</yd-cell-item>
			<div class="shopArea">
				<router-link to="/S4Choose">
				<p>预约4S店</p>
				<p>
					<span></span>
					<span></span>
				</p>
				<p>
					<i class="iconfont">&#xe74a;</i>
				</p>
				</router-link>
			</div>
		</yd-cell-group>
		<yd-button class="previewButton" size="large" type="primary" shape="circle">确定预约</yd-button>
	</yd-layout>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      APIS: {//接口
        Login: "http://192.168.1.66:8085//simulation/doLogin?loginName=13111111111" //登陆
      },
      NavBar: "预约到店",
      form: {
        //需要进行提交的表单验证
        name: "", //姓名
        sex: "", //性别
        datetime5: "", //到店时间
        phone: "", //手机号码
        code: "", //验证码
        area4S: "" //4S店的地址
      },
      start1: false
    };
  },
  methods: {
    sendCode1() {
      this.$dialog.loading.open("发送中...");
      setTimeout(() => {
        this.start1 = true;
        this.$dialog.loading.close();

        this.$dialog.toast({
          mes: "已发送",
          icon: "success",
          timeout: 1500
        });
      }, 1000);
    },

  },
  mounted() {
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
					})
				})
  }
};
</script>