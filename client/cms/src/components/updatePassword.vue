<template>
	<div class="uppass">
		<form class="form">
			<input type="password" name="" placeholder="旧密码" v-model="oldpassword"><br>
			<input type="password" name="" placeholder="新密码" v-model="newpassword"><br>
			<input type="password" name="" placeholder="确认新密码" v-model="snewpassword"><br>
			<button class="btn-pd" type="button" @click="send">取消</button>
			<button class="btn-pd" type="button" @click="changepassword">确定</button>
		</form>
	</div>
</template>
<script>
	export default{
		name:'updatePassword',
		props:['upflag'],
		data(){
			return {
				myupflag:this.upflag,
				oldpassword:'',
				newpassword:'',
				snewpassword:''
			}
		},
		computed:{
			zhi(){
				
			}
		},
		methods:{
			send () {
		        this.myupflag = !this.upflag;
		        this.$emit('fn',this.myupflag);
		    },
		    changepassword(){
		    	let id = sessionStorage.getItem('id');
		    	if(this.newpassword == this.snewpassword){
		    		this.$reqs.post('/users/changepassword',{
			    		id:id,
			    		old:this.oldpassword,
			    		new:this.newpassword,
			    		snew:this.snewpassword
			    	}).then((result)=>{
			    		if(result.data.ok){
			    			this.oldpassword = '',
							this.newpassword = '',
							this.snewpassword ='',
							this.myupflag = !this.upflag;
		        			this.$emit('fn',this.myupflag);
			    			alert('修改成功！');
			    		}
			    	})
		    	}else{
		    		alert('两次输入的新密码不一样！');
		    	}
		    	
		    }
		}
	}
</script>
<style scoped lang="less">
	.uppass{
		position: absolute;
		width:100%;
		height:100%;
		background: rgba(0,0,0,0.1);
		z-index:1000;
		.form{
			width:500px;
			height:220px;
			background:#fff;
			margin:50px auto;
			padding-left:20px;
			border-radius:5px;
			padding:0 20px;
			input{
				width:100%;
				height:30px;
				margin-top:20px;
				border:1px solid #eee;
				border-radius:5px;
				padding-left: 10px;
			}
			button{
				width:50px;
				height: 30px;
				float: right;
				border:1px solid #4187DB;
				border-radius:5px;
				background: #fff;
				margin-top:20px;
				margin-left:20px;
				outline: none;
				cursor:pointer;
				color:#4187DB;
				&:hover{
					color:#fff;
					background:#4187DB;
				}
			}
		} 
	}
</style>