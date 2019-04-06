<template>
<div class="background" ref="background">
	<div class="bg">
		<div class="mtop">
			计算机系助学金评审系统<!-- Grant Evaluation System -->
		</div>
		
		<div class="mmid">
			<div class="notice">
				<ul ref="ul">
					<li v-for="item in winlist"><i class="fa fa-check"></i>&nbsp;&nbsp;&nbsp;&nbsp;计算机系&nbsp;&nbsp;&nbsp;&nbsp;{{item.clss}}班&nbsp;&nbsp;&nbsp;&nbsp;{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;助学金{{item.award}}等</li>
				</ul>
			</div>
			<form>
			  <div class="form-group">
			    <label for="exampleInputEmail1"><i class="fa fa-user-circle-o fa-lg"></i> 用户</label>
			    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="输入学号或者工号" v-model="username">
			  </div>
			  <div class="form-group">
			    <label for="exampleInputPassword1"><i class="fa fa-anchor fa-lg"></i> 密码</label>
			    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="输入密码" v-model="password">
			  </div>
			  <button type="button" class="btn-info" @click="login" :disabled="disablebtn">{{loginText}}</button>
			  <select class="btn-info" v-model="identity">
			  	<option>学生</option>
			  	<option>辅导员</option>
			  	<option>系办负责人</option>
			  	<option>评审小组</option>
			  	<option>管理员</option>
			  </select>
			</form>
		</div>
	</div>
</div>
</template>
<script>
	export default {
		data(){
			return {
				msg:"lizhi",
				username:"",
				password:"",
				identity:'学生',
				loginText:'登录',
				disablebtn:false,
				winlist:[]
			}
		},
		methods:{
			//重置窗口大小背景
			resizebg(){
				let html = document.getElementsByTagName('html')[0];
				let body = document.getElementsByTagName('body')[0];
				html.style.height = '100%';
				body.style.height = '100%';
				let ClientHeight = document.body.clientHeight||document.documentElement.clientHeight;
				let bgbody = this.$refs.background;
				bgbody.style.height = ClientHeight + 'px';
			},
			//模拟登陆跳转
			login(){
				let _this = this;
				let indentity;
				this.disablebtn = true;
				this.loginText = "登录中...";
				let id = this.username;
				switch(this.identity){
					case "学生":
					indentity = 'student';
					break;
					case "辅导员":
					indentity = 'instructor';
					break;
					case "系办负责人":
					indentity = 'director';
					break;
					case "评审小组":
					indentity = 'group';
					break;
					case "管理员":
					indentity = 'admin';
					break;
				}
				this.$reqs.post('/users/login',{
					username:this.username,
					password:this.password,
					role:indentity
				}).then(function(result){
					if(result.data.err){
						alert(result.data.err);
					}else{
						let id = result.data.id;
						let role = result.data.role;
						let name = result.data.name;
						let clss = result.data.clss;
						sessionStorage.setItem('id',id);
						sessionStorage.setItem('role',role);
						sessionStorage.setItem('name',name);
						sessionStorage.setItem('clss',clss);
						switch(role){
							case "student":
								_this.$router.push({path:'/student'});
								break;
							case "instructor":
								_this.$router.push({path:'/teacher'});
								break;
							case "director":
								_this.$router.push({path:'/teacher'});
								break;
							case "group":
								_this.$router.push({path:'/review'});
								break;
							case "admin":
								_this.$router.push({path:'/admin'});
								break;
						}	
					}
					_this.loginText = "登录";
					_this.disablebtn = false;
				}).catch(function(error){
					this.$router.push({path:'/'});
				})
			},
			upSlide(){
				var ul = this.$refs.ul;
				ul.innerHTML+=ul.innerHTML; 
				var timer = null;	
				function Move(){
					ul.style.top = ul.offsetTop - 1 + 'px';
					if(ul.offsetTop<=-ul.offsetHeight/2){
						ul.style.top = 0 +'px';
					}
				}
				timer = setInterval(Move,50)
				ul.onmouseover=function(){
					clearInterval(timer);
				}
				ul.onmouseout=function(){
					timer = setInterval(Move,50)
				}
			}
		},
		created: function(){
			this.$nextTick(()=>{
				this.resizebg();
				this.upSlide();
			})
			this.$reqs.post('/users/gethj',{
				
			}).then((result)=>{
				this.winlist = result.data;
			})
		},
	}
</script>
<style scoped lang="less">
	.background{
		width:100%;
		background:url(../assets/images/bg_body.jpg);
		background-size: 100% 100%;
		color:#fff;
	}
	.bg{
		width:100%;
		height:100%;
		background:rgba(0,0,0,0.4);
	}
	.mtop{
		height:200px;
		line-height:200px;
		text-align:center;
		font-size:36px;
		letter-spacing: 5px;
	}
	
	.mmid{
		width:1000px;
		height:250px;
		margin: 0 auto;
		.notice{
			width:400px;
			height:250px;
			margin-left: 50px;
			margin-right:100px;
			overflow:hidden;
			float: left;
			background: rgba(255,255,255,0.2);
			border-radius:5px;
			position:relative;
			ul{
				position:absolute;
				top:0;
				width:100%;
				height: auto;
				li{
					width:100%;
					margin-top:10px;
					text-indent: 1em;
				}
			}
		}
		form{
			width:400px;	
			float: left;
			padding-top:10px;
		}
		.form-group{
			width:100%;
			height:80px;
			lebal{
				display: block;
			}
			input{
				width:100%;
				height:40px;
				border:1px solid #eee;
				border-radius: 5px;
				margin:10px auto;
				padding-left: 10px;
			}
		}
		.btn-info{
			width:180px;
			box-sizing: border-box;
			margin:20px 10px 0 0;
			height:40px;
			padding:0 12px;
			border:1px solid #eee;
			border-radius:5px;
			background:transparent;
			outline: none;
			color:#fff;
		}
		.btn-info:hover{
			cursor: pointer;
			background: #222;
		}
	}
</style>