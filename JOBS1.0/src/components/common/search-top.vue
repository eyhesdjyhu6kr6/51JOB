<template>
  <div class="search-top">
    <div class="head">
      <router-link to="/search/location">
        <div class="head-position">
          <p class="city"><span>{{city}}</span></p>
          <van-icon name="arrow-down" size="14px" />
        </div>
      </router-link>
      <router-link to="/home" class="head-img">
        <img src="//img01.51jobcdn.com/im/m/logo.png" alt="">
      </router-link>
      <router-link to="/mine" class="head-ico">
      </router-link>
    </div>
    <div class="search-tabs">
      <router-link v-for="item in searchTabs" :key="item.name"
      :to="item.path"
      >
        {{item.name}}
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
      return {
        selected: "",
        searchTabs: [
          { path: "/search/search_job", name: "职位搜索", id: "search_job" },
          { path: "/search/search_nearby", name: "附近职位", id: "search_nearby" },
          { path: "/search/search_applicat", name: "申请记录", id: "search_applicat" }
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
      }
    },
    computed:{
      // ...mapState(['city'])
      ...mapState({
        city: (state)=>state.city,
      })
  }
}
</script>

<style lang="scss" scoped>
.search-top{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fafafa;
  padding-bottom: 8px;
}
.head {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  .head-position {
    // flex: 1;
    margin-left: 20px;
    font-size: 14px;
    color: #ff7e3e;
    display: flex;
    >.city {
      width: 56px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-right: 5px;
    }
  }
  .head-img {
    // flex: 1;
    width: 30%;
    img {
      width: 66px;
    }
  }
  .head-ico {
    
    width: 28px;
    height: 28px;
    background-image: url(../../../public/images/home/my.png);
    background-size: auto 30px;
    margin-right: 20px;
    margin-top: 2px;
  }
}
.search-tabs {
  background: white;
  width: 100%;
  height: 38px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
  a{
    border-bottom: 2px solid transparent;
    height: 38px;
    line-height: 38px;
    &.router-link-active{
      font-weight: bold;
      color: #ff7e3e;
      border-bottom-color: #ff7e3e;
    }
  }
  
}
</style>