<template>
	<div class="baseInfo">
		<!-- 基本信息：
		姓名 身份证号码 是否农村五保户  是否低保 是否孤儿 是否单亲家庭子女   是否残疾人  残疾类别  
		父母是否丧失劳动能力  家中是否有患大病者  是否建党立卡贫困家庭 是否低收入家庭 是否军烈属或优抚子女   家庭年收入  家庭收入主要来源  家庭是否遭受自然灾害  自然灾害具体情况描述  家庭是否遭受突发意外事件  突发意外事件描述  家庭欠债金额  家庭欠债原因  家庭人口数  劳动力人口数  家庭成员失业人数  赡养人口数  其他信息 是否农村低保户 是否农村特困供养  其他 认定困难名称  认定时间  认定原因  班级认定意见  年级认定意见 -->
		<h3>个人基本信息</h3>
		<form>
			<input type="text" name="" placeholder="学号" v-model="xuehao">
			<input type="text" name="" placeholder="姓名" v-model="name">
			<select v-model="sex">
				<option>性别</option>
				<option>男</option>
				<option>女</option>
			</select>
			<input type="text" name="" placeholder="出生日期" v-model="birth">
			<input type="text" name="" placeholder="民族" v-model="minzu">
			<select v-model="mianmao">
				<option>政治面貌</option>
				<option>群众</option>
				<option>团员</option>
				<option>预备党员</option>
				<option>党员</option>
			</select>
			<select v-model="hukou">
				<option>入学前户口</option>
				<option>农村</option>
				<option>非农村</option>
			</select>
			<input type="text" name="" placeholder="学校" v-model="school">
			<input type="text" name="" placeholder="院系" v-model="yuanxi">
			<input type="text" name="" placeholder="专业" v-model="zhuanye">
			<select v-model="nianji">
				<option>年级</option>
				<option>大一</option>
				<option>大二</option>
				<option>大三</option>
				<option>大四</option>
			</select>
			<input type="text" name="" placeholder="详细家庭住址" v-model="address">
			<input type="text" name="" placeholder="邮政编码" v-model="youbian">
			<input type="text" name="" placeholder="联系电话" v-model="tel">
		</form>
		<h3>家庭成员情况</h3>
		<table ref="home">
			<tr>
				<th>姓名</th>
				<th>年龄</th>
				<th>与学生关系</th>
				<th>工作学习单位</th>
				<th>职业</th>
				<th>年收入（元）</th>
				<th>健康状况</th>
			</tr>
			<tr v-for="item in family">
				<td><input type="text" name="" v-model="item.name"></td>
				<td><input type="text" name="" v-model="item.age"></td>
				<td><input type="text" name="" v-model="item.connect"></td>
				<td><input type="text" name="" v-model="item.work"></td>
				<td><input type="text" name="" v-model="item.job"></td>
				<td><input type="text" name="" v-model="item.money"></td>
				<td><input type="text" name="" v-model="item.body"></td>
			</tr>
		</table>
		<button type="button" class="addRow" @click="submit" :disabled="isDis">提交</button>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				isDis:false,
				sex:'性别',
				birth:'',
				minzu:'',
				mianmao:'政治面貌',
				hukou:'入学前户口',
				school:'',
				yuanxi:'',
				zhuanye:'',
				nianji:'年级',
				address:'',
				youbian:'',
				tel:'',
				family:[
					{name:'',age:'',connect:'',work:'',job:'',money:'',body:''},
					{name:'',age:'',connect:'',work:'',job:'',money:'',body:''},
					{name:'',age:'',connect:'',work:'',job:'',money:'',body:''},
					{name:'',age:'',connect:'',work:'',job:'',money:'',body:''},
					{name:'',age:'',connect:'',work:'',job:'',money:'',body:''},
				]
			}
		},
		computed:{
			xuehao(){
				return sessionStorage.getItem("id");
			},
			name(){
				return sessionStorage.getItem('name');
			}
		},
		methods:{
			submit(){
				let _this = this;
				let id = sessionStorage.getItem('id');
				let clss = sessionStorage.getItem('clss');
				this.$reqs.post('/users/studentinfo',{
					_id:id,
					xuehao:id,
					name:this.name,
					sex:this.sex,
					birth:this.birth,
					minzu:this.minzu,
					mianmao:this.mianmao,
					hukou:this.hukou,
					school:this.school,
					yuanxi:this.yuanxi,
					zhuanye:this.zhuanye,
					nianji:this.nianji,
					banji:clss,
					address:this.address,
					youbian:this.youbian,
					tel:this.tel,
					family:this.family,
					score:{
						scoreleft:'',
						scoreright:'',
					},
					studentpour:{}
				}).then(function(result){
					// console.log(result.data.ok);
					if(result.data.ok){
						alert('保存成功！');
					}
				})
			}
		}
	}
</script>
<style scoped lang="less">
	.baseInfo{
		width:100%;
		height:500px;
		overflow-y: scroll;
		form{
			width:100%;
			height:auto;
		}
		input,select{
			border: 1px solid #cad3de;
		    height: 35px;
		    line-height: 35px;
		    margin: 5px 0 10px;
		    border-radius: 3px;
		    padding: 0 10px;
		    outline: none;
		    box-sizing: border-box;
		}
		input:focus{
			border: 1px solid #4289dc;
		}
		table{
			width:100%;
			height:auto;
			margin:5px 0 10px;
			border-collapse: collapse;
			tr:nth-child(odd){
				background: #F8F9FB;
			}
			tr:nth-child(even){
				background:#fff;
			}
			td,th{
				padding: 0 10px;
				text-align: center;
			}
			input{
				width:100%;
			}
		}
		.addRow{
			width:100%;
			height:40px;
			border: 1px solid #cad3de;
			border-radius: 3px;
		    padding: 0 10px;
		    outline:none;
		    background:#f8f9fb;
		    cursor:pointer;
		    &:hover{
		    	background:#555;
		    	color:#fff;
		    }
		}
	}
</style>