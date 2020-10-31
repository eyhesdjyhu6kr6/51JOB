<template>
  <div id="search" class="page subpage">
    <!-- <div class="head">
      <p class="head-position" @click="goLocation"><span class="city">{{city}}</span><van-icon name="arrow-down" size="14px" /></p>
      <a href="./home" class="head-img">
        <img src="//img01.51jobcdn.com/im/m/logo.png" alt="">
      </a>
      <a href="./mine" class="head-ico">
      </a>
    </div> -->

    <search-top/>

    <!-- <div class="search-tabs">
      <p v-for="item in searchTabs" :key="item.name"
      @click="searchSon(item)"
      :class="{active:selected==item.id}">
        {{item.name}}
      </p>
    </div> -->
    

    
      <router-view/>
    

  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      selected: "",
      searchTabs: [
        { path: "/search_job", name: "职位搜索", id: "search_job" },
        { path: "/search_nearby", name: "附近职位", id: "search_nearby" },
        { path: "/search_applicat", name: "申请记录", id: "search_applicat" }
      ]
    };
  },
  methods: {
    searchSon(item) {
      if(item.id!==this.selected){
      this.$router.push({
        name: item.id
      });}
      this.selected = item.id;
    },
    goLocation(){
      this.$router.push({
        name: 'location'
      });
    },
  },
  
};
</script>

<style lang="scss" scoped>
#search{
 background:  #efefef;
 font-size: 14px;
//  position: abso;
}
.head {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  .head-position{
    margin-left: 20px;
    font-size: 14px;
    color: #ff7e3e;
    >span{
      margin-right: 5px
    }
  }
  .head-img {
    position: relative;
    left: -5%;
    img {
      width: 68px;
    }
  }
  .head-ico {
    width: 28px;
  
    height: 28px;
    background-image: url(../../public/imgs/personal.png);
    background-size: auto 30px;
    margin-right: 20px
  }
}
.search-tabs {
  padding-top: 38px;
  background: white;
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
  p {
    border-bottom: 2px solid transparent;
    height: 25px;
  }
  .active {
    font-weight: bold;
    color: #ff7e3e;
    border-bottom-color: #ff7e3e;
  }
}
.van-icon {
    top: -8px;
    left: -10px;
}
.city{
  width: 50px;
  height: 28px;
  line-height: 28px;
  overflow: hidden;
 white-space: nowrap;text-overflow: ellipsis;
  display: inline-block
}
</style>