<template>
	<div class="det">
		<table>
			<tr>
				<th>姓名</th>
				<th>班级/机构</th>
				<th>学号/工号</th>
				<th>密码</th>
				<th>身份</th>
				<th>操作</th>
			</tr>
			<tr v-for="(item,index) in userdata">
				<td>{{item.name}}</td>
				<td>{{item.clss}}</td>
				<td>{{item.username}}</td>
				<td>{{item.password}}</td>
				<td>{{item.role}}</td>
				<td><button class="detail" @click="removeUser(index)">删除</button></td>
			</tr>
			<tr v-show="!showadd">
				<td></td>
				<td colspan="3"><button class="adduser" @click="showadd=!showadd">添加新用户</button></td>
				<td></td>
			</tr>
			<tr v-show="showadd">
				<th><input type="text" name="" placeholder="姓名" class="input" v-model="name"></th>
				<th><input type="text" name="" placeholder="班级" class="input" v-model="clss">
				</th>
				<th><input type="text" name="" placeholder="账号" class="input" v-model="username"></th>
				<th><input type="text" name="" placeholder="密码" class="input" v-model="password"></th>
				<th>
					<select v-model="role" class="input">
						<option>student</option>
						<option>instructor</option>
						<option>director</option>
						<option>group</option>
						<option>admin</option>
					</select>
				</th>
				<th><button class="detail" @click="addUser">保存</button></th>
			</tr>
		</table>
		<v-pagebar :count="count"></v-pagebar>
		<button class="detail">提示1：管理员机构代码为：0000 评审小组机构代码为：0001 系办负责人的机构代码为：0002 辅导员机构代码为：对应班级，例如1302</button>
		<button class="detail">提示2：添加用户时，身份选项默认是student,一定要选择正确的身份！</button>
	</div>
</template>
<script>
import pagebar from './pagebar.vue'
import {mapState} from 'vuex'
import {mapActions} from 'vuex'
	export default{
		data(){
			return {
				count:0,
				showadd:false,
				name:'',
				clss:'',
				username:'',
				password:'',
				role:'student',
				count:0
			}
		},
		computed:{
			...mapState([
				'userdata'
			])
		},
		components:{
			'v-pagebar':pagebar
		},
		methods:{
			removeUser(index){
				//删除当前
				if(confirm('确定要删除此用户吗？')){
					this.$reqs.post('/users/removeuser',{
						username:this.userdata[index].username
					}).then((result)=>{
						console.log(result.data[0].ok);
						if(result.data[0].ok){
							alert('删除成功！');
						}else{
							alert('删除失败!');
						}
					})
				}
			},
			addUser(){
				//验证是否存在该账号
				if(this.name == '' || this.clss == '' || this.username == ''||this.password == ''|| this.role == ''){
					alert('五个字段都为必填项，不能为空！');
				}else{
					this.$reqs.post('/users/adduserfind',{
						username:this.username
					}).then((result)=>{
						if(result.data){
							this.$reqs.post('/users/adduser',{
								name:this.name,
								clss:this.clss,
								username:this.username,
								password:this.password,
								role:this.role
							}).then((result)=>{
								if(result.data.ok){
									this.name = '';
									this.clss = '';
									this.username = '';
									this.password = '';
									this.role = '';
									this.showadd = !this.showadd;
									alert('添加成功！');
								}
							})
						}else{
							alert('该账号已存在！');
						}
					})																
				}
				
			}
		},
		created(){
			//页面加载的时候获取用户表的总信息数
	        this.$reqs.post('/users/usercount',{
	        }).then((result)=>{
	          //使用箭头函数可以将返回的数据赋值给data
	          //普通写法就不行
	          // console.log(result);
	          this.count = result.data.count;
	        })
		}	
	}
</script>
<style scoped lang="less">
.detail{
	height:30px;
	border-radius: 2px;
	border:none;
	outline: none;
	background: #fff;
	color:#000;
	padding:1px 10px;
}
.det{
	width: 100%;
	height:100%;
	table{
		width:100%;
		height:100%;
		border-collapse: collapse;
		tr:nth-child(odd){
			background: #F8F9FB;
		}
		tr:nth-child(even){
			background:#fff;
		}
		td,th{
			width:20%;
			padding: 10px 20px;
			text-align: center;
		}
		.detail{
			width:60px;
			height:30px;
			border-radius: 2px;
			border:none;
			outline: none;
			background: #0E90D2;
			color:#fff;
			cursor:pointer;
		}
		.adduser{
			width:100%;
			height:30px;
			border-radius: 2px;
			border:none;
			outline: none;
			background: #0E90D2;
			color:#fff;
			cursor:pointer;
			letter-spacing: 3px;
			&:focus{
				
			}
		}
		.input{
			width:100%;
			height:30px;
			border-radius:2px;
			border:1px solid #ccc;
			text-align:center;
			&:focus{
				border: 1px solid #4289dc;
			}
		}
	}
}
	
</style>
