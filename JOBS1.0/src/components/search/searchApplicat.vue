<template>
  <!-- <div> -->
   <div class="list page subpage" >
     <app-scroll class="content">
      <a href="https://app.51job.com/?c=h5app7" class="download">
        查看详情申请记录，下载<span>51job APP</span>
      </a>
      <van-checkbox-group v-model="result" ref="checkboxGroup" v-if="list.length != 0">
        <div  class="list-item" v-for="item in list" :key="item.id">
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
                <button class="dele" @click="dele(item._id)">删除</button>
            </div>
        </div>
      </van-checkbox-group>

        <div class="none" v-else>
          <div class="work-like">
              <img src="../../../public/images/mine/bg_ask_none.png" alt="ask">
              <p>这俩个月暂无申请记录噢</p>
          </div>
        </div>
        
        <home-footer />
      </app-scroll>
        
    </div>
    
          
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      result: [],
      list: [],
    };
  },
  methods: {
    dele(id) {
      var ids = [id];
      var phone = this.$store.state.userinfo.phone;
      this.$axios.post("/api/app/apply_delete",{
        phone,
        ids
      }).then((res)=>{
        if(res.data.code==0){
          this.list.map((item,i)=>{
            if(item._id==id){
              this.list.splice(i,1);
            }
          })
          Toast.success({
            duration:1000,
            message: '删除成功'
          });
          // this.$axios.get("/api/app/apply_all?phone="+phone)
          // .then((res) => {
          //   this.list=(res.data.data);
          // });
        }else{
          Toast.fail({
            duration:1000,
            message: '删除失败'
          });
        }
      })
    }
  },
  created() {
    var phone = this.$store.state.userinfo.phone;
    this.$axios.get("/api/app/apply_all?phone="+phone)
    .then((res) => {
      this.list=(res.data.data);
    });
  }
}
</script>

<style lang="scss" scoped>
.content{
  width: 100%;
  height: 100%;
  position: absolute;
}
.list {
  width: 100%;
  background-color: #fafafa;
  top: 96px;
  .list-item {
    background-color: #fff;
    position: relative;
    margin: 0 16px;
    padding: 14px 0px;
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
      .dele {
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
.van-checkbox-group{
  min-height: 380px;
  background-color: #fff;
  margin-bottom: 10px;
}
.download{
  display: block;
  line-height: 30px;
  font-size: 12px;
  color: #999999;
  padding: 0 16px;
  background:  #fff6f1 url(../../../public/images/mine/arrow.png) no-repeat 95% center;
  background-size: 6px auto;
  span{
    color: #ff7e3e;
  }
}
.none{
  min-height: 380px;
    .work-like{
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fafafa;
        font-size: 14px;
        color: #999;
        padding: 30px 0;
        img{
            width: 138px;
        }
        p{
            margin: 15px 0 30px;
            max-width: 180px;
            text-align: center;
            line-height: 20px;
        }
    }
}
// .home-footer{
//   position: absolute;
//   bottom: 0;
//   left: 0;
// }
</style>