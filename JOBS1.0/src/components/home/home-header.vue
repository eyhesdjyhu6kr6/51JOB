<template>
  <div class="home-header" :class="['home-header', {fixed: isFixed}]">
    <header class="header">
      <div class="logo">
        <img src="../../../public/images/home/logo.png" alt="logo">
      </div>
      <div class="content_box">
        <div class="content">
          <div class="location" @click="goLocation">
            <h5>深圳</h5>
            <span class="iconfont iconbeifen"></span>
          </div>
          <router-link class="search" to="/search"> 
            <span class="iconfont iconsousuo1"></span>
            <i>输入职位名</i>
          </router-link>
        </div>        
      </div>
      <div class="mine">
        <router-link to="/mine" class="mine_a" v-if="isLogin"></router-link>
        <router-link to="/login" class="login_a" v-else>登录</router-link>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // isMine: false,
    }
  },
  props:{
    isFixed: {
      type: Boolean,
    },
    cityList: Array,
    isLogin: {
      type:[Boolean,String],
    },
  },
  methods: {
    goLocation(){
      this.$router.push('/search/location');
    }
  },
  created() {
    // this.isMine = this.$store.state.username != '';
  },
}
</script>

<style lang="scss" scoped>
.home-header{
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
}
.fixed{
  box-shadow: 0 0 4px 4px rgba(241,242,243,.7);
}
.header{
  width: 100%;
  height: 60px;
  background-color: #fff;
  position: relative;
  display: flex;
  align-items: center;
  .logo{
    width: 25%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 68px;
    }
  }
  .content_box{
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    .content{
      margin: auto;
      width: 94%;
      height: 20px;
      background-color: #eee;
      border: 6px solid #eee;
      border-radius: 20px;
      display: flex;
      .location{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 75px;
        height: 20px;
        border-right: 1px solid #999;
        span{
          font-size: 12px;
          color: #666;
        } 
        h5{
          font-size: 14px;
          color: #222;
          text-align: center;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          padding-right: 8px;
        }
      }
      
      .search{
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        color: #999;
        span{
          font-size: 16px;
          font-weight: 900;
        }
        i{
          font-size: 14px;
          padding-left: 8px;
        }
      }
    }
  }
  .mine{
    width: 15%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .mine_a{
      width: 28px;
      height: 28px;
      background: url(../../../public/images/home/my.png) no-repeat;
      overflow: hidden;
      background-size: cover;
    }
    .login_a{
      width: 28px;
      height: 28px;
      line-height: 28px;
      font-size: 14px;
      color: #ff7e3e;
    }
  }
}
</style>