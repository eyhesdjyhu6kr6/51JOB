<template>
  <div id="app">
      <keep-alive>
        <router-view :key="this.$route.path"/>
      </keep-alive>
    <!-- 底部导航标签 -->
    <div class="tabs">
      <router-link v-for="item in tabs" :key="item.id" 
      :to='item.path' class="tabs-item">
        <span :class="item.icon" class="tabs-icon"></span>
        <span class="text">{{item.name}}</span>
      </router-link>
     
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      tabs:[
        {path:'/home',id:'home',name:'首页', icon: 'iconfont iconshouye'},
        {path:'/resume',id:'resume',name:'简历', icon: 'iconfont iconjianli1'},
        {path:'/search/search_applicat',id:'search',name:'申请记录', icon: 'iconfont iconshenqing'},
        {path:'/mine',id:'mine',name:'我的', icon: 'iconfont iconme'},
        {path:'/download',id:'download',name:'App下载', icon: 'iconfont iconxiazai'}
      ]
    }
  },
  mounted(){
    window.addEventListener('unload',this.saveState)
  },
  methods:{
    saveState(){
      localStorage.setItem('city',this.$store.state.city)
    }
  }
  
}
</script>

<style lang="scss">
.page {
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0;
  bottom: 60px;
  background-color: #fafafa;
  
  &.subpage {
    bottom: 0;
    z-index: 100;
  }
}
.tabs{
  width: 100%;
  height: 52px;
  display: flex;
  background-color: #fff;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #e6e6e6;
  box-sizing: border-box;
  .tabs-item{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .tabs-icon{
      font-size: 20px;
      color: #707070;
    }
    .text{
      padding-top: 4px;
      font-size: 12px;
      color: #5d656b;
    }
    &.router-link-active{
      span{
        font-weight: 700;
        color: #ff7e3e;
      }
    }
  }
  
}

</style>
