<template>
  <div id="resume">
     
    <!-- <div class="head">
      <p class="head-position"><span>深圳</span><van-icon name="arrow-down" size="14px" /></p>
      <a href="./home" class="head-img">
        <img src="//img01.51jobcdn.com/im/m/logo.png" alt="">
      </a>
      <a href="./mine" class="head-ico">
      </a>
    </div> -->

    <search-top />
    
      
    <div class="list" >
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="my" v-for="(item,index) in list" :key="item._id">
        <h3>我的简历{{index+1}}</h3>
        <div class="info">
          <p>
            <span>创建于{{item.updata_time}}</span> 
            <span></span>
          </p>
          <div>简历质量<van-rate  size="15px" readonly void-color="#ffd21e" /></div>
          <div class="open">
            <p>公开程度：对所有公开</p>
            <p>快速投递简历</p>
          </div>
        </div>

        <div class="operation">
          <p><van-icon name="replay" size="20px" color="#ff7e3e"/> 刷新</p>
          <p @click="goModify(item._id)"><van-icon name="edit" size="20px" color="#ff7e3e" /> 简历编辑</p>
          <p><van-icon name="eye-o" size="20px" color="#ff7e3e"/> 预览</p>
          <p><van-icon name="exchange" size="20px" color="#ff7e3e"/> 复制</p>
          <p><van-icon name="contact" size="20px" color="#ff7e3e"/> 公开程度</p>
          <p @click="dele(index+1,item._id)"><van-icon name="delete" size="20px" color="#ff7e3e"/> 删除</p>
        </div>
      
      </div>
      <div class="establish" @click="box">+创建简历</div>
      </van-pull-refresh>
    </div>
    
 
     
    <router-view/>
   
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog, Toast } from "vant";
Vue.use(Dialog);
Vue.use(Toast);
import axios from "axios";
import threeVue from "../components/register/three.vue";
export default {
  data() {
    return {
      list: [],
      info: this.$store.state.userinfo.user,
      isLoading: false
    };
  },
  created() {
    this.$axios.get("/api/app/resume/all?username=" + this.info).then(res => {
      console.log(res);
      this.list = res.data.data;
    });
  },
  methods: {
    box() {
      Dialog.confirm({
        message: "是否需要创建一份新简历"
      })
        .then(() => {
          this.$router.push({
            name: "modify",
            params: { id: "new" }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 删除简历
    dele(i, id) {
      Dialog.confirm({
        message: "确定删除我的简历" + i + "么？"
      })
        .then(() => {
          this.$axios.get("/api/app/resume/delete?_id=" + id).then(res => {
            if (res.data.code == 0) {
              Toast.success("删除简历成功");
              location.reload();
            } else {
              Toast.fail("删除简历失败");
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 编辑简历
    goModify(id) {
      this.$router.push({
        name: "modify",
        params: { id }
      });
    },
    // 下拉刷新
    onRefresh() {
      this.$axios.get("/api/app/resume/all?username=" + this.info).then(res => {
        if (res.data.code == 0) {
          this.list = res.data.data;
          Toast("刷新成功");
          this.isLoading = false;
        } else {
          Toast("刷新失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#resume {
  margin-bottom: 60px;
  font-size: 14px;
  background-color: #fff;
}

.list {
  position: absolute;
  top: 96px;
  bottom: 60px;
  width: 100%;
  // overflow: scroll;
}
.my {
  line-height: 25px;
  padding: 10px 0;
  box-shadow: 0 2px 1px 1px #dedede;
  background-color: #fff;
  h3 {
    padding: 0 20px;
  }
  .info {
    font-size: 12px;
    color: gray;
    padding: 0 20px;
    .van-rate {
      position: relative;
      top: 2px;
      left: 5px;
    }
  }
  .open {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .operation {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    p {
      width: 31%;
      text-align: center;
      height: 46px;
      line-height: 46px;
      font-size: 13px;
      color: #868686;
      text-align: center;
      margin: 1%;
      background-color: #fff8ed;
    }
  }
}
.establish {
  height: 50px;
  line-height: 50px;
  color: #4c99ff;
  text-align: center;
  margin-top: 8px;
  background-color: #fff;
  box-shadow: 0 2px 1px 1px #dedede;
}

.van-icon {
  top: 5px;
}
</style>