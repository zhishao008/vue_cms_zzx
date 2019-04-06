var express = require('express');
var router = express.Router();
var handler = require('./handler.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//登录验证
router.post('/login', function(req, res, next) {
    var password = req.body.password;
    handler(req, res, "users", {username: req.body.username},function(data){
        console.log(data);
        if(data.length===0){
            res.end('{"err":"账号错误，请咨询管理员！"}');
        }else if(data[0].password !== password){
            res.end('{"err":"密码不正确"}');
        }else if(req.body.role !== data[0].role){
            res.end('{"err":"请选择正确的身份"}');
        }else if(data.length!==0&&data[0].password===password){
            req.session.username = req.body.username;
            req.session.password = password;
            res.send({
                status:true,
                role:data[0].role,
                name:data[0].name,
                id:data[0].username,
                clss:data[0].clss,
            });
        }
        
    });

});

//学生提交基本信息
router.post('/studentinfo', function(req, res, next) {
    handler(req,res,'studentInfo',req.body,function(data){
        // console.log(data.result);
        res.send(data.result);  
    })
});
//学生提交贫困信息
router.post('/studentpour', function(req, res, next) {
    // console.log(shuju.id);
    handler(req,res,'studentInfo',req.body,function(data){
        // console.log(data[0]);   
        res.send(data); 
    })
});
// 系办查看页查询学生总信息数
router.post('/stucount', function(req, res, next) {
    handler(req,res,'studentInfo',req.body,function(data,count){
        console.log('学生信息条数为：'+count+'条');
        res.send({count:count}); 
    })
});
// 管理员查看页查询账号总信息数
router.post('/usercount', function(req, res, next) {
    handler(req,res,'users','',function(data,count){
        console.log('账号信息条数为：'+count+'条');
        res.send({count:count}); 
    })
});
// 辅导员查询对应班级学生信息，查当前页的数据
router.post('/inajax_page', function(req, res, next) {
    handler(req,res,'studentInfo',req.body,function(data){
        // console.log(data);
        res.send(data); 
    })
});
// 查看所有学生信息，查当前页的数据
router.post('/ajax_page', function(req, res, next) {
    handler(req,res,'studentInfo',req.body,function(data){
        console.log(data);
        res.send(data); 
    })
});

//辅导员打分
router.post('/instructorscore', function(req, res, next) {
    handler(req,res,'studentScore',req.body,function(data){
        // console.log(data.result);
        // console.log(req.body);
        res.send(data.result); 
    })
});
//系办负责人打分
router.post('/directorscore', function(req, res, next) {
    handler(req,res,'studentScore',req.body,function(data){
        // console.log(data.result);
        res.send(data.result); 
    })
});
// 管理员账号，查当前页的数据
router.post('/ajax_user', function(req, res, next) {
    handler(req,res,'users',req.body,function(data){
        // console.log(data);
        // console.log(req.body);
        res.send(data); 
    })
});

//添加用户
router.post('/adduser', function(req, res, next) {
    handler(req,res,'users',req.body,function(data){
        // console.log(data.result);
        res.send(data.result);  
    })
});
//添加班级指标信息
router.post('/addplace', function(req, res, next) {
    handler(req,res,'clssPlace',req.body,function(data){
        // console.log(data.result);
        res.send(data.result);  
    })
});
//添加用户验证
router.post('/adduserfind', function(req, res, next) {
    handler(req,res,'users',{username:req.body.username},function(data){
        if(data.length === 0){
            res.send(true);
        }else{
            res.send(false);
        } 
    })
});
//添加指标验证
router.post('/addplacefind', function(req, res, next) {
    handler(req,res,'clssPlace',{_id:req.body.clss},function(data){
        if(data.length === 0){
            res.send(true);
        }else{
            res.send(false);
        } 
    })
});
//删除用户
router.post('/removeuser', function(req, res, next) {
    handler(req,res,'users',{username:req.body.username},function(data){
        // console.log(data);
        res.send(data);
    })
});
// 评审小组查询得分总信息数
router.post('/scorecount', function(req, res, next) {
    handler(req,res,'studentScore','',function(data,count){
        console.log('账号信息条数为：'+count+'条');
        res.send({count:count}); 
    })
});
// 评审小组账号，查当前页得分的数据
router.post('/ajax_score', function(req, res, next) {
    handler(req,res,'studentScore',req.body,function(data){
        // console.log(data);
        // console.log(req.body);
        res.send(data); 
    })
});
// 评审小组审核打分是否通过,此时要将得分计算出总分来进行排序
router.post('/sendpass', function(req, res, next) {
    handler(req,res,'studentScore',req.body,function(data){
        // console.log(data);
        res.send(data); 
    })
});
//计算班级
router.post('/culclss', function(req, res, next) {
    handler(req,res,'users',req.body,function(data){
        let arr = [];
        let obj = {};
        for(i in data){
            if(!obj[data[i].clss]){
                arr.push(data[i].clss);
                obj[data[i].clss] = 1;
            }
        }
        // console.log(arr);
        res.send(arr); 
    })
});
// 获取班级指标信息
router.post('/getclssplace', function(req, res, next) {
    handler(req,res,'clssPlace',req.body,function(data){
        // console.log(data);
        res.send(data); 
    })
});
//删除用户
router.post('/removeplace', function(req, res, next) {
    handler(req,res,'clssPlace',{_id:req.body.id},function(data){
        // console.log(data);
        res.send(data);
    })
});

//获取获奖名单
router.post('/getplacename', function(req, res, next) {
    handler(req,res,'studentScore',req.body,function(data){
        // console.log(data);
        res.send(data);
    })
});
//分配奖金等级
router.post('/givelevel', function(req, res, next) {
    handler(req,res,'studentScore',req.body,function(data){
        // console.log(data);
        res.send(data);
    })
});
//登录页面获取名单
router.post('/gethj', function(req, res, next) {
    handler(req,res,'studentScore',req.body,function(data){
        // console.log(data);
        res.send(data);
    })
});
//学生登录获取自己的评审结果
router.post('/getmyaward', function(req, res, next) {
    handler(req,res,'studentScore',req.body,function(data){
        // console.log(data);
        res.send(data);
    })
});
//修改密码
router.post('/changepassword', function(req, res, next) {
    handler(req,res,'users',req.body,function(data){
        // console.log(data);
        res.send(data);
    })
});
module.exports = router;
