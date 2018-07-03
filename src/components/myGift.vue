<style lang="scss">
	#myGift {
		background: #FFF;
		.tabToggle{
			height: .84rem;
			.yd-tab-box{
				>a{
					font-size: .3rem;
				}
			}
			.yd-tab-panel{
				.giftList{
					padding-left: .3rem;
					.giftDetail{
						margin-top: .4rem;
						width: 6.92rem;
						height: 1.9rem;
						padding-left: .46rem;
						background: red;
						background: url(../../static/img/buttonthree.png);
						&:last-child{
							background: url(../../static/img/buttontwo.png);
						}
						.detailLeft{
							width: 2.16rem;
							float: left;
							p{
								line-height: 1.9rem;
								&:first-child{
									float: left;
									font-size: .36rem;
									color: #FF6C3E;
								}
								&:last-child{
									float: left;
									font-size: .72rem;
									color: #FF6C3E;
									font-weight: 550;
								}
							}
						}
						.detailCenter{
							padding-top: .36rem;
							width: 3rem;
							float: left;
							p{
								margin-bottom: .08rem;
								&:first-child{
									font-size: .28rem;
									color: #666;
								}
								&:nth-child(2){
									font-size: .2rem;
									color: #666666;
								}
								&:last-child{
									font-size: .2rem;
									color: #999999;
								}						
							}
						}
						.detailRight{
							padding-top: .54rem;
						}
					}
				}
			}
		}
	}
</style>

<template>
	<yd-layout id="myGift">
		<yd-navbar slot="navbar" :title="NavBar">
			<div @click="$router.back(-1);" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
		</yd-navbar>
		<yd-tab class="tabToggle">
			<yd-tab-panel label="未使用">
					<div class="giftList">
						<div class="giftDetail">
							<div class="detailLeft">
								<p>￥</p>
								<p>2000</p>
							</div>
							<div class="detailCenter">
								<p>首付低价券</p>
								<p>仅限杭州宝马4s店使用</p>
								<p>有效期至2018-12-31</p>
							</div>
							<div class="detailRight">
								<img src="../../static/img/buttonone.png"/>
							</div>
						</div>
						<div class="giftDetail">
							<div class="detailLeft">
								<p>￥</p>
								<p>2000</p>
							</div>
							<div class="detailCenter">
								<p>首付低价券</p>
								<p>仅限杭州宝马4s店使用</p>
								<p>有效期至2018-12-31</p>
							</div>
							<div class="detailRight">
								<img src="../../static/img/buttonone.png"/>
							</div>
						</div>
						<div class="giftDetail">
							<div class="detailLeft">
								<p>￥</p>
								<p>2000</p>
							</div>
							<div class="detailCenter">
								<p>首付低价券</p>
								<p>仅限杭州宝马4s店使用</p>
								<p>有效期至2018-12-31</p>
							</div>
							<div class="detailRight">
								<img src="../../static/img/buttonone.png"/>
							</div>
						</div>
					</div>
			</yd-tab-panel>
			<yd-tab-panel label="使用记录">使用记录</yd-tab-panel>
		</yd-tab>

	</yd-layout>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				NavBar: "我的礼券"
			}
		}
	}
</script>