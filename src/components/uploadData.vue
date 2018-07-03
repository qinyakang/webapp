<style lang='scss'>
	#uploadData {
		background: #fff;
		.upload-box {
			.upload-box-left {
				float: left;
				background: #F2F2F2;
				width: 3rem;
				height: 2.5rem;
				text-align: center;
				line-height: 2.5rem;
				border-radius: 4px;
				position: relative;
			}
			.upload-box-right {
				float: right;
				background: #F2F2F2;
				width: 3rem;
				height: 2.5rem;
				text-align: center;
				line-height: 2.5rem;
				border-radius: 4px;
				position: relative;
			}
			.upload-box-left span,
			.upload-box-right span {
				display: inline-block;
				width: 30px;
				height: 30px;
				background: #fff;
				text-align: center;
				line-height: 30px;
				border-radius: 50%;
				font-size: 14px;
				color: #4A84FF
			}
			.yd-navbar-center-title {
				font-size: .35rem !important
			}
		}
	}
</style>
<template>
	<yd-layout id="uploadData">
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
			<form id='form3'>
				<input name='file' type='file' @change="uploadFile('form3','pic3')" accept="image/*" >
			</form>
			<form id='form4'>
				<input name='file' type='file' @change="uploadFile('form4','pic4')" accept="image/*" >
			</form>
		</div>
		<div class='upload-box' style='height:3.2rem;padding:20px;width:100%'>
			<div class='upload-box-left' @click='fileUpload("form1")'>
				<span>
					+
				</span>
				<font style="position:absolute;top:1.6rem;left:1rem;color:#999999">
					单身证明
				</font>
				<img v-if="form.pic1" :src='form.pic1' 
					style='position:absolute;top:0rem;left:0rem;width:3rem;height:2.5rem'>
			</div>
			<div class='upload-box-right' @click='fileUpload("form2")'>
				<span>
					+
				</span>
				<font style="position:absolute;top:1.6rem;left:1rem;color:#999999">
					户口本首页
				</font>
				<img v-if="form.pic2" :src='form.pic2' 
					style='position:absolute;top:0rem;left:0rem;width:3rem;height:2.5rem'>
			</div>
		</div>
		<div class='upload-box' style='height:2rem;padding:20px;width:100%;clear: both;'>
			<div class='upload-box-left'  @click='fileUpload("form3")'>
				<span>
					+
				</span>
				<font style="position:absolute;top:1.6rem;left:1rem;color:#999999">
					户口本户主页
				</font>
				<img v-if="form.pic3" :src='form.pic3' 
					style='position:absolute;top:0rem;left:0rem;width:3rem;height:2.5rem'>
			</div>
			<div class='upload-box-right' @click='fileUpload("form4")'>
				<span>
					+
				</span>
				<font style="position:absolute;top:1.6rem;left:1rem;color:#999999">
					户口本个人页
				</font>
				<img v-if="form.pic4" :src='form.pic4' 
					style='position:absolute;top:0rem;left:0rem;width:3rem;height:2.5rem'>
			</div>
		</div>
		<yd-button style="width:100%;position: fixed;bottom: 0;clear: both;border-radius: 0;background: #F54D42;font-family: 'PingFangSC';" size="large" type="danger">
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
				NavBar: '上传资料',
				form:{
					pic1:'',
					pic2:'',
					pic3:'',
					pic4:'',
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
		},
		mounted(){
			
		}
	}
</script>