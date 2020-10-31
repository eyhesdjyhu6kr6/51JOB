<template>
  <div id="nearby" class="page subpage">
    
    <app-scroll class="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-skeleton title avatar :row="17" :loading="loading">
          <div>
            <div class="list" >
              <van-checkbox-group v-model="result" ref="checkboxGroup">
                <div  class="list-item" v-for="(item,index) in list" :key="index">
                  <div class="choice">
                    <van-checkbox :name="index" checked-color="#ff7e3e"></van-checkbox>
                  </div>
                    <router-link to="/position/123" class="tit" >
                        <p class="name"><span>{{item.work_name}}</span></p>
                        <p class="pay"><span>{{item.month_pay}}</span></p>
                    </router-link>
                    <div class="need">
                        <p>
                            <span>{{item.type}}</span>|
                            <span>{{item.edu}}</span>
                        </p>
                        <em class="area">{{item.area}}</em>
                    </div>
                    <div class="opa">
                        <p class="company">{{item.company}}</p>
                        <button class="apply" @click="apply(item._id,index)">申请</button>
                    </div>
                </div>
                </van-checkbox-group>
            </div>
            <div @click="change" class="change">
              <van-pagination
                v-model="currentPage"
                :total-items="125"
                :show-page-size="3"
                force-ellipses
              />
            </div>

          </div>
        </van-skeleton>
      </van-pull-refresh>
      <home-footer />
      
    </app-scroll>
    <!-- apply -->
    <div class="apply-tab">
      <van-checkbox v-model="checked" checked-color="#ff7e3e" @click="toggleAll">全选</van-checkbox>
      <van-button plain type="primary"  color="#ff7e3e" @click="addFavorite">收藏</van-button>
      <van-button type="warning" color="#ff7e3e"  class="apply" @click="apply">一键投递</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Pagination, Toast, Skeleton } from "vant";
Vue.use(Pagination);
Vue.use(Skeleton);
import axios from "axios";
export default {
  data() {
    return {
      currentPage: 1,
      result: [],
      list: [],
      isLoading: false,
      loading: false,
      checked: false,
    };
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      this.loading = true;
      this.$axios
        .get("/api/app/workall?page_index=" + this.currentPage)
        .then(res => {
          if (res.data.code == 0) {
            this.list = res.data.data;
            this.result = [];
            for (var i of this.list) {
              this.result.push(i._id);
            }
            Toast("刷新成功");
            this.isLoading = false;
            this.loading = false;
          } else {
            Toast("刷新失败");
          }
        });
    },
    // 申请职位
    apply(id) {
      if(this.result.length == 0){
        Toast.fail({
          duration:1000,
          message: '您还没有选择职位'
        });
        return;
      }
      // 先清空上次申请
      this.applys=[]
      // 判断是一条还是多条
      if (id) {
        this.applys.push(id)
      } else {
        for (var i of this.result) {
          this.applys.push(i);
        }
      }
      console.log(this.applys);
      // 申请
      this.$axios
          .post("/api/app/apply_add", {
            phone: this.$store.state.userinfo.phone,
            ids: this.applys
          })
          .then(res => {
             console.log(res);
            if(res.data.code == 0){
              Toast.success({
                duration:1000,
                message: '申请成功'
              });
            }else{
              Toast.fail({
                duration:1000,
                message: '申请失败'
              });
            }
          });
    },
    // 全选
    toggleAll() {
      console.log(this.list);
            if(this.checked){
                this.result = [];
                this.result = this.list.map((val,index)=>{
                    return index;
                })
            }
            else{
                this.result = [];
            }            
        },
    // 收藏
    addFavorite() {
      if(this.result.length == 0){
        Toast.fail({
          duration:1000,
          message: '您还没有选择职位'
        });
        return;
      }
      var phone = this.$store.state.userinfo.phone;
      var ids = [];
      this.result.map((item,ind)=>{
          return this.list.filter((val,index)=>{
              if(item == index) return ids.push(val._id);
          })
      })
      console.log(ids);
      this.$axios
          .post("/api/app/collect", {
            phone,
            ids
          })
          .then((res) => {
            if(res.data.code == 0){
              Toast.success({
                duration:1000,
                message: '收藏成功'
              });
            }else{
              Toast.fail({
                duration:1000,
                message: '收藏失败'
              });
            }
          });
    },
    // 换页
    change() {
      // console.log(this.currentPage);
      this.$axios
        .get("/api/app/workall?page_index=" + this.currentPage)
        .then(res => {
          this.list = res.data.data;
          this.result = [];
          // for (var i of this.list) {
          //   this.result.push(i._id);
          // }
        });
    }
  },
  created() {
    this.loading = true;
    this.$axios.get("/api/app/workall").then(res => {
      if(res.data.code==0){
        this.loading=false
        this.list = res.data.data;
        // for (var i of this.list) {
        //   this.result.push(i._id);
        // }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
#nearby {
  position: absolute;
  top: 96px;
  bottom: 0;
  left: 0;
}
.content{
  position: absolute;
  width: 100%;
  height: 100%;
  // margin-bottom: 60px;
}
.list {
  width: 100%;
  background-color: #fff;
  margin-bottom: 8px;
  .list-item {
    position: relative;
    margin: 0 16px 0 16px;
    padding: 14px 0 14px 40px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    line-height: 20px;
    .choice {
      position: absolute;
      left: 0;
      input {
        width: 20px;
        height: 20px;
      }
    }
    .tit {
      width: 100%;
      font-weight: 700;
      font-size: 16px;
      color: #222;
      display: flex;
      justify-content: space-between;
      .name {
        width: 60%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .pay {
        font-weight: 700;
        font-size: 14px;
        color: #ff7e3e;
        width: 26%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        span {
          float: right;
        }
      }
    }
    .need {
      width: 100%;
      margin: 8px 0;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #666;
      p > span {
        padding-right: 4px;
      }
    }
    .opa {
      width: 100%;
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      font-size: 14px;
      .company {
        color: #222;
      }
      .apply {
        width: 70px;
        height: 30px;
        border: none;
        color: #ff7e3e;
        font-size: 14px;
        font-weight: 700;
        background-color: #ffe8dc;
        border-radius: 30px;
      }
    }
  }
  .list-item:first-child {
    border-top: none;
  }
  .more {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48px;
    margin: 0 16px;
    border-top: 1px solid #f0f0f0;
    font-size: 14px;
    color: #666;
    span {
      font-size: 12px;
      padding-left: 5px;
      color: #ccc;
    }
  }
}
.van-button--primary {
  color: black;
  font-weight: bold;
  background-color: #fff;
  border: 1px solid #fff;
}
.van-pull-refresh{
  height: 100%;
}
.change{
  background-color: #fff;
  padding-bottom: 8px;
}
.home-footer{
  padding-bottom: 62px;
}
.apply-tab{
    position: absolute;
    z-index: 5;
    bottom: 0;
    height: 62px;
    width: 100%;
    background-color: #fff;
    padding-top: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0 -6px 16px rgba(0,0,0,.05);
    .van-checkbox{
        padding: 0 18px;
        font-size: 14px;
        color: #444;
    }
    .van-button{
        width: 25%;
        height: 40px;
        margin-right: 10px;
        border-radius: 6px;
    }
    .apply{
        width: 45%;
    }
}
</style>