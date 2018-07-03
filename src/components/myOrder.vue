<style lang="scss">

</style>

<template>
	<yd-layout id="my">
		<yd-navbar slot="navbar" :title="NavBar">
			<div @click="$router.back(-1);" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
		</yd-navbar>
		<div class="mySection">
			<ul>
				<router-link tag="li" to="/orderForm">
					<img src="../../static/img/myForm.png" alt="" />
				</router-link>
				<router-link tag="li" to="/myGift">
					<img src="../../static/img/myCard.png" alt="" />
				</router-link>
			</ul>
		</div>
	</yd-layout>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				NavBar: "我的预约"
			}
		}
	}
</script>