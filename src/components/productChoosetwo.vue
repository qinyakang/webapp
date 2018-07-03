<style lang="scss">
	#productChooseone{
		background: #FAFAFA;
		.yd-scrollview{
			.yd-grids-2 .yd-grids-item:not(:nth-child(2n)):before{
				height:60%;
				top:10px
			}
			.yd-grids-item:after{
				content: none
			}
			.yd-grids-2:before{
				content: none
			}
		}
		.yd-scrollview:after{
			content:none
		}
	}
	.mt-range-progress{
		background-color:#EA5252;
	}
	.my-pro span{
		height:14px; 
		font-size:0.24rem;
		font-family:PingFangSC-Regular;
		color:rgba(153,153,153,1);
		line-height:14px;width:11.5%;
		display: inline-block;
	}
	.el-slider__bar{ 
		background: #EA5252;
	}
	.el-slider__button{
		border:2px solid #EA5252
	}
</style>
<template>
	<yd-layout id="productChooseone">
		<yd-navbar slot="navbar" v-bind:title="NavBar">
			<div @click="$router.back(-1);" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
		</yd-navbar>
		<yd-slider autoplay="3000">
			<yd-slider-item>
				<a href="#">
					<img src="http://static.ydcss.com/uploads/ydui/1.jpg">
				</a>
			</yd-slider-item>
			<yd-slider-item>
				<a href="#">
					<img src="http://static.ydcss.com/uploads/ydui/2.jpg">
				</a>
			</yd-slider-item>
			<yd-slider-item>
				<a href="#">
					<img src="http://static.ydcss.com/uploads/ydui/3.jpg">
				</a>
			</yd-slider-item>
		</yd-slider>
		<div style='background: #fff;height:60px;'>
			<div style="float:left;padding:10px;">
				<p style="font-size:.30rem;color:#282828;font-weight: bold;font-family:'微软雅黑'">宝马7系 2017款 740Li xDrive 豪华型</p>
				<p style="font-size:.25rem;color:#999999;font-family:'微软雅黑';margin-top:6px">厂商指导价：¥28.8万</p>
			</div>
			<div style='float:right;padding:10px;text-align: center;color:#999999;font-family:PingFangSC-Regular;'>
				<span style='margin-bottom:6px'>
					<i class="iconfont">&#xe714;</i>
				</span>
				<p style='font-size:10px'>参数设置</p>
			</div>
		</div>
		<br/>
		<div style='clear:both;padding:10px;background:#fff;border-bottom: 1px solid #f2f2f2;'>
			<p style='width:28px;
				height:20px; 
				font-size:14px;
				font-family:PingFangSC-Regular;
				color:rgba(102,102,102,1);
				line-height:20px;'>首付</p>
			<el-slider v-model="progress1" show-stops :step="10" :max="70"></el-slider>
			<div style='width:100%;' class='my-pro'>
				<span style=''>
					0%
				</span>
				<span style=''>
					10%
				</span>
				<span style=''>
					20%
				</span>
				<span style='text-align: center;'>
					30%
				</span>
				<span style='text-align: right;'>
					40%
				</span>
				<span style='text-align: right;width:13%'>
					50%
				</span>
				<span style='text-align: right;width:13%'>
					60%
				</span>
				<span style='text-align: right;width:4%;margin-left:.3rem'>
					70%
				</span>
			</div>
			<br /><br />
			<p style='width:28px;
				height:20px; 
				font-size:14px;
				font-family:PingFangSC-Regular;
				color:rgba(102,102,102,1);
				line-height:20px;'>期限</p>
			<el-slider v-model="progress2" show-stops :step="10" :max="50"></el-slider>
			<div style='width:100%;' class='my-pro'>
				<span style='width:15%'>
					12期
				</span>
				<span style='width:15%'>
					18期
				</span>
				<span style='width:15%;text-align: center;'>
					24期
				</span>
				<span style='width:15%;text-align: right;'>
					36期
				</span>
				<span style='text-align:right;width:18%'>
					48期
				</span>
				<span style='text-align: right;width:16%'>
					60期				
				</span>
			</div>
		</div>
		<br/>
		<div style='padding:20px;background:#fff;height:120px;'>
			
		</div>
		<br />
		<div style='background: #fff;margin-bottom:20px'>
			<router-link to="/S4Choose">
				<div style='padding:12px;border-bottom: 1px solid #f3f3f3;'>
					<p style='font-size:.3rem;margin-bottom:.3rem;'>
						<span style="width:80%;display:inline-block">预约4S店</span> 
						<span style='color:#999999;font-size:12px'>更多4S店</span>
					</p>
					<p style='color:#000;margin-bottom:.3rem;'>{{$store.state.items[$store.state.id2].title}}</p>	
					<p style='color:#999999'>{{$store.state.items[$store.state.id2].content}}</p>
				</div>
		    </router-link>
		</div>
		<router-link to="/orderShop">
			<yd-button style="border-radius: 0;background: #F54D42;font-family: 'PingFangSC';" size="large" type="danger">
				立即预约
			</yd-button>
		</router-link>
	</yd-layout>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				NavBar: '金融产品选择',
				progress1: 40,
				progress1Item: [{
					progress: '0%'
				}, {
					progress: '10%'
				}, {
					progress: '20%'
				}, {
					progress: '30%'
				}, {
					progress: '40%'
				}, {
					progress: '50%'
				}, {
					progress: '60%'
				}, {
					progress: '70%'
				}],
				progress2: 30,
				progress2Item: [{
					progress: '12期'
				}, {
					progress: '18期'
				}, {
					progress: '24期'
				}, {
					progress: '36期'
				}, {
					progress: '48期'
				}, {
					progress: '60期'
				}],
				productMoney: [{
					
				}]
			}
		},
		methods: {
			
		},
		mounted() {
			console.log(this.$store.state.id);
		}
	}
</script>