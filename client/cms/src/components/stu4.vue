<template>
	<div class="myInfo">
		<table>
			<tr>
				<th>项目</th>
				<th>得分/结果</th>
			</tr>
			<tr>
				<td>思想道德素质（10%）</td>
				<td>{{myaward.score1}}</td>
			</tr>
			<tr>
				<td>家庭困难情况（50%）</td>
				<td>{{myaward.score2}}</td>
			</tr>
			<tr>
				<td>课程成绩（20%）</td>
				<td>{{myaward.score3}}</td>
			</tr>
			<tr>
				<td>综合素质（20%）</td>
				<td>{{myaward.score4}}</td>
			</tr>
			<tr>
				<td>综合得分（满分100分）</td>
				<td>{{myaward.totalscore}}</td>
			</tr>
			<tr>
				<td>获奖情况</td>
				<td>{{level}}</td>
			</tr>
			<tr>
				<td>评审意见</td>
				<td>{{myaward.advise}}</td>
			</tr>
		</table>
	</div>

</template>
<script>
	export default {
		data(){
			return {
				myaward:{}
			}
		},
		computed:{
			level(){
				switch(this.myaward.award){
					case 1:
					 return '一等助学金';
					 break;
					 case 2:
					 return '二等助学金';
					 break;
					 case 3:
					 return '三等助学金';
					 break;
					 case 0:
					 return '未获奖';
					 break;
				}
			}
		},	
		created(){
			let id = sessionStorage.getItem('id');
			this.$reqs.post('/users/getmyaward',{
				_id:id
			}).then((result)=>{
				this.myaward = result.data[0];
			})
		}
	}
</script>
<style scoped lang="less">
	.myInfo{
		width:100%;
		height: 100%;
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
		}
	}
</style>