<template>
	<div id='app' style='height:100%'>
		<router-view/>
	</div>
</template>
<style lang="scss">
	@import './style/app.scss'; //引入scss
</style>
<script>
	export default {
		name: 'App',
		data() {
			return {};
		},
		methods: {},
	}

	// H5 plus事件处理
	var ws = null,as = 'pop-in',w = window;
	function plusReady() {
		ws = plus.webview.currentWebview();
		// Android处理返回键
		plus.key.addEventListener('backbutton', function() {
			window.history.go(-1);
		}, false);
	}
	if(w.plus) {
		plusReady();
	} else {
		document.addEventListener('plusready', plusReady, false);
	}
</script>