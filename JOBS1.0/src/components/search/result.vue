<template>
  <div id="result">
      
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-skeleton title avatar :row="17" :loading="loading">
        <div>
    <div class="list" >
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div  class="list-item" v-for="item in list" :key="item._id">
          <div class="choice">
            <van-checkbox :name="item._id" checked-color="#ff7e3e"></van-checkbox>
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
                <button class="apply" @click="apply(item._id)">申请</button>
            </div>
        </div>
        </van-checkbox-group>
    </div>
      <div @click="change">
        <van-pagination
          v-model="currentPage"
          :total-items="125"
          :show-page-size="3"
          force-ellipses
        />
      </div>

    <div class="bottom">
        
        <p><van-button type="primary" @click="checkAll">反选</van-button></p>
        <p @click="colle"><van-icon name="star-o" /> 收藏</p>
        <p  @click="apply(0)">申请职位</p>
    </div>
    </div>
    </van-skeleton>
    </van-pull-refresh>
    
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
      applys: [],
      loading: false,

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
      // 先清空上次申请
      this.applys=[]
      // 判断是一条还是多条
      if (id) {
        this.applys.push(id)
      } else {
        // console.log(this.result)
        for (var i of this.result) {
          this.applys.push(i);
        }
      }
      console.log(this.applys)
      // 申请
      this.$axios
          .post("/api/app/apply_add", {
            phone: localStorage.getItem("info"),
            ids: this.applys
          })
          .then(res => {
            // console.log(res);
          });
    },
    // 反选
    checkAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
    // 收藏
    colle() {
      this.applys=[]
      for (var i of this.result) {
          this.applys.push(i);
        }
      this.$axios
          .post("/api/app/collect", {
            phone: localStorage.getItem("info"),
            ids: this.applys
          })
          .then(res => {
            // console.log(res);
          });
    },
    // 换页
    change() {
      this.$axios.post("/api/app/search", {
        work_name: this.$route.params.id,
        area: this.$route.params.city,
        trade: this.$route.params.industry,
        month_pay: this.$route.params.salary,
        work_year: this.$route.params.years,
        edu: this.$route.params.education,
        page_index:this.currentPage
      }).then(res => {
        // console.log(res)
        if(res.data.code==0){
          this.list=(res.data.data)
          this.result=[]
        for (var i of this.list) {
        this.result.push(i._id);
        }
      }
      });
    }
  },
  created() {
    this.loading = true;
    this.$axios.post("/api/app/search", {
        work_name: this.$route.params.id,
        area: this.$route.params.city,
        trade: this.$route.params.industry,
        month_pay: this.$route.params.salary,
        work_year: this.$route.params.years,
        edu: this.$route.params.education
        // page_index:1
      }).then(res => {
        // console.log(res)
        if(res.data.code==0){
          this.loading=false
          this.list=(res.data.data)
        for (var i of this.list) {
        this.result.push(i._id);
        
        }
      }
      });
  }
};
  
 
 

</script>

<style lang="scss" scoped>
#result {
  margin-bottom: 60px;
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
.bottom {
  position: fixed;
  bottom: 0;
  z-index: 3;
  width: 100%;
  max-width: 500px;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  background-color: #ffffff;
  border-top: 1px solid #e2e2e2;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>