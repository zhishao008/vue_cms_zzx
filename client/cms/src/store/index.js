import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import state from './state.js'
Vue.use(Vuex)
const WATCHDETAIL = 'WATCHDETAIL' //教师页面查看详情
// const CURRENTADD = 'CURRENTADD'
// const CURRENTDES = 'CURRENTDES'
const GETSTUDATA = 'GETSTUDATA'  //获取当前页面学生基本信息
const GETUSERDATA = 'GETUSERDATA'  //获取当前页面账号信息
const GETSCOREDATA = 'GETSCOREDATA'  //获取当前页面账号信息
const SENDINDEX = 'SENDINDEX'  
const ATCLSS = 'ATCLSS'  //选中对应的班级号
let store = new Vuex.Store({
	state,
	mutations:{
		[WATCHDETAIL](state){
			state.basedDetail = !state.basedDetail;
		},
		[GETSTUDATA](state,res){
			state.studentdata = res;
			// console.log(state.userdata);
		},
		[GETUSERDATA](state,res){
			state.userdata = res;
		},
		[SENDINDEX](state,res){
			state.detailindex = res;
		},
		[GETSCOREDATA](state,res){
			state.scoredata = res;
		},
		[ATCLSS](state,res){
			state.atclss = res;
		}
	},
	actions:{
		watchdetail({commit}){
			commit('WATCHDETAIL');
		},
		// getPages(){
		//     axios.post('/users/page',{

		// 	}).then(function(result){
		// 		state.stuinfocount = result.data.count;
		// 	})
	 //    },
	 	//获取对应班级的学生信息数据
	    ingetStudata({commit},obj){
	    	axios.post('/users/inajax_page',{
			    skip:obj.skip,
			    limit:obj.limit,
			    clss:obj.atclss
		    }).then((result)=>{
		        let res = result.data;
		        commit("GETSTUDATA",res)
		        // console.log('获取下一页学生信息对应班级成功');
		    })
	    },
	    //获取学生基本信息的总数
	    getStudata({commit},obj){
	    	axios.post('/users/ajax_page',{
			    skip:obj.skip,
			    limit:obj.limit
		    }).then((result)=>{
		        let res = result.data;
		        commit("GETSTUDATA",res)
		        // console.log('获取下一页学生信息总数成功');
		    })
	    },
	    //详情页索引
	    sendIndex({commit},index){
	    	// console.log(index);
	    	commit("SENDINDEX",index);
	    },
	    //获取账号信息
	    getUserdata({commit},obj){
	    	axios.post('/users/ajax_user',{
			    skip:obj.skip,
			    limit:obj.limit
		    }).then((result)=>{
		        let res = result.data;
		        commit("GETUSERDATA",res)
		        // console.log('获取下一页账号成功');
		    })
	    },
	    //获取当前得分页面
	    getScoredata({commit},obj){
	    	axios.post('/users/ajax_score',{
			    skip:obj.skip,
			    limit:obj.limit
		    }).then((result)=>{
		        let res = result.data;
		        commit("GETSCOREDATA",res)
		        // console.log('获取下一页得分成功');
		    })
	    },
	    getAtclss({commit},res){
	    	commit("ATCLSS",res);
	    }
	}
})
export default store;