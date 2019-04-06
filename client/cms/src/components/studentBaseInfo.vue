<template>
	<div class="detailInfo" v-show="basedDetail">
		<div class="content">
			<i class="fa fa-close close" @click="watchdetail"></i>
			<ul v-if="curdata">
				<li>学号：{{curdata.xuehao}}</li>
				<li>姓名：{{curdata.name}}</li>
				<li>性别：{{curdata.sex}}</li>
				<li>出生日期：{{curdata.birth}}</li>
				<li>民族：{{curdata.minzu}}</li>
				<li>政治面貌：{{curdata.mianmao}}</li>
				<li>入学前户口：{{curdata.hukou}}</li>
				<li>学校：{{curdata.school}}</li>
				<li>院系：{{curdata.yuanxi}}</li>
				<li>专业：{{curdata.zhuanye}}</li>
				<li>年级：{{curdata.nianji}}</li>
				<li>班级：{{curdata.banji}}</li>
				<li>家庭详细地址：{{curdata.address}}</li>
				<li>邮编：{{curdata.youbian}}</li>
				<li>联系电话：{{curdata.tel}}</li>
			</ul>
			<thead>家庭成员：</thead>
			<table v-if="curdata">
				<tr>
					<th>姓名</th>
					<th>年龄</th>
					<th>与学生关系</th>
					<th>工作或学习单位</th>
					<th>职务</th>
					<th>年收入</th>
					<th>健康状况</th>
				</tr>
				<tr v-for="item in curdata.family">
					<td>{{item.name}}</td>
					<td>{{item.age}}</td>
					<td>{{item.connect}}</td>
					<td>{{item.work}}</td>
					<td>{{item.job}}</td>
					<td>{{item.money}}</td>
					<td>{{item.body}}</td>
				</tr>
			</table>
			<ul v-if="curdata">
				<li>是否五保户：{{curdata.studentpour.iswubao?'是':'否'}}</li>
				<li>是否农村低保户：{{curdata.studentpour.isdibao?'是':'否'}}</li>
				<li>是否军烈属或优抚子女：{{curdata.studentpour.islieshi?'是':'否'}}</li>
				<li>是否单亲家庭子女：{{curdata.studentpour.isdanqin?'是':'否'}}</li>
				<li>是否农村特困供养：{{curdata.studentpour.istekun?'是':'否'}}</li>
				<li>父母是否丧失劳动能力：{{curdata.studentpour.issangshi?'是':'否'}}</li>
				<li>是否孤儿：{{curdata.studentpour.isguer?'是':'否'}}</li>
				<li>家中是否有患大病者：{{curdata.studentpour.ishuanbing?'是':'否'}}</li>
				<li>是否建党立卡贫困家庭：{{curdata.studentpour.islika?'是':'否'}}</li>
				<li>是否低收入家庭：{{curdata.studentpour.islittlefamily?'是':'否'}}</li>
				<li>家庭年收入：{{curdata.studentpour.yearmoney}}元</li>
				<li>家庭收入主要来源：{{curdata.studentpour.mainsource}}</li>
				<li>家庭人口数：{{curdata.studentpour.familycount}}</li>
				<li>劳动力人口数：{{curdata.studentpour.workcount}}</li>
				<li>家庭成员失业人数：{{curdata.studentpour.nojobcount}}</li>
				<li>赡养人口数：{{curdata.studentpour.eatcount}}</li>
				<li>家庭是否遭受自然灾害：{{curdata.studentpour.isnature?'是':'否'}}</li>
				<li>自然灾害具体情况描述：{{curdata.studentpour.naturedes}}</li>
				<li>家庭是否遭受突发意外事件：{{curdata.studentpour.issuddly?'是':'否'}}</li>
				<li>突发意外事件描述：{{curdata.studentpour.suddlydes}}</li>
				<li>家庭是否欠债：{{curdata.studentpour.isnomoney?'是':'否'}}</li>
				<li>家庭欠债金额：{{curdata.studentpour.qianzhai}}</li>
				<li>家庭欠债原因：{{curdata.studentpour.nomoneywhy}}</li>
				<li>是否残疾人：{{curdata.studentpour.isdisab?'是':'否'}}</li>
				<li>残疾类别：{{curdata.studentpour.disablei}}</li>
				<li>助学金申请理由：{{curdata.studentpour.applicationreason}}</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import {mapState} from 'vuex'
	import {mapActions} from 'vuex'
	export default{
		computed:{
			...mapState([
				'basedDetail',
				'studentdata',
				'detailindex'
			]),
			curdata(){
				return this.studentdata[this.detailindex];
			}
		},
		methods:{
			...mapActions([
				'watchdetail'
			])
		},
		created(){

		}
	}
</script>
<style scoped lang="less">
	.detailInfo{
		position: absolute;
		width:100%;
		height:100%;
		background: rgba(0,0,0,0.1);
		z-index:1000;
		.content{
			width:800px;
			height:500px;
			overflow-y: scroll;
			margin:20px auto;
			background:#fff;
			padding:20px;
			position:relative;
			.close{
				position:absolute;
				top:3px;
				right: 6px;
				cursor:pointer;
			}
			li{
				line-height:30px;
			}
			li:nth-child(odd){
			background: #F8F9FB;
			}
			li:nth-child(even){
				background:#fff;
			}
			table{
				width:100%;
			}
			tr,thead{
				height:30px;
				line-height:30px;
				text-align: center;
			}
			tr:nth-child(odd){
				background: #F8F9FB;
			}
			tr:nth-child(even){
				background:#fff;
			}
		}
	}
</style>