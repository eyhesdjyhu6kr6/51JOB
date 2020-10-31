<template>

  <div id="home" class="page">
    <cover/>
    <!-- <a id="top"></a>  -->
    <home-header :isFixed="isFixed" :cityList="cityList" :isLogin = "isLogin" />
    <app-scroll class="content" :handleScroll="handleScrollAction" ref="scroll">
      <div class="main">
        <home-banner :data="banner"/>
        <home-recommend :isLogin = "isLogin"/>
        <position-list :data="isMorePosition"/>
        <home-friend :data="friend"/>
        <home-footer />
      </div>
    <!-- </div> -->
    </app-scroll>
    <div class="toTop" ref="toTop" @click="handleToTop">
      <span class="iconfont iconarrow-full-down"></span>
      <i>TOP</i>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Cover from '../components/home/cover';
import HomeHeader from '../components/home/home-header';
import HomeBanner from '../components/home/home-banner';
import HomeRecommend from '../components/home/home-recommend';
export default {
  components: {
    Cover,
    HomeHeader,
    HomeBanner,
    HomeRecommend,
  },
  data() {
    return {
      isFixed: false,
      toTopVal: false,
      isMorePosition: true,
      // isLogin: false,
      friend: [
            [
              {id: 1, name: '深圳销售人才招聘'},
              {id: 2, name: '深圳销售人才招聘'},
              {id: 3, name: '深圳销售人才招聘'},
            ],
            [
              {id: 1, name: '深圳销售人才招聘'},
              {id: 2, name: '深圳销售人才招聘'},
              {id: 3, name: '深圳销售人才招聘'},
              {id: 4, name: '深圳销售人才招聘'},
              {id: 5, name: '深圳销售人才招聘'},
              {id: 6, name: '深圳销售人才招聘'},
            ]
        ],
    }
  },

  methods: {
    handleScrollAction({y}){
      // console.log(y);
      if(y<0){
        this.isFixed = true;
      }else{
        this.isFixed = false;
      }
      if(y<-500){
        this.$refs.toTop.style = 'display: flex;'
      }
      else{
        this.$refs.toTop.style = 'display: none;'
      }
    },
    handleToTop(){
      this.$refs.scroll.toTop();
    },
  },
  watch: { 
    // 页面刷新
    // $state.loginLoading()
    isLogin(newVal) {
      if (newVal) {
        // if (this.destPath) {
        //   this.$router.push(this.destPath);
        //   this.$store.commit("setDestPath", null);
        // } else {
          this.$router.push("/");
        // }
      } else {
        this.$router.replace("/login");
      }
    },
  },
  computed: {
    ...mapState({
      banner: (state)=>state.home.banner,
      cityList: (state)=>state.home.cityList,
      isLogin: (state) => state.isLogin,
    }),
    // Login(){
    //   this.isLogin = this.$store.state.islogin;
    //   console.log(this.isLogin);
    // }
  },
  created() {
    this.$store.dispatch('home/requestBanner');
  },
}
</script>


<style lang="scss" scoped>
#home{
  // position: relative;
  width: 100%;
  height: 100%;
  // padding-bottom: 188px;
}
.content{
  width: 100%;
  height: 100%;
}
.main{
  padding-top: 60px;
  padding-bottom: 60px;
}
.toTop{
  position: fixed;
  right: 12px;
  bottom: 60px;
  width: 40px;
  height: 40px;
  background-color: #b2a99e;
  border-radius: 50%;
  font-size: 12px;
  color: #fff2e3;
  z-index: 3px;
  display: none;
  flex-direction: column;
  align-items: center;
  span{
    font-size: 20px;
  }
}
</style>