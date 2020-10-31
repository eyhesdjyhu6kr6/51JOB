<template>
  <div id="location">
    <div class="head">
        <van-icon name="arrow-left" @click="$router.back()"/>
        地区选择
    </div>
    <div class="body">
        <van-index-bar>
            <p v-for="(item,index) in cityList" :key="index">
            <van-index-anchor  :index="item.idx" />
            <van-cell v-for="(i,v) in item.cities" :key="v" 
            :title="i.name" @click="change(i.name)"/>
            </p>
        </van-index-bar>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { IndexBar, IndexAnchor } from "vant";
Vue.use(IndexBar);
Vue.use(IndexAnchor);
import {mapGetters,mapActions} from 'vuex'
import threeVue from '../register/three.vue';
export default {
  data() {
    return {
      cityList: []
    };
  },
  created() {
    this.$axios.get("/api/app/lunbo").then(res => {
      this.cityList = res.data.data.cityList.cityList;
      console.log(this.cityList);
      //无 i o u v
    });
  },
  methods:{
    //   ...mapActions(['change'])
    change(city){
      console.log(city);
        localStorage.setItem('city',city);
        this.$store.dispatch('change',city);
        this.$router.back()
    }
    
  },
  computed:{
      ...mapGetters(['city'])
      }

};
</script>

<style lang="scss" scoped>
#location {
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #fff;
  margin-bottom: 100px
}
.head {
  position: fixed !important;
  width: 100%;
  top: 0;
  background-color: #fff;
  left: 0;
  z-index: 8;
  line-height: 45px;
  text-align: center;
  font-size: 16px;
  -webkit-box-shadow: 0 0 3px 2px #ccc;
  .van-icon {
    left: -35%;
  }
}
.body {
  position: relative;
  top: 45px;
  overflow: hidden;
   background-color: #fff;
  width: 100%;
}
</style>