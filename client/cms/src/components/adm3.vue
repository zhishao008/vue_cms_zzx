<template>
	<div class="result">
		<ul v-for="(items,index) in placeName">
			<li>{{items[index].clss}}班评审结果</li>
			<li v-for="item in items">
				<span>学号：{{item._id}}</span>
				<span>姓名：{{item.name}}</span>
				<span>思想道德素质：{{item.score1}}</span>
				<span>家庭困难情况：{{item.score2}}</span>
				<span>课程成绩：{{item.score3}}</span>
				<span>综合素质：{{item.score4}}</span>
				<span>总分：{{item.totalscore}}</span>
			</li>
		</ul>
		<div v-for="(item,index) in clssPlace">
			<button class="detail" @click="giveLevel(index)">发布{{item._id}}班助学金名单</button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				clssPlace:[],
				placeName:[]
			}
		},
		methods:{
			giveLevel(index){
				let score1 = parseInt(this.clssPlace[index].oneplace) - 1;
				let score2 = parseInt(this.clssPlace[index].oneplace) + parseInt(this.clssPlace[index].twoplace) - 1;
				let score3 = parseInt(this.clssPlace[index].totalplace) - 1;
				// console.log(this.placeName[index][score1].totalscore);
				// console.log(this.placeName[index][score2].totalscore);
				// console.log(this.placeName[index][score3].totalscore);
				this.$reqs.post('/users/givelevel',{
					clss:this.clssPlace[index]._id,
					oneplace:this.placeName[index][score1].totalscore,
					twoplace:this.placeName[index][score2].totalscore,
					threeplace:this.placeName[index][score3].totalscore,
				}).then((result)=>{
					// console.log(result);
					if(result.data.ok){
						alert('发布获奖学生名单成功！');
					}
				})
			}
		},
		created(){
			//获取指标信息
			this.$reqs.post('/users/getclssplace',{}).then((result)=>{
				// console.log(result.data);
				this.clssPlace = result.data;
				// console.log(this.clssPlace.length);
				for(var i=0;i<this.clssPlace.length;i++){
					this.$reqs.post('/users/getplacename',{
						clss:this.clssPlace[i]._id,
						limit:parseInt(this.clssPlace[i].totalplace)
					}).then((result)=>{
						this.placeName.push(result.data);
					})
				}
			});
		}
	}
</script>
<style lang="less" scoped>
.result{
	width: 100%;
	height:410px;
	overflow-y: scroll;
	ul{
		width:100%;
		height:auto;
		border-collapse: collapse;
		li{
			text-align: left;
			padding:10px 20px;
			span{
				padding:10px 30px;
			}
		}
		li:nth-child(odd){
			background: #F8F9FB;
		}
		li:nth-child(even){
			background:#fff;
		}
	}
	.detail{
		width:200px;
		height:30px;
		border-radius: 2px;
		border:none;
		outline: none;
		background: #0E90D2;
		color:#fff;
		cursor:pointer;
		margin:10px 20px;
		float: left;
	}
}
</style>