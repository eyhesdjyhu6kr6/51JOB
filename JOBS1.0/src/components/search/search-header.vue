<template>
<div class="tosearch">
  <div class="top">
    <!-- 搜索框 -->
    <div class="in">
      <!-- <form action=""> -->
        <div>
            <input type="search" name="" v-model="value" placeholder="请输入职位名" @change="Search">
        </div>
      
      <!-- </form> -->
      <span class="tab">全文<i class=" iconfont iconfanhui-copy-copy-copy-copy" ></i></span>
      <router-link to="/home" class="cancel">取消</router-link>
      <!-- <span ></span> -->
      <!-- 全文点击显示隐藏 -->
      <div class="tabfix">
        <span value="1"><i class="iconfont iconquanwen "></i>全文</span>
        <span value="2"><i class="iconfont icongongsi "></i>公司</span>
      </div>
    </div>
    <a href="javascript;" class="more">
      <span class="orange" ><i class="iconfont iconsousuo1"></i>高级搜索</span>
      <span> &nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;搜索更为精准</span>
    </a>
   </div>
   <!-- 渲染搜索的组件 -->
   <div class="list-box">
      <van-list class="list" v-if="ishow" >
        <van-cell class="list-item" v-for="item in list" :key="item.id" @click="Enter"><i class="iconfont iconsousuo1"></i>{{item}}</van-cell>       
      </van-list>
   </div>
 
 <!-- 大盒子部分 -->
  <div class="Sbox" v-if="boxshow">
   <!-- 搜索记录 -->
    <div class="sbox">
      <div class="stit">搜索记录 <i class="iconfont iconshanchu del" @click="empty">删除</i></div>
      <div class="shis">
        <a href="javascript:;" v-for="item in history" :key="item" @click="Onsearch(item)">{{item}}</a>
      </div>
    </div>
    <!-- 猜你想找 -->
    <div class="sbox">
      <div class="stit">猜你想找</div>
      <div class="stab">
        <a href="javascript:;" >水电工程师</a>
        <a href="javascript:;">工程管理测试设计师</a>
        <a href="javascript:;" >水电工程师</a>
        <a href="javascript:;" >工程师</a>
        <a href="javascript:;" >java后端工程师</a>
        <a href="javascript:;">web前端开发工程师</a>
      </div>
    </div>
    <!-- 个人搜索器 -->
    <div class="sbox">
     <div class="stit">个人搜索器</div>
     <div class="snone">
       <span>一键搜索，超便捷</span>
       <div class="btnbox">
         <a href="" class="btn">创造您的专属搜索器</a>
       </div>
    </div>
    </div>
  </div>
</div>
</template>

<script>
import { Search } from 'vant';
export default {
  data(){
    return{
      ishow:false,
      boxshow:true,
      value:'',
      // 定义响应回来的数组为空数组
      list:[],
      // 定义一个历史缓存空数组，
      history:[],


    }
  },
  created(){
  },
  watch:{
   value(){
     Search();

    }

  },
  methods:{
    Search(){
    //  console.log(this.list)
       // 判断输入的内容,为空return出去
     if(this.value === '')
     return this.$toast('请输入正确的关键字');
      // 发送搜索请求
     this.$axios.get('/api/app/workname',{
        params:{
          keyword:this.value
        }
      }).then((res)=>{
        if(res.data.code == 0){
          console.log( res.data.data)
          this.list = res.data.data.map(item=>item.work_name);          this.ishow = true;
          this. boxshow =false;
          console.log(this.list)
          console.log('对了');
        }
      }).catch((err)=>{
        console.log(err)
      })
      console.log(this.history)
      // 结构判断
      this.history = this.history.filter(itme => itme !== this.value)
      this.history.unshift(this.value);
      // 讲这个关键字添加到history前面
      localStorage.setItem('history',JSON.stringify(this.value));
      // 把这个关键字存到缓冲中去 转成字符串
      
   },
   Onsearch(item){
     this.value =item;
     console.log(this.value)
     this.Search();
   },
    empty(){
      this.$toast.success('清空历史搜索成功');
      localStorage.removeItem('history');
      this.history = [];
    },
    Enter(){
    window.location.href='https:\\www.baidu.com'
    }

  }
}

</script>

<style lang='scss' scoped>
.tosearch{
  width: 100%;
  height: 100%;
  padding: 0 16px;
  
}
 .top{
  width: 100%;
  // background: red;
  height: 96px;
  // background-color: #fff;
  .in{
    //  background-color: #fff;
    width: 100%;
    height: 30px;
    position: fixed;
    font-size: 14px;
    top: 0;
    padding: 10px 60px 0 16px;
    box-sizing: border-box;
    left: 50%;
    transform: translateX(-50%);
    // form{
      
      input{
        width:299px;
        width: 100%;
        height: 30px;
        text-indent: 68px;
        background-color: #eee;
        border: 4px solid #eee;
        border-radius: 32px;
      }
    // }
    .cancel{
      display: block;
      position: absolute;
      top: 20px;
      right: 16px;
      color: #222222;
      width: 28px;
      height: 20px;
      font-size: 14px;
    }
    .tab{
      position: absolute;
      top: 18px;
      left: 16px;
      z-index: 2;
      width: 68px;
      text-align: center;
      text-indent: -10px;
      .iconfont{
        font-size: 10px;
        font-weight: bold;
        margin-left: 5px;
      }
    }
    .tabfix{
      position: absolute;
      top: 50px;
      left: 16px;
      z-index: 2;
      display: none;
      width: 88px;
      color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 4px rgba(255,126,62);
      background-color: rgba(255,126,62,.95);
      .orange{
        display: block;
        height: 20px;
        line-height: 20px;
        font-weight: 700;
        text-align: center;
        padding: 8px 8px;
        
      }
    }
    
  }
  .more{
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 1;
    width: 100%;
    max-width: 500px;
    line-height: 50px;
    font-size: 12px;
    color: #999;
    padding: 0 16px;
    background-color: #fff;
    box-sizing: border-box;
    .orange{
      position: relative;
      font-size: 14px;
      font-weight: 700;
      color: #ff7e3e;
      padding-left: 40px;
      .iconfont{
        left: 16px;
        top: 0;
        font-size: 14px;
        font-weight: 700;
        margin-right: 8px;
        
       

      }
    }

  }
}
.sbox{
  margin-top: 8px;
  background-color: #fff;
  .stit{
    position: relative;
    line-height: 48px;
    padding: 0 16px;
    font-size: 14px;
    font-weight: bold;
    .del{
      position:absolute;
      font-size: 14px;
      right:30px

    }
  }
  .shis{
    a{
      position: relative;
      display: block;
      line-height: 24px;
      color: #222;
      padding: 12px 16px;
      font-size: 14px;
     font-family: PingFang SC,microsoft yahei;
    }

  }
  .stab{
    max-height: 126px;
    overflow: hidden;
    padding: 0 8px 0 16px;
    a{
    float: left;
    max-width: 100%;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    color: #666;
    margin: 0 8px 14px 0;
    padding: 0 12px;
    background-color: #f5f5f5;
    border-radius: 28px;
    }
  }
  .snone{
    line-height: 30px;
    color: #666;
    text-align: center;
    padding: 10px 0 50px;
    span{
      font-size: 14px;
      font-family: PingFang SC,microsoft yahei;
    }
    .btnbox{
      padding-top: 10px;
      .btn{
        display: inline-block;
        min-width: 40px;
        height: 36px;
        line-height: 34px;
        font-size: 16px;
        color: #ff7e3e;
        text-align: center;
        padding: 0 20px;
        -webkit-appearance: none;
        border: 1px solid #ff7e3e;
      }
    }
  }
}
// 列表
.list{
   min-height: 500px;
  .list-item{
      position: relative;
      height: 25px;
      line-height: 25px;
      padding: 0px 16px 2px 30px;
      font-size: 14px;
      .iconfont{
          width: 14px;
          height: 14px;
          color: red;
          z-index:10000;
          padding-right: 10px;
          
        }
  }

}




</style>
