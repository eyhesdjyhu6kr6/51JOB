<template>
  <div id="step">
    <div class="head">
      <p class="title">创建简历</p>
      <div class="guide">
          <div v-for="item in datas" :key="item.num"
          :class="{active:number==item.num}">
            <p>{{item.num}}</p>
            <span>{{item.msg}}</span>
          </div>
      </div>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
    
  </div>
</template>

<script>
export default {
  data(){
    return{
      datas:[
        {num:1,msg:'基本信息'},
        {num:2,msg:'求职意向'},
        {num:3,msg:'教育经历'}
      ]
    }
  },
  computed:{number(){return this.$store.state.num}}
}
</script>

<style lang="scss" scoped>
.head{
  background: url(//img01.51jobcdn.com/im/m/bg_shead.png),linear-gradient(to right,#ff773e,#ffbb3e);
  background-size: 100%;
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    letter-spacing: 2px;
    text-align: center;
}
 .guide {
    height: 86px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding:  0 60px;
    color: #fff;
    font-size: 14px;
    .active{
      opacity: 1;
      p{
        background: #fff;
        color:#ff773e
      }
      span{
        font-weight: bold;
      }
    }
    >div{
    opacity: 0.6;
    }
    p{
     width: 38px;
    height: 38px;
    line-height: 38px;
    font-size: 26px;
    position: relative;
    left: 8px;
    top: -10px;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    border: #fff 1px solid;
    }
}
}

</style>