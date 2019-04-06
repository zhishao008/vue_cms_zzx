<template>
	<div class="about">
		<h2>关于本次评审须知</h2>
		<div v-for="item in myclsszb">
			<p v-show="item._id == myclss">本次评审本着公开公正的原则，{{item._id}}班助学金指标数总共{{item.totalplace}}个，其中一等{{item.oneplace}}个，二等{{item.twoplace}}个，三等{{item.threeplace}}个。</p>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				myclsszb:[]
			}
		},
		computed:{
			myclss(){
				return sessionStorage.getItem('clss');
			}
		},
		created(){
			let clss = sessionStorage.getItem('clss');
			this.$reqs.post('/users/getclssplace',{}).then((result)=>{
				// console.log(result.data);
				this.myclsszb = result.data;
			});
		}
	}
</script>
<style scoped lang="less">
	.about{
		h2{
			text-align: center;
			margin:20px auto;
		}
		p{
			text-indent: 2em;
		}
	}
</style>