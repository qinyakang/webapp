<style lang="scss">
	#productMore {
		background: #FAFAFA;
		.yd-scrollview:after {
			content: none
		}
		.yd-navbar:after {
			content: none
		}
		.yd-scrollview {
			margin-top: 10px
		}
	}
</style>

<template>
	<yd-layout id='productMore'>
		<yd-navbar slot="navbar" v-bind:title="NavBar">
			<div @click="$router.back(-1);" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
		</yd-navbar>
		<div @click="handClick(index)" style='padding:20px;background:#fff;height:120px;margin-bottom:20px;' v-for="(item,index) in $store.state.productItem">
			<div style='float:left'>
				<p style='margin-bottom:18px;color:#666666;font-size:14px'>
					<span style='font-size:8px;color:#fff;background: #FFCD00;padding:4px'>{{item.title}}</span> &nbsp;&nbsp;
					<span>金融方案名称</span>
				</p>
				<p style='margin-bottom:18px;'>
					<span style='padding:4px;border:1px solid #4586FF;color:#4586FF;font-size:12px'>{{item.text1}}</span> &nbsp;&nbsp;&nbsp;
					<span style='padding:4px;border:1px solid #FF9300;color:#FF9300;font-size:12px'>{{item.text2}}</span>
				</p>
				<p style='color:#999999'>下单即享利息7.5折</p>
			</div>
			<div style='float:right;text-align: right;'>
				<p style='color:#F64F43;font-size:18px;margin-bottom:16px;'>{{item.price1}}</p>
				<p style='color:#999999;margin-bottom:18px;'>每期还款（元/月）</p>
				<p style='color:#999999'>
					<span>分期成本</span>
					<span style='font-size:14px;color:#282828'>{{item.price2}}</span>
				</p>
			</div>
		</div>
	</yd-layout>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				NavBar: '更多金融产品',
				items: [{
					name: '',
					price: '',
					installmentPrice: '',
					tuijian: '',
					subBtn: [{
						text: '申请资料简便'
					}, {
						text: '优先审批',
					}]
				}]
			}
		},
		methods: {
			handClick(index) {
				this.$router.push({
					path: '/productChooseone'
				});
				this.$store.commit({ type: 'change', index: index })
				console.log(index);
			}			
		},
		mounted() {
			console.log(this.$store.state);
		}
	}
</script>