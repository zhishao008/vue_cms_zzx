<template>
	<div class="place">
		<table>
			<tr>
				<th>班级</th>
				<th>总指标数</th>
				<th>一等指标数</th>
				<th>二等指标数</th>
				<th>三等指标数</th>
				<th>操作</th>
			</tr>
			<tr v-for="(item,index) in clssPlace">
				<td>{{item._id}}</td>
				<td>{{item.totalplace}}</td>
				<td>{{item.oneplace}}</td>
				<td>{{item.twoplace}}</td>
				<td>{{item.threeplace}}</td>
				<td><button class="detail" @click="removePlace(index)">删除</button></td>
			</tr>
			<tr v-show="!showadd">
				<td></td>
				<td colspan="4"><button class="adduser" @click="showadd=!showadd">新增班级指标信息</button></td>
				<td></td>
			</tr>
			<tr v-show="showadd">
				<th><input type="number" name="" placeholder="班级" class="input" v-model="clss"></th>
				<th><input type="number" name="" placeholder="总指标数" class="input" v-model="totalplace">
				</th>
				<th><input type="number" name="" placeholder="一等指标数" class="input" v-model="oneplace"></th>
				<th><input type="number" name="" placeholder="二等指标数" class="input" v-model="twoplace"></th>
				<th><input type="number" name="" placeholder="三等指标数" class="input" v-model="threeplace"></th>
				<th><button class="detail" @click="addPlace">保存</button></th>
			</tr>
		</table>
	</div>
</template>
<script type="text/javascript">
export default{
	//总指标数   对应班级的指标数 一等 二等 三等
	data(){
		return{
			showadd:false,
			clss:'',
			totalplace:'',
			oneplace:'',
			twoplace:'',
			threeplace:'',
			clssPlace:[]
		}
	},
	methods:{
		addPlace(){
			//验证是否存在该账号
			if(this.clss == '' || this.totalplace == '' || this.oneplace == ''||this.twoplace == ''|| this.threeplace == ''){
				alert('五个字段都为必填项，不能为空！');
			}else{
				this.$reqs.post('/users/addplacefind',{
					clss:this.clss
				}).then((result)=>{
					if(result.data){
						this.$reqs.post('/users/addplace',{
							_id:this.clss,
							totalplace:this.totalplace,
							oneplace:this.oneplace,
							twoplace:this.twoplace,
							threeplace:this.threeplace
						}).then((result)=>{
							if(result.data.ok){
								this.clss = '';
								this.totalplace = '';
								this.oneplace = '';
								this.twoplace = '';
								this.threeplace = '';
								this.showadd = !this.showadd;
								alert('添加成功！');
							}
						})
					}else{
						alert('该班级指标信息已存在！');
					}
				})																
			}
		},
		removePlace(index){
			//删除当前
			if(confirm('确定要删除此用户吗？')){
				this.$reqs.post('/users/removeplace',{
					id:this.clssPlace[index]._id
				}).then((result)=>{
					console.log(result.data[0].ok);
					if(result.data[0].ok){
						alert('删除成功！');
					}else{
						alert('删除失败!');
					}
				})
			}
		}
	},
	created(){
		this.$reqs.post('/users/getclssplace',{}).then((result)=>{
			// console.log(result.data);
			this.clssPlace = result.data;
		});
	}
}
</script>
<style lang="less" scoped>
.place{
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
				border: 1px sotdd #4289dc;
			}
		}
	}
}
</style>