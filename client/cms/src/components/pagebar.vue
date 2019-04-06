<template>
  <div>
    <ul class="pagination" >
            <li v-show="current != 1" @click="current-- && goto(current--)" ><a href="#">上一页</a></li>
            <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
              <a href="#" >{{index}}</a>
            </li>
            <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><a href="#" >下一页</a></li>
            <li><a href="#">共{{count}}条记录</a></li>
            <li><a href="#">共{{Math.ceil(this.count/this.showItem)}}页</a></li>
        </ul>
  </div>
</template>
<script>
  import {mapActions,mapState} from 'vuex'
  export default{
    data(){
      return{
        current:1,   //当前页
        showItem:5,   //展示几条
      }
    },
    props:{
      count:{
        type:Number
      }
    },
    computed:{
      ...mapState([
        'atclss'
      ]),
      allpage(){
          return Math.ceil(this.count/this.showItem);
      },
      skip(){
       return (this.current - 1)*this.showItem;
      },
      limit(){
       return this.showItem;
      },
      pages:function(){
        var pag = [];
          if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
               //总页数和要显示的条数那个大就显示多少条
               var i = Math.min(this.showItem,this.allpage);
               while(i){
                   pag.unshift(i--);
               }
           }else{ //当前页数大于显示页数了
               var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                   i = this.showItem;
               if( middle >  (this.allpage - this.showItem)  ){
                   middle = (this.allpage - this.showItem) + 1
               }
               while(i--){
                   pag.push( middle++ );
               }
           }
         return pag;
        }
    },
    methods:{
      ...mapActions([
          'getStudata',
          'ingetStudata',
          'getUserdata',
          'getScoredata'
      ]),
      goto:function(index){
        if(index == this.current) return;
          this.current = index;
          let str = sessionStorage.getItem('role');
          
          switch(str){
              case 'instructor':
                //辅导员
                let clss = sessionStorage.getItem('clss');
                  this.ingetStudata({skip:this.skip,limit:this.limit,atclss:clss});
                break;
                //系办负责人
              case 'director':
                console.log(this.atclss);
                console.log(typeof(this.atclss));
                if(this.atclss == '0'){
                  this.getStudata({skip:this.skip,limit:this.limit});
                }else{
                  this.ingetStudata({skip:this.skip,limit:this.limit,atclss:this.atclss});
                }
                
                break;
                //评审小组
              case 'group':
                this.getScoredata({skip:this.skip,limit:this.limit});
                this.getStudata({skip:this.skip,limit:this.limit});
                break;
                //管理员
              case 'admin':
                this.getUserdata({skip:this.skip,limit:this.limit});
                break;
          }
      },
    },
    created(){
      // 获取当前页信息
      let strs = sessionStorage.getItem('role');
      switch(strs){
         case 'instructor':
            let clss = sessionStorage.getItem('clss');
            this.$store.dispatch('ingetStudata',{skip:this.skip,limit:this.limit,atclss:clss});
            break;
          case 'director':
            this.$store.dispatch('getStudata',{skip:this.skip,limit:this.limit});
            break;
          case 'group':
            this.$store.dispatch('getScoredata',{skip:this.skip,limit:this.limit});
            this.$store.dispatch('getStudata',{skip:this.skip,limit:this.limit});
            break;
          case 'admin':
            this.$store.dispatch('getUserdata',{skip:this.skip,limit:this.limit});
            break;
      }
      //向父组件
      // this.$emit('fn',[this.current,this.showItem]);
    }
  }
</script>

<style scoped>
.pagination {
        position: relative;
        margin:10px auto;
      }
      .pagination li{
        display: inline-block;
        margin:0 5px;
      }
      .pagination li a{
        padding:.5rem 1rem;
        display:inline-block;
        border:1px solid #ddd;
        background:#fff;
        color:#0E90D2;
      }
      .pagination li a:hover{
        background:#eee;
      }
      .pagination li.active a{
        background:#0E90D2;
        color:#fff;
      }
  </style>