<style lang="scss">
	#bcid {
		width: 100%;
		position: absolute;
		top: 50px;
		bottom: 44px;
		text-align: center;
		background: #fff;
	}
	
	.tip {
		color: #FFFFFF;
		font-weight: bold;
		text-shadow: 0px -1px #103E5C;
	}
	
	footer {
		width: 100%;
		height: 44px;
		position: absolute;
		bottom: 0px;
		line-height: 44px;
		text-align: center;
		color: #FFF;
	}
	
	.fbt {
		width: 50%;
		height: 100%;
		background-color: #FFCC33;
		float: left;
	}
	
	.fbt:active {
		-webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
		box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
	}
</style>

<template>
	<yd-layout id="scan">
		<yd-navbar slot="navbar" :title="NavBar">
			<div @click="back()" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
		</yd-navbar>
		<div id="bcid">
			<div style="height:40%"></div>
			<p class="tip">...载入中...</p>
		</div>·
		<footer>
			<div class="fbt" @click="back()">取　 消</div>
			<div class="fbt" @click="scanPicture()">从相册选择二维码</div>
		</footer>
	</yd-layout>
</template>

<script>
	var ws=null,wo=null;
	var scan=null,domready=false; 
	export default {
		name: '',
		data() {
			return {
				NavBar: "二维码扫描",
			}
		},
		methods: {
			plusReady(){
				// 获取窗口对象
				var that = this;
				ws = plus.webview.currentWebview();
				wo = ws.opener();
				// 开始扫描
				scan = new plus.barcode.Barcode('bcid', [plus.barcode.QR, plus.barcode.EAN8, plus.barcode.EAN13], {
					frameColor: '#FFCC33',
					scanbarColor: '#FFCC33',
				});
				scan.onmarked = that.onmarked;
				scan.start({
					conserve: true,
				});
				//scan.setFlash(true);打开灯
			},
			onmarked(type, result, file) {
				var that = this;
				switch(type) {
					case plus.barcode.QR:
						type = 'QR';
						break;
					case plus.barcode.EAN13:
						type = 'EAN13';
						break;
					case plus.barcode.EAN8:
						type = 'EAN8';
						break;
					default:
						type = '其它' + type;
						break;
				}
				result = result.replace(/\n/g, '');
				alert(result);
				that.back();
			},
			back(){ 
				scan.close();
				this.$router.push({
					path: '/carShop',
				});
			},
			scanPicture(){
				plus.gallery.pick(function(path) {
					plus.barcode.scan(path, onmarked, function(error) {
						plus.nativeUI.alert('无法识别此图片');
					});
				}, function(err) {
					console.log('Failed: ' + err.message);
				});
			},
		},
		mounted() {
			var that = this;
			that.plusReady();
		}
	}
</script>