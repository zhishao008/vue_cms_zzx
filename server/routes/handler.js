var mongo=require("mongodb");
var MongoClient = mongo.MongoClient;
var assert = require('assert');
var url = require('url');
var host="localhost";
var port="27017";
var Urls = 'mongodb://localhost:27017/cms';
// classweb  ===> 自动创建一个


//add一条学生基本信息数据 
var add = function(db,collections,selector,fn){
  var collection = db.collection(collections);
  //建立得分信息表
  var createScore = db.collection('studentScore');
  createScore.save({_id:selector._id,name:selector.name,clss:selector.banji,pass:false,advise:'',totalscore:0});

  collection.save(selector,function(err,result){
    try{
        assert.equal(err,null)
        }catch(e){
      console.log(e);
      result = [];
    };
    fn(result);
    db.close();
  });
}
//添加用户
var adduser = function(db,collections,selector,fn){
  var collection = db.collection(collections);
  collection.save(selector,function(err,result){
    try{
        assert.equal(err,null)
        }catch(e){
      console.log(e);
      result = [];
    };
    fn(result);
    db.close();
  });
}
//辅导员打分
var instructorscore = function(db,collections,selector,fn){
  var collection = db.collection(collections);
  collection.update({_id:selector._id},{$set:{score1:selector.score1,score2:selector.score2,scoreteacher12:selector.scoreteacher}},function(err,result){
    try{
        assert.equal(err,null)
        }catch(e){
      console.log(e);
      result = [];
    };
    fn(result);
    db.close();
  });
}
//系办负责人打分
var directorscore = function(db,collections,selector,fn){
  var collection = db.collection(collections);
  collection.update({_id:selector._id},{$set:{score3:selector.score3,score4:selector.score4,scoreteacher34:selector.scoreteacher}},function(err,result){
    try{
        assert.equal(err,null)
        }catch(e){
      console.log(e);
      result = [];
    };
    fn(result);
    db.close();
  });
}
//评审小组 添加审核意见 和 是否通过 和获奖等级  0 未获奖 1 一等 2 二等 3 三等
var sendpass = function(db,collections,selector,fn){
  var collection = db.collection(collections);
  collection.update({_id:selector.id},{$set:{pass:true,advise:selector.advise,totalscore:selector.totalscore,award:selector.award}},function(err,result){
    try{
        assert.equal(err,null)
        }catch(e){
      console.log(e);
      result = [];
    };
    fn(result);
    db.close();
  });
}
//delete
var deletes = function(db,collections,selector,fn){
  var collection = db.collection(collections);
  collection.deleteOne(selector,function(err,result){
    try{
        assert.equal(err,null);
        assert.notStrictEqual(0,result.result.n);
        }catch(e){
      console.log(e);
      result.result = "";
    };
    
    fn( result.result ? [result.result] : []); //如果没报错且返回数据不是0，那么表示操作成功。
    db.close;
  });
};
//find
var find = function(db,collections,selector,fn){
  //collections="hashtable";
  var collection = db.collection(collections);
    collection.find(selector).toArray(function(err,result){
      //console.log(docs);
      try{
        assert.equal(err,null);
      }catch(e){
        console.log(e);
        result = [];
      }
      
      fn(result);
      db.close();
    });
}
//获取获奖人名单
var findpalcename = function(db,collections,selector,fn){
  //collections="hashtable";
  var collection = db.collection(collections);
    console.log(selector);
    collection.find({clss:selector.clss,pass:true}).sort({totalscore:-1}).limit(selector.limit).toArray(function(err,result){
      //console.log(docs);
      try{
        assert.equal(err,null);
      }catch(e){
        console.log(e);
        result = [];
      }
      console.log('查询结果是'+result);
      fn(result);
      db.close();
    });
}
//获取表中信息总条数
var page = function(db,collections,selector,fn){
  
  var collection = db.collection(collections);
  var count = 0;
  let limit = {};
  // console.log('我是传入的selector'+selector);
  if(selector.banji){
    limit = selector;
  }else{
    limit = {};
  }
  console.log('我是查询条件'+limit.banji);
  collection.find(limit).count({},function(err1,count1){
      try{
        assert.equal(err1,null);
      }catch(e){
        console.log(e);
      }
      count = count1;
  });
    collection.find(selector[0],selector[1]).toArray(function(err,result){
      try{
        assert.equal(err,null);
      }catch(e){
        console.log(e);
        result = [];
      }
      
      fn(result,count); //回掉函数可接收两个参数，查询的数据 和 总数据条数
      db.close();
    });
    

}
//不同辅导员查询对应班级学生信息分页查询
var inajax_page = function(db,collections,selector,fn){
  
  var collection = db.collection(collections);
    //先筛选，在排序，后限制条数
    collection.find({banji:selector.clss}).sort({xuehao:1}).skip(selector.skip).limit(selector.limit).toArray(function(err,result){
      try{
        assert.equal(err,null);
      }catch(e){
        console.log(e);
        result = [];
      }
      fn(result);
      db.close();
    });
}
//所有学生信息分页查询
var ajax_page = function(db,collections,selector,fn){
  
  var collection = db.collection(collections);
    collection.find().sort({xuehao:1}).skip(selector.skip).limit(selector.limit).toArray(function(err,result){
      try{
        assert.equal(err,null);
      }catch(e){
        console.log(e);
        result = [];
      }
      fn(result);
      db.close();
    });
}
//得分按照排序    没用
var scoreajax_page = function(db,collections,selector,fn){
  
  var collection = db.collection(collections);
    collection.find().sort({_id:1}).skip(selector.skip).limit(selector.limit).toArray(function(err,result){
      try{
        assert.equal(err,null);
      }catch(e){
        console.log(e);
        result = [];
      }
      fn(result);
      db.close();
    });
}
//update
var updates = function(db,collections,selector,fn){
  var collection = db.collection(collections);
  
  collection.updateOne(selector[0],selector[1],function(err,result){
      try{
        assert.equal(err,null);
        assert.notStrictEqual(0,result.result.n);
        }catch(e){
      console.log(e);
      result.result = "";
    };
    
    fn( result.result ? [result.result] : []); //如果没报错且返回数据不是0，那么表示操作成功。
    db.close();
  });

}
//更新学生贫困信息
var updatapush = function(db,collections,selector,fn){
  var collection = db.collection(collections);
  collection.update({'_id':selector.id},{$set:{'studentpour':selector}},function(err,result){
      try{
        assert.equal(err,null);
        assert.notStrictEqual(0,result.result.n);
        }catch(e){
      console.log(e);
      result.result = "";
    };
    
    fn( result.result ? [result.result] : []); //如果没报错且返回数据不是0，那么表示操作成功。
    db.close();
  });
}
//删除指定用户
var removeuser = function(db,collections,selector,fn){
  var collection = db.collection(collections);
  collection.remove(selector,function(err,result){
    try{
        assert.equal(err,null);
        assert.notStrictEqual(0,result.result.n);
        }catch(e){
      console.log(e);
      result.result = "";
    };
    
    fn( result.result ? [result.result] : []); //如果没报错且返回数据不是0，那么表示操作成功。
    db.close;
  });
};
//分配奖金等级
var givelevel = function(db,collections,selector,fn){
  var collection = db.collection(collections);
  console.log(selector);
  collection.update({clss:selector.clss},{$set:{award:0}},{multi:true},function(err,result){
    try{
        assert.equal(err,null)
        }catch(e){
      console.log(e);
      result = [];
    };
    // fn(result);
    // db.close();
  });
  collection.update({totalscore:{$gte:selector.threeplace}},{$set:{award:3}},{multi:true},function(err,result){
    try{
        assert.equal(err,null)
        }catch(e){
      console.log(e);
      result = [];
    };
    // fn(result);
    // db.close();
  });
  collection.update({totalscore:{$gte:selector.twoplace}},{$set:{award:2}},{multi:true},function(err,result){
    try{
        assert.equal(err,null)
        }catch(e){
      console.log(e);
      result = [];
    };
    // fn(result);
    // db.close();
  });
  collection.update({totalscore:{$gte:selector.oneplace}},{$set:{award:1}},{multi:true},function(err,result){
    try{
        assert.equal(err,null)
        }catch(e){
      console.log(e);
      result = [];
    };
    fn(result);
    db.close();
  });
};
//登录页面获取获奖人名单
var gethj = function(db,collections,selector,fn){
  //collections="hashtable";
  var collection = db.collection(collections);
    console.log(selector);
    collection.find({award:{$gte:1}}).sort({_id:-1}).toArray(function(err,result){
      //console.log(docs);
      try{
        assert.equal(err,null);
      }catch(e){
        console.log(e);
        result = [];
      }
      console.log('查询结果是'+result);
      fn(result);
      db.close();
    });
}
//学生界面获取自己的评审信息
var getmyaward = function(db,collections,selector,fn){
  //collections="hashtable";
  var collection = db.collection(collections);
    console.log(selector);
    collection.find(selector).toArray(function(err,result){
      //console.log(docs);
      try{
        assert.equal(err,null);
      }catch(e){
        console.log(e);
        result = [];
      }
      fn(result);
      db.close();
    });
}
//修改密码
var changepassword = function(db,collections,selector,fn){
  //collections="hashtable";
  var collection = db.collection(collections);
    console.log(selector.newpassword);
    collection.update({username:selector.id},{$set:{password:selector.new}},function(err,result){
      //console.log(docs);
      try{
        assert.equal(err,null);
      }catch(e){
        console.log(e);
        result = [];
      }
      fn(result);
      db.close();
    });
}
var methodType = {
    // 项目所需
  
  //   type ---> 不放在服务器上面
  //  放入到服务器
  //  请求---> 根据传入进来的请求 数据库操作
  //  req.query    req.body
  show:find, //后台部分
  add:add,
  update:updates,
  delete:deletes,
  updatePwd:updates,
  //portal部分
  showCourse:find,
  register:add,


  login:find,  //登录
  stucount:page, //分页获取学生信息条数
  scorecount:page, //分页获取学生信息条数
  usercount:page, //分页获取账号信息条数
  culclss:page, //获取所有账号信息
  inajax_page:inajax_page, //辅导员查看学生信息分页
  ajax_page:ajax_page, //系办查看所有学生信息分页
  ajax_user:ajax_page, //账号信息分页
  ajax_score:scoreajax_page, //账号信息分页

  studentinfo:add,//学生基本信息
  studentpour:updatapush,//学生贫困信息
  instructorscore:instructorscore,  //辅导员打分
  directorscore:directorscore,  //系办负责人打分
  sendpass:sendpass,  //评审小组审核通过 和 评审意见
  adduser:adduser, //添加用户
  adduserfind:find,// 添加用户时验证
  removeuser:deletes,// 删除用户
  removeplace:deletes,  //删除班级指标
  addplace:adduser,   //添加班级指标信息
  addplacefind:find,// 添加指标时验证
  getclssplace:find,  //获取班级指标信息
  getplacename:findpalcename,  //获取获奖人名单
  givelevel:givelevel, //分配各班获奖名单等级
  gethj:gethj,   //获取获奖人信息
  getmyaward:getmyaward,   //获取学生自己的评审结果
  changepassword:changepassword   //修改密码
};
//主逻辑    服务器  ， 请求    --》 
// req.route.path ==》 防止前端的请求 直接操作你的数据库
module.exports = function(req,res,collections,selector,fn){
  MongoClient.connect(Urls, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    //显示是哪种操作
    // console.log(req.route.path.substr(1));
    // 根据 请求的地址来确定是什么操作  （为了安全，避免前端直接通过请求url操作数据库）
    methodType[req.route.path.substr(1)](db,collections,selector,fn);
  
    db.close();
  });

};