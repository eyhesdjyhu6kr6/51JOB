<template>
  <div id="search-job">
    <form>
    <div class="head">
      <van-search
      v-model="value"
      placeholder="请输入职位名"
      input-align="center"
      class="input"/>
      <p class="icn"><van-icon name="underway-o" color="gray" size="20" /></p>
    </div>

    <div class="check-box">
      <p>行业</p>
        <select  v-model="industry">
        <option v-for="i in checkBox[0]" :key="i" :value="i">{{i}}</option>
        </select>
      <van-icon name="arrow" class="arrow" color=" #999"/>
    </div>
    <div class="check-box">
      <p>薪资</p>
        <select  v-model="salary">
        <option v-for="i in checkBox[1]" :key="i" :value="i">{{i}}</option>
        </select>
      <van-icon name="arrow" class="arrow" color=" #999"/>
    </div>
    <div class="check-box">
      <p>工作年限</p>
        <select  v-model="years">
        <option v-for="i in checkBox[2]" :key="i" :value="i">{{i}}</option>
        </select>
      <van-icon name="arrow" class="arrow" color=" #999"/>
    </div>
    <div class="check-box">
      <p>学历</p>
        <select  v-model="education">
        <option v-for="i in checkBox[3]" :key="i" :value="i">{{i}}</option>
        </select>
      <van-icon name="arrow" class="arrow" color=" #999"/>
    </div>
    

    <div class="btn">
      <div @click="seek">搜索</div>
    </div>
    </form>
   
   <div class="search-records">
     <div class="stit">
       <p class="title">搜索记录</p>
       <p class="empty" @click="empty">清空</p>
     </div>
     <div class="shis">
       {{no}}
       <p v-for="(item,i) in seek_list" :key="i">
         {{item}}
       </p>
     </div>
   </div>

   <h3> </h3>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from "axios";
export default {
  data() {
    return {
      value: "",
      no:
        "暂无搜索记录",
      seek_list: [],
      industry: "不限",
      salary: "不限",
      years: "不限",
      education: "不限",
      checkBox: [
        ["不限","计算机", "金融","员工培训", "广告", "服务业", "教育培训"],
        [
          "不限",
          "2千以下",
          "3-4.5千",
          "4.5-6千",
          "6-8千",
          "0.8-1万",
          "1-1.5万",
          "1.5-2万",
          "2-3万",
          "3-4万",
          "4-5万",
          "5万以上"
        ],
        [
          "不限",
          "在校生/应届生",
          "1-3年",
          "3-5年",
          "5-10年",
          "10年以上",
          "无需经验"
        ],

        [
          "不限",
          "初中及以下",
          "高中/中技/中专",
          "大专",
          "本科",
          "硕士",
          "博士",
          "无学历要求"
        ]
      ],
      
    };
  },

  methods: {
    seek() {
      if (this.value == "") return;
      this.seek_list.push(this.value+"，"+this.industry);
      if (this.seek_list.length !== 0) {
        this.no = "";
      }
      this.$router.push({
        name: "result",
        params: {
          id: this.value,
          city:this.city,
          education:this.education,
          years:this.years,
          salary:this.salary,
          industry:this.industry
        }
      });
      this.value = "";
    },
    empty() {
      (this.seek_list = []),
        (this.no =
          "暂无搜索记录");
    }
  },
  computed:{
      ...mapState({
        city: (state)=>state.city,
      })
  }
};
</script>

<style  lang="scss" scoped>
#search-job {
  margin-bottom: 52px;
}
form {
  background: white;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.head {
  display: flex;
  justify-content: space-around;
  align-items: center;
  > div {
    width: 300px;
  }
}
.icn {
  position: relative;
  right: 20px;
}
.btn {
  width: 100%;
  div {
    display: block;
    width: 80%;
    height: 40px;
    margin: 0 auto;
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    letter-spacing: 3px;
    background-color: #ff7e3e;
    border: 1px solid #ff7e3e;
    border-radius: 4px;
  }
}
.check-box {
  position: relative;
  height: 75px;
  padding: 5px 30px 2px 16px;
  background-color: #fff;
  ::after {
    position: absolute;
    height: 1px;
    content: "";
    left: 16px;
    right: 25px;
    bottom: 20px;
    background-color: #e5e5e5;
  }
  .arrow {
    position: absolute;
    right: 25px;
  }
  > p {
    line-height: 20px;
    font-size: 12px;
    color: #999;
  }
  select {
    border: none;
    width: 100%;
    outline: none;
    appearance: none;
    font-size: 18px;
    padding: 5px 0;
    option {
      font-size: 14px;
    }
  }
}
.search-records {
  width: 100%;
  min-height: 80px;
  background: white;
  margin-bottom: 10px;
  padding-bottom: 10px;
  .stit {
    line-height: 48px;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    .title {
      font-weight: 700;
    }
    .empty {
      color: #4a98f9;
    }
  }
  .shis {
    line-height: 25px;
    padding: 0 16px;
    font-size: 14px;
    color: #999;
    text-align: left;
  }
}
h3 {
  height: 1px;
}
</style>