<template>
	<div class="container">
		<!-- 修改密码 -->
		<v-updatepassword v-show="upflag" :upflag="upflag" @fn="receive"></v-updatepassword>
		<div class="nav">
			<img src="../assets/images/logo.png" height="70" width="70" class="logo">
			<ul>
				<li>
					<router-link to="/admin/adm1">
						<i class="fa fa-home fa-lg" aria-hidden="true"></i>
		                <span>账号管理</span>
	            	</router-link>
	            </li>
				<li>
					<router-link to="/admin/adm2">
						<i class="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
		                <span>指标管理</span>
	            	</router-link>
				</li>
				<li>
					<router-link to="/admin/adm3">
						<i class="fa fa-user-o fa-lg" aria-hidden="true"></i>
		                <span>获奖名单</span>
	            	</router-link>
				</li>
			</ul>
		</div>
		<div class="top">
			<h2>计算机系助学金管理系统 管理员端</h2>
			<div class="loginOut">
				<h4 @click="logOutToggle">{{name}}&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-bars"></i></h4>
				<ul :class="{showl:showLogin}">
					<li @click="loginOut"><i class="fa fa-sign-out"></i>退出</li>
					<li @click="updatepass">修改密码</li>
					<li @click="logOutToggle">意见反馈</li>
				</ul>
			</div>
		</div>
		
		<div class="content">
			<div class="webNav">
				<a href="/#/adm">网站首页</a> / {{pageTitle}}
			</div>
			<router-view></router-view>
		</div>
		
	</div>
</template>
<script>

	import updatePassword from './updatePassword.vue'
	let pageTitleObj = {
        adm1:"账号管理",
        adm2:"指标管理",
        adm3:"获奖名单"
    };
	export default {
		data(){
			return {
				showLogin:false,
				pageTitle: pageTitleObj[ this.$route.path.substr( this.$route.path.lastIndexOf("/")+1 ) ] || "网站首页",
				upflag:false
			}
		},
		computed:{
			name(){
				return sessionStorage.getItem('name');
			}
		},
		components:{
			'v-updatepassword':updatePassword
		},
		methods:{
			logOutToggle(){
				this.showLogin = !this.showLogin;
			},
			loginOut(){
				this.$router.push({path:'/'});
				this.showLogin = !this.showLogin;
			},
			updatepass(){
				this.upflag = !this.upflag;
				this.showLogin = !this.showLogin;
			},
			receive(res){
				this.upflag = res;
			}
		},
		watch:{ //监控路径变化  当路径发送变化的时候，改变面包屑导航的显示
            $route: {
                handler: function (val, oldVal) {
                    var path = val.path;
                    this.pageTitle = pageTitleObj[ path.substr( path.lastIndexOf("/")+1 ) ] || "网站首页";
                }
            }
        }
	}
</script>
<style scoped lang="less">
	.container{
		position:fixed;
		width:100%;
		height: 100%;
	}
	.nav{
		position: fixed;
		top:0;
		left:0;
		width:80px;
		height:100%;
		box-shadow: 0 1px 5px rgba(13,62,73,0.2);
		background: #fff;
		.logo{
			display:block;
			margin:10px auto;
		}
		ul{
			width:80px;
			height:100%;
			li{
				width:40px;
				height:40px;
				margin:20px auto;
				position: relative;
				font-size: 14px;
				span{
					display:block;
					min-width:0;
					height:0;
					position:absolute;
					left:40px;
					top:8px;
					background:#000;
					color:#fff;
					font-size:14px;
					text-align:center;
					line-height:24px;
					border-radius:5px;
					opacity:0;
				}
				span:before{
					content:'';
					position: absolute;
					top:7px;
					left:-10px;
					border:5px solid transparent;
					border-right-color:#000;
				}
			}
			li i:hover + span{
				min-width:90px;
				height:24px;
				opacity: 1;
		        left: 60px;
		        transition:none 0.5s ease-out;
		        transition-property: opacity,left;
			}
			a{
				display:block;
				width:100%;
				height:100%;
				text-align:center;
				box-sizing: border-box;
				padding-top:8px;
			}
			.router-link-active{
				background:rgba(13,62,73,0.1);
			}
		}
	}
	.top{
		width:100%;
		height:60px;
		padding-left:100px;
		line-height:60px;
		box-shadow: 0 1px 5px rgba(13,62,73,0.2);
		h2{
			width:90%;
			float: left;
		}
		.loginOut{
			width:10%;
			height:100%;
			float:left;
			position:relative;
			// background:green;
			h4{
				cursor:pointer; 
			}
			ul{
				position:absolute;
				width:100px;
				height:0;
				left:0;
				top:70px;
				box-shadow: 0 1px 5px rgba(13,62,73,0.2);
				opacity:0;
				transition: all 0.3s ease-out;
				background:#fff;
				overflow: hidden;
				li{
					width:100%;
					height:30px;
					line-height:30px;
					text-align:center;
					font-size: 14px;
					cursor: pointer;
				}
			}
			.showl{
				height:auto;
				top:60px;
				opacity:1;
				border-top: 1px solid #979FA8;
			}
		}
	}
	.content{
		width:100%;
		min-height:500px;
		background:rgba(13,62,73,0.1); 
		padding-left:100px;
		padding-top:20px;
		.webNav{
			width:100%;
			height: 30px;
			background: #fff;
			line-height: 30px;
			margin-bottom: 10px;
			padding-left: 20px;
			font-size: 14px;
			color:#777;
			a{
				color:#111;
				font-size:15px;
			}
		}
	}
</style>