<template>
	<div class="det">
		<div class="clss" v-show="showbanji" :class="{'clssac': ishigh}">全部</div>
		<div class="clss clssac" v-show="showbanji">选择班级：</div>
		<ul class="banji" v-for="(item,index) in banji" v-show="showbanji">
			<li class="clss" @click="sendAtclss(index)" :class="{'clssac': ishigh}">{{item}}</li>
		</ul>
		<table>
			<tr>
				<th>学号</th>
				<th>院系</th>
				<th>年级</th>
				<th>班级</th>
				<th>姓名</th>
				<th>操作</th>
				<th>{{fenshu1}}</th>
				<th>{{fenshu2}}</th>
				<th>操作</th>
			</tr>
			<tr v-for="(item,index) in studentdata">
				<td>{{item.xuehao}}</td>
				<td>{{item.yuanxi}}</td>
				<td>{{item.nianji}}</td>
				<td>{{item.banji}}</td>
				<td>{{item.name}}</td>
				<td><button class="detail" @click="getIndex(index)">查看详情</button></td>
				<td><input type="number" name="" v-model="item.score.scoreleft"></td>
				<td><input type="number" name="" v-model="item.score.scoreright"></td>
				<td><button class="detail" @click="sendscore(index)">保存</button></td>
			</tr>
		</table>
		<v-pagebar :count="count"></v-pagebar>
	</div>
</template>
<script>
	import pageBar from './pagebar.vue'
	import {mapState} from 'vuex'
	import {mapActions} from 'vuex'
	export default{
		data(){
			return {
				fenshu1:'',
				fenshu2:'',
				banji:[],
				showbanji:false,
				count:0,
				ishigh:true
				// pagearr:[1,2],//接受分页传回来的数据
			}
		},
		computed:{
			...mapState([
				'studentdata',
				'atclss'
			]),
			isActive(){
				return true;
			}
		},
		components:{
			'v-pagebar':pageBar
		},
		methods:{
			...mapActions([
				'watchdetail',
				'getStudata',
				'ingetStudata',
				'getAtclss'
			]),
			// 接受子组件传回的分页信息数据
			// receivePage(res){
			// 	this.pagearr = res;
			// }
			getIndex(index){
				this.watchdetail();
				//详情页的页面索引
				this.$store.dispatch('sendIndex',index);
			},
			sendAtclss(index){
				let req = this.banji[index];
				this.$store.dispatch('getAtclss',req);
				this.ingetStudata({skip:0,limit:5,atclss:req});
				//重新获取对应班级学生信息数
                  this.$reqs.post('/users/stucount',{
                    banji:this.atclss
                  }).then((result)=>{
                    //使用箭头函数可以将返回的数据赋值给data
                    //普通写法就不行
                    this.count = result.data.count;
                  })
			},
			sendscore(index){
				let defenl = this.studentdata[index].score.scoreleft;
				let defenr = this.studentdata[index].score.scoreright;
				if(defenl == '' || defenr == '' ){
					alert('打分不得为空！')
				}else if(defenl>100 || defenl<0 || defenr>100 || defenr<0){
					alert('打分必须在0到100之间！');
				}else{
					let scorerole= sessionStorage.getItem('role');
					let scorename= sessionStorage.getItem('name');
					if(scorerole == 'instructor'){
						this.$reqs.post('/users/instructorscore',{
							_id:this.studentdata[index]._id,
							name:this.studentdata[index].name,
							score1:defenl,
							score2:defenr,
							scoreteacher:scorename
						}).then(function(result){
							console.log(result);
							if(result.data.ok){
								alert('打分成功！');
							}
						})
					}else if(scorerole == 'director'){
						this.$reqs.post('/users/directorscore',{
							_id:this.studentdata[index]._id,
							name:this.studentdata[index].name,
							score3:defenl,
							score4:defenr,
							scoreteacher:scorename
						}).then(function(result){
							console.log(result);
							if(result.data.ok){
								alert('打分成功！');
							}
						})
					}
				}
			}
		},
		created(){
			let _indent = sessionStorage.getItem('role');
      		let _clss = sessionStorage.getItem('clss');
			if(_indent == 'instructor'){
				this.fenshu1 = "思想道德素质得分";
				this.fenshu2 = "家庭困难状况得分";
				this.showbanji = false;
		        //辅导员页面获取信息总条数
		        this.$reqs.post('/users/stucount',{
		          banji:_clss
		        }).then((result)=>{
		          //使用箭头函数可以将返回的数据赋值给data
		          //普通写法就不行
		          this.count = result.data.count;
		        })
			}else if(_indent == 'director'){
				this.fenshu1 = "学习成绩得分";
				this.fenshu2 = "综合素质得分";
				this.showbanji = false;
				//页面加载的时候获取用户表的班级代码
				this.$reqs.post('/users/culclss',{
				}).then((result)=>{
					//使用箭头函数可以将返回的数据赋值给data
					//普通写法就不行
					// console.log(result.data);
					let arr =[];
					for(let i in result.data){
						if(result.data[i] !== '0000' && result.data[i]!=='0001' && result.data[i]!=='0002'){
							arr.push(result.data[i]);
						}
					}
					this.banji = arr;
				})
				//其他老师获取总信息数
		        this.$reqs.post('/users/stucount',{
		          
		        }).then((result)=>{
		          //使用箭头函数可以将返回的数据赋值给data
		          //普通写法就不行
		          this.count = result.data.count;
		        })
			}
			
			// 在actions的方法传参的时候要传一个对象过去
			// this.$store.dispatch('getStudata',{skip:this.skip,limit:this.limit});
			
		}

	}
</script>
<style scoped lang="less">
.det{
	.clss{
		width:100px;
		height:30px;
		line-height: 30px;
		border-radius: 2px;
		border:none;
		outline: none;
		background: #ccc;
		color:#fff;
		cursor:pointer;
		text-align:center;
		float: left;
		margin:0 10px 10px 10px;
		&:hover{
			background:#0E90D2;
		}
	}
	.clssac{
		background:#0E90D2;
	}
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
		input{
			width:60px;
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
