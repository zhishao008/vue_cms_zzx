<template>
	<div class="grant">
		<!-- 是否农村五保户 是否低保 是否孤儿 是否单亲家庭子女   是否残疾人  残疾类别  
		父母是否丧失劳动能力  家中是否有患大病者  是否建党立卡贫困家庭 是否低收入家庭 是否军烈属或优抚子女   家庭年收入  家庭收入主要来源  家庭是否遭受自然灾害  自然灾害具体情况描述  家庭是否遭受突发意外事件  突发意外事件描述  家庭欠债金额  家庭欠债原因  家庭人口数  劳动力人口数  家庭成员失业人数  赡养人口数  其他信息  是否农村特困供养  其他 认定困难名称  认定时间  认定原因  班级认定意见  年级认定意见 -->
		<h3>助学金申请</h3>
		<table>
			<tr>
				<td><input type="checkbox" name="" v-model="iswubao">是否五保户</td>
				<td><input type="checkbox" name="" v-model="isdibao">是否农村低保户</td>
				<td><input type="checkbox" name="" v-model="islieshi">是否军烈属或优抚子女</td>
			</tr>
			<tr>
				<td><input type="checkbox" name="" v-model="isdanqin">是否单亲家庭子女</td>
				<td><input type="checkbox" name="" v-model="istekun">是否农村特困供养</td>
				<td><input type="checkbox" name="" v-model="issangshi">父母是否丧失劳动能力</td>
			</tr>
			<tr>
				<td><input type="checkbox" name="" v-model="isguer">是否孤儿</td>
				<td><input type="checkbox" name="" v-model="ishuanbing">家中是否有患大病者</td>
				<td><input type="checkbox" name="" v-model="islika">是否建党立卡贫困家庭</td>
			</tr>
			<tr>
				<td><input type="checkbox" name="" v-model="islittlefamily">是否低收入家庭</td>
				<td><input type="text" name="" placeholder="家庭年收入（元）" v-model="yearmoney"></td>
				<td></td>
			</tr>
			<tr>
				<td><input type="text" name="" placeholder="家庭收入主要来源" v-model="mainsource"></td>
				<td><input type="text" name="" placeholder="家庭人口数" v-model="familycount"></td>
				<td><input type="text" name="" placeholder="劳动力人口数" v-model="workcount"></td>
			</tr>
			<tr>
				<td><input type="text" name="" placeholder="家庭成员失业人数" v-model="nojobcount"></td>
				<td><input type="text" name="" placeholder="赡养人口数" v-model="eatcount"></td>
				<td></td>
			</tr>
			<tr>
				<td><input type="checkbox" name="" ref="zaihai" @click="toZai" v-model="isnature">家庭是否遭受自然灾害</td>
				<td colspan="2"><input type="text" name="" placeholder="自然灾害具体情况描述" v-show="tozai" v-model="naturedes" class="input"></td>
			</tr>
			<tr>
				<td><input type="checkbox" name="" ref="tufa" @click="toFa" v-model="issuddly">家庭是否遭受突发意外事件</td>
				<td colspan="2"><input type="text" name="" placeholder="突发意外事件描述" v-show="tofa" v-model="suddlydes" class="input"></td>
			</tr>
			<tr>
				<td><input type="checkbox" name="" ref="qianzhai" @click="qianZhai" v-model="isnomoney">家庭是否欠债</td>
				<td><input type="text" name="" placeholder="家庭欠债金额" v-show="qianzhai" v-model="nomoneydes"></td>
				<td><input type="text" name="" placeholder="家庭欠债原因" v-show="qianzhai" v-model="nomoneywhy" class="input"></td>
			</tr>
			<tr>
				<td><input type="checkbox" name="" ref="isDisable" @click="isDisable" v-model="isdisab">是否残疾人</td>
				<td>
					<select v-show="isDisabled" v-model="disablei">
						<option>视力残疾</option>
						<option>听力残疾</option>
						<option>智力残疾</option>
						<option>其他残疾</option>
					</select>
				</td>
				<td></td>
			</tr>
			<tr>
				<td colspan="3"><input type="text" name="" placeholder="助学金申请理由" class="why" v-model="applicationreason"></td>
			</tr>
			<tr>
				<td></td>
				<td><button @click="submit" class="submit">保存</button></td>
				<td></td>
			</tr>
		</table>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				isDisabled:false,
				tozai:false,
				tofa:false,
				qianzhai:false,
				//提交的数据
				iswubao:false,
				isdibao:false,
				islieshi:false,
				isdanqin:false,
				istekun:false,
				issangshi:false,
				isguer:false,
				isguer:false,
				ishuanbing:false,
				islika:false,
				islittlefamily:false,
				yearmoney:'',
				mainsource:'',
				familycount:'',
				workcount:'',
				nojobcount:'',
				eatcount:'',
				isnature:false,
				naturedes:'',
				issuddly:false,
				suddlydes:'',
				isnomoney:false,
				nomoneydes:'',
				nomoneywhy:'',
				isdisab:false,
				disablei:'残疾类别',
				applicationreason:''
			}
		},
		methods:{
			toZai(){
				if(this.$refs.zaihai.checked ==true){
					this.tozai = !this.tozai;
				}else{
					this.tozai = !this.tozai;
				}
			},
			toFa(){
				if(this.$refs.tufa.checked ==true){
					this.tofa = !this.tofa;
				}else{
					this.tofa = !this.tofa;
				}
			},
			qianZhai(){
				if(this.$refs.qianzhai.checked ==true){
					this.qianzhai = !this.qianzhai;
				}else{
					this.qianzhai = !this.qianzhai;
				}
			},
			isDisable(){
				if(this.$refs.isDisable.checked ==true){
					this.isDisabled = !this.isDisabled;
				}else{
					this.isDisabled = !this.isDisabled;
				}
			},
			submit(){
				let _this = this;
				let id = sessionStorage.getItem('id');
				this.$reqs.post('/users/studentpour',{
					id:id,
					iswubao:this.iswubao,
					isdibao:this.isdibao,
					islieshi:this.islieshi,
					isdanqin:this.isdanqin,
					istekun:this.istekun,
					issangshi:this.issangshi,
					isguer:this.isguer,
					isguer:this.isguer,
					ishuanbing:this.ishuanbing,
					islika:this.islika,
					islittlefamily:this.islittlefamily,
					yearmoney:this.yearmoney,
					mainsource:this.mainsource,
					familycount:this.familycount,
					workcount:this.workcount,
					nojobcount:this.nojobcount,
					eatcount:this.eatcount,
					isnature:this.isnature,
					naturedes:this.naturedes,
					issuddly:this.issuddly,
					suddlydes:this.suddlydes,
					isnomoney:this.isnomoney,
					nomoneydes:this.nomoneydes,
					nomoneywhy:this.nomoneywhy,
					isdisab:this.isdisab,
					disablei:this.disablei,
					applicationreason:this.applicationreason
				}).then(function(result){
					console.log(result.data[0].ok);
					if(result.data[0].ok){
						alert('保存成功！');
					}
				})
			}
		}
	}
</script>
<style scoped lang="less">
	.grant{
		width:100%;
		height:500px;
		overflow-y:scroll;
		padding-bottom:50px;
	}
	table{
		margin-top:10px;
		width:100%;
		border-collapse: collapse;
		tr:nth-child(odd){
			background: #F8F9FB;
			height:50px;
		}
		tr:nth-child(even){
			background:#fff;
			height:50px;
		}
		td,th{
			padding: 10px 20px;
			text-align: center;
		}
	}
	input[type="text"],select{
		height:30px;
		border: 1px solid #cad3de;
	    border-radius: 3px;
	    padding: 0 10px;
	    outline: none;
	    box-sizing: border-box;
	}
	.input{
		width:100%;
	}
	input:focus{
		border: 1px solid #4289dc;
	}
	input.why{
		width:100%;
	}
	.submit{
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
</style>