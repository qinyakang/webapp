<style lang='scss'>
	#nameAuthenticationone{
		background: #fff;
		.upload-box{
			width:100%;
			height:4rem;
			padding:16px;
			margin-bottom:40px;
			position:relative;
			img{
				height:4rem
			}
		}
	}
</style>
<template>
	<yd-layout id="nameAuthenticationone">
		<yd-navbar slot="navbar" v-bind:title="NavBar">
			<div @click="$router.back(-1);" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
		</yd-navbar>
		<div style='display:none'>
			<form id='form1'>
				<input name='file' type='file' @change="uploadFile('form1','pic1')" accept="image/*" >
			</form>
			<form id='form2'>
				<input name='file' type='file' @change="uploadFile('form2','pic2')" accept="image/*" >
			</form>
		</div>
		<div class='upload-box' @click='fileUpload("form1")'>
			<img :src='form.pic1' style='position:absolute;top:.4rem;left:1.7rem;width:4rem;height:3.5rem'>
			<font style="position:absolute;top:4.6rem;left:2rem;color:#999999;font-size:.28rem">
				请拍摄或上传身份证正面照
			</font>
		</div>	
		<div class='upload-box' @click='fileUpload("form2")'>
			<img :src='form.pic2' style='position:absolute;top:.4rem;left:1.7rem;width:4rem;height:3.5rem'>
			<font style="position:absolute;top:4.6rem;left:2rem;color:#999999;font-size:.28rem">
				请拍摄或上传身份证正面照
			</font>
		</div>
		<yd-button style="position: fixed;bottom: 0;clear: both;border-radius: 0;background: #F54D42;font-family: 'PingFangSC';" size="large" type="danger">
			确认上传
		</yd-button>
	</yd-layout>
</template>

<script>
	import $ from 'jquery';
	export default {
		name: '',
		data() {
			return {
				NavBar: '实名认证',
				form:{
					pic1:'/static/img/idCardPictureP.png',
					pic2:'/static/img/idCardPictureN.png'
				}
			}
		},
		methods: {
			fileUpload(formName){
				$('#'+formName).find('input').click();
			},
			uploadFile(formName,pic){
				var form=document.getElementById(formName);
        		var fd =new FormData(form);
        		var that = this;
        		that.$dialog.loading.open('稍等');
				$.ajax({
		            url: "http://192.168.1.127:8080/sysfile/upload",
		            type: "POST",
		            data: fd,
		            async:true,
		            processData: false,  // 告诉jQuery不要去处理发送的数据
		            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
		            timeout:4000,
		        }).done(function(res){
		        	that.$dialog.loading.close();
		        	console.log(JSON.stringify(res)); 
	            	if(!res.success){
	            		that.$dialog.toast({
		                    mes: '操作失败',
		                    timeout: 1500,
		                    icon: 'error',
		                    callback: () => {
		                    	
		                    }
		                });
	            	}else{
	            		//设置图片
	            		that.form[pic] = res.result.fileUrl;
	            	}
	            }).fail(function(res){
	            	that.$dialog.loading.close();
	            	that.$dialog.notify({
	                    mes: '网络异常',
	                    timeout: 5000,
	                    callback: () => {
	                    }
	                });
	            });
			}
		}
	}
</script>
