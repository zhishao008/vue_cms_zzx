<template>
	<div class="det">
		<table>
			<tr>
				<th>学号</th>
				<th>姓名</th>
				<th>思想道德素质<br>评分人</th>
				<th>家庭困难状况<br>评分人</th>
				<th>课程成绩<br>评分人</th>
				<th>综合素质<br>评分人</th>
				<th>总得分</th>
				<th>操作</th>
				<th>评审意见</th>
				<th>是否通过</th>
			</tr>
			<tr v-for="(item,index) in scoredata">
				<td>{{item._id}}</td>
				<td>{{item.name}}</td>
				<td>{{item.score1}}<br>{{item.scoreteacher12}}</td>
				<td>{{item.score2}}<br>{{item.scoreteacher12}}</td>
				<td>{{item.score3}}<br>{{item.scoreteacher34}}</td>
				<td>{{item.score4}}<br>{{item.scoreteacher34}}</td>
				<td @click="totalscore(index)">{{(Math.round((item.score1*0.1+item.score2*0.5+item.score3*0.2+item.score4*0.2)*100))/100}}</td>
				<td><button class="detail" @click="getIndex(index)">查看详情</button></td>
				<td><input type="text" name="" v-model="item.advise"></td>
				<td><button class="detail" @click="sendPass(index)" :disabled="item.pass" :class="{disbtn:item.pass}">是</button></td>
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
			return{
				count:0
			}
		},
		computed:{
			...mapState([
				'studentdata',
				'scoredata'
			])
		},
		components:{
			'v-pagebar':pageBar
		},
		methods:{
			...mapActions([
				'watchdetail'
			]),
			getIndex(index){
				this.watchdetail();
				//详情页的页面索引
				this.$store.dispatch('sendIndex',index);
			},
			//获取当前总分
			totalscore(index){
				let item = this.scoredata[index];
				let res = (Math.round((item.score1*0.1+item.score2*0.5+item.score3*0.2+item.score4*0.2)*100))/100;
				return res;
			},
			//审核是否通过
			sendPass(index){
				let advise = this.scoredata[index].advise;
				let id = this.scoredata[index]._id;
				//获取总分
				let item = this.scoredata[index];
				let res = (Math.round((item.score1*0.1+item.score2*0.5+item.score3*0.2+item.score4*0.2)*100))/100;

				if(advise == null){
					alert('评审意见不得为空！');
				}else if(confirm('确定该学生得分通过审核？')){
					this.$reqs.post('/users/sendpass',{
						advise:advise,
						id:id,
						totalscore:res,
						award:0
					}).then((result)=>{
						if(result.data.ok){
							alert('审核成功！');
						}
					})
				}
			}
		},
		created(){
			this.$reqs.post('/users/scorecount',{
	        }).then((result)=>{
	          //使用箭头函数可以将返回的数据赋值给data
	          //普通写法就不行
	          // console.log(result);
	          this.count = result.data.count;//获取得分总信息数
	        })
		}
	}
</script>
<style scoped lang="less">
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
		.disbtn{
			background:#ccc;
		}
		input{
			width:200px;
			height:30px;
			border-radius:2px;
			border:1px solid #ccc;
			&:focus{
				border: 1px solid #4289dc;
			}
		}
	}
}
	
</style>
