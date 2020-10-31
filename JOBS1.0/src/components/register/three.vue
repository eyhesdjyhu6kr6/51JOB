<template>
  <div id="three">

    <div class="title">最高教育经历</div>
    <div class="box">
     <van-cell-group>
  <van-field v-model="school" label="学校" placeholder="请输入学校" required input-align="right"/>
  <van-field v-model="time" label="入学时间" placeholder="请输入入学时间" required input-align="right"/>
  <van-field v-model="leave" label="毕业时间" placeholder="请输入毕业时间" required input-align="right"/>
  <van-field v-model="edu" label="学历" placeholder="请输入学历" input-align="right"/>
  <van-field v-model="major" label="专业" placeholder="请输入专业" input-align="right"/>
    </van-cell-group> 
<button @click="nextStep">下一步</button>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
import Vue from "vue";
Vue.use(Toast);
export default {
  data() {
    return {
      school: "",
      time: "",
      leave: "",
      edu: "",
      major: ""
    };
  },
  methods: {
    nextStep() {
      if (this.$store.state.num < 3) this.$store.state.num++;
      this.$store.state.infoResume.push({ edu: this.edu });
      // 把数组转换成对象
      var list = this.$store.state.infoResume;
      var obj = {};
      for (var i of list) {
        for (var j in i) {
          obj[j] = i[j];
        }
      }
      // console.log(obj);
      // 发送简历信息
      this.$axios.post("/api/app/resume/add", obj).then(res => {
        console.log(res.data);
      });
      this.$axios
        .post("/api/app/login", {
          username: this.$store.state.phonenumber,
          password: this.$store.state.pass
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            // 把token存到本地
            localStorage.setItem("token", res.data.token);
            Toast.success("注册成功");
            this.$router.push({
              name: "login"
            });
          } else {
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  padding: 10px;
}
.title {
  position: relative;
  height: 48px;
  line-height: 48px;
  font-size: 15px;
  font-weight: bold;
  color: #ff7e38;
  padding: 0 26px 0 21px;
  background-color: #fff;
}
.title::before {
  content: "\00a0";
  position: absolute;
  top: 50%;
  left: 13px;
  height: 14px;
  width: 3px;
  vertical-align: text-bottom;
  margin-top: -7px;
  background-color: #ff7e38;
}

button {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  letter-spacing: 3px;
  background-color: #ff7e3e;
  border: 1px solid #ff7e3e;
  -webkit-appearance: none;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -o-border-radius: 5px;
  -ms-border-radius: 5px;
  border-radius: 5px;
  margin-top: 20px;
}
</style>