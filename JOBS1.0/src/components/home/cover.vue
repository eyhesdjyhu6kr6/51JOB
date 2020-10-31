<template>
  <div id="cover" class="page subpage" ref="cover">
    <div class="content">
      <img src="../../../public/images/home/lead_bg.png" alt="cover" class="bg">
      <div class="main">
        <p>先登录，再浏览</p>
        <h3>获取专属职位</h3>
        <div class="line-box">
          <div class="line"></div>
          <p>已有账号请登录</p>
        </div>
        <div class="btn">
          <van-button plain type="primary" color="#ff7e3e" to="/login" @click="hide">登录</van-button>
          <van-button type="primary" color="#ff7e3e" to="/register" @click="hide">注册</van-button>
        </div>
      </div>
      <div class="iconfont iconguanbi close" @click="hide"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    hide(){
      this.$refs.cover.style = 'display: none;';
      localStorage.setItem('loginpop', new Date());
    }
  },
  mounted() {
    // localStorage.getItem('loginpop');
    // console.log(localStorage.key('loginpop'));
    if(localStorage.key('loginpop') === 'loginpop'){
      this.$refs.cover.style = 'display: none;';
    }
  }
}
</script>

<style lang="scss" scoped>
#cover{
  background-color: rgba($color: #000000, $alpha: 0.4);
}
.content{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 36.5%;
}
.bg, .main{
  width: 64%;
}
.main{
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
  border-radius: 0px 0px 20px 20px;
  letter-spacing: 3px;
  margin-top: -1px;
  p{
    font-size: 16px;
    padding-top: 10px;
    line-height: 20px;
  }
  h3{
    line-height: 40px;
    font-size: 24px;
    color: #222;
  }
  .line-box{
    color: #999;
    margin: 8px auto 10px;
    letter-spacing: 0px;
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 30px;
    p{
      position: absolute;
      top: 16%;
      background-color: #fff;
      padding: 0 10px;
      font-size: 13px;
    }
    .line{
      content: '';
      width: 58%;
      height: 1px;
      background-color: #ddd;
      position: absolute;
      bottom: 50%;
    }
  }
  .btn{
    padding-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    .van-button{
      width: 40%;
      border-radius: 4px;
      font-size: 16px;
    }
  }
}
.close{
  font-size: 38px;
  padding-top: 24px;
  color: #ccc;
}
</style>