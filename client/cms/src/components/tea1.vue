<template>
	<div class="intro">
		<h3>评分须知</h3>
		<p>助学金评审本着公开公平公正透明的原则，您的身份是<span class="bold">{{shenfen}}</span>，在本次评审中您负责的<span class="bold">{{fenshu1}}</span>和<span class="bold">{{fenshu2}}</span>的打分，每项<span class="bold">总分为100分</span>，在对应项输入分数后，点击对应<span class="bold">保存按钮</span>，访客生效，请了解清楚情况，认真对待打分！</p>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				shenfen:'',
				fenshu1:'',
				fenshu2:''
			}
		},
		created(){
			//判断是辅导员还是系部负责人
			let _indent = sessionStorage.getItem('role');
			if(_indent == 'instructor'){
				this.shenfen = "辅导员";
				this.fenshu1 = "思想道德素质（占比10%）";
				this.fenshu2 = "家庭困难状况（占比50%）";
			}else if(_indent == 'director'){
				this.shenfen = "系办负责人";
				this.fenshu1 = "学习成绩（占比20%）";
				this.fenshu2 = "综合素质（占比20%）";
			}
		},
	}
</script>
<style scoped lang="less">
	.intro{
		width:100%;
		height: 100%;
		padding:10px;
		p{
			text-indent: 2em;
			margin-top:10px;
		}
		.bold{
			font-size:18px;
			font-weight: bold;
		}
	}
</style>