import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import Student from '@/components/student'
import Teacher from '@/components/teacher'
import Review from '@/components/review'
import Admin from '@/components/admin'
import Stu1 from '@/components/stu1'
// import Stu2 from '@/components/stu2'
// import Stu3 from '@/components/stu3'
// import Stu4 from '@/components/stu4'
import Tea1 from '@/components/tea1'
// import Tea2 from '@/components/tea2'
import Rev1 from '@/components/rev1'
// import Rev2 from '@/components/rev2'
import Adm1 from '@/components/adm1'
// import Adm2 from '@/components/adm2'
// import Adm3 from '@/components/adm3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      // component: Login
      component: resolve => require(['@/components/login.vue'], resolve)
    },
    {
      path: '/student',
      component: Student,
      children:[
            {
              path: 'stu1', //课程列表
              // component: Stu1
              component: resolve => require(['@/components/stu1.vue'], resolve)
            },{
              path: 'stu2', //编辑课程
              // component: Stu2
              component: resolve => require(['@/components/stu2.vue'], resolve)
            },{
              path: 'stu3', //首页统计
              // component: Stu3
              component: resolve => require(['@/components/stu3.vue'], resolve)
            },{
              path: 'stu4', //后台用户
              // component: Stu4
              component: resolve => require(['@/components/stu4.vue'], resolve)
            },
            {
               path: '/',   //默认路由
               redirect: 'stu1'
            }
        ]
    },
    {
      path: '/teacher',
      component: Teacher,
      children:[
            {
              path: 'tea1', 
              // component: Tea1
              component: resolve => require(['@/components/tea1.vue'], resolve)
            },{
              path: 'tea2',
              // component: Tea2
              component: resolve => require(['@/components/tea2.vue'], resolve)
            },
            {
               path: '/',
               redirect: 'tea1'
            }
        ]
    },
    {
      path: '/admin',
      component: Admin,
      children:[
            {
              path: 'adm1', 
              // component: Adm1
              component: resolve => require(['@/components/adm1.vue'], resolve)
            },{
              path: 'adm2',
              // component: Adm2
              component: resolve => require(['@/components/adm2.vue'], resolve)
            },{
              path: 'adm3',
              // component: Adm3
              component: resolve => require(['@/components/adm3.vue'], resolve)
            },
            {
               path: '/',
               redirect: 'adm1'
            }
        ]
    },
    {
      path: '/review',
      component: Review,
      children:[
            {
              path: 'rev1', 
              // component: Rev1
              component: resolve => require(['@/components/rev1.vue'], resolve)
            },{
              path: 'rev2',
              // component: Rev2
              component: resolve => require(['@/components/rev2.vue'], resolve)
            },
            {
               path: '/',
               redirect: 'rev1'
            }
        ]
    }
  ]
})
