<template>
  <div id="modify">
    <div class="head">
      <p @click="back">
      <van-icon name="arrow-left" size="20px" />
      </p>
      我的简历
    </div>
    <div class="body">
      <div class="information">
        <p >
          <span><van-icon name="comment-o" size="20px"/> 基本信息</span>
          <span><van-icon name="arrow" /></span>
        </p>
        <div>
          <van-uploader v-model="fileList" multiple :max-count="1" />
          <div class="infos">
            <span>姓名:
              <input type="text" v-model="username">
            </span>
            <span>性别：
              <input type="text" v-model="sex">
            </span>
            <span>出生日期：
              <input type="text" v-model="birth">
            </span>
            
          </div>
        </div>
      </div>
      <div class="job">
        <p >
          <span><van-icon name="bulb-o" size="20px"/> 求职意向</span>
          <span><van-icon name="arrow" /></span>
        </p>
        <div>
            <span>期望职位：
              <input type="text" v-model="work_name">
            </span>
            <span>工作地点：
              <input type="text" v-model="place">
            </span>
            <span>期望薪资：
              <input type="text" v-model="month_pay">
            </span>
        </div>
      </div>
      <div class="education">
        <p >
          <span><van-icon name="todo-list-o" size="20px"/> 教育经历</span>
          <span><van-icon name="arrow" /></span>
        </p>
        <div>
          <span>学历：
            <input type="text" v-model="edu">
          </span>
          <span>工作年限：
            <input type="text" v-model="work_year">
          </span>
        </div>
      </div>
      <button @click="submit">提交</button>
    </div>
     <router-view/>
  </div>
</template>

<script>
import { Toast } from "vant";
import Vue from "vue";
Vue.use(Toast);
export default {
  data() {
    return {
      id:this.$route.params.id,
      fileList: [],
      sex: "",
      username: "",
      sex: "",
      birth: "",
      place: "",
      work_name: "",
      month_pay: "",
      edu: "",
      work_year: ""
    };
  },
  created() {
    if (this.id !== "new")
    // 信息回显
      this.$axios.get("/api/app/resume/Details?_id=" + this.id).then(res => {
           (this.sex = res.data.data.sex),
          (this.username = res.data.data.username),
          (this.sex = res.data.data.sex),
          (this.birth = res.data.data.birth ),
          (this.place = res.data.data.place),
          (this.work_name = res.data.data.work_name),
          (this.month_pay = res.data.data.month_pay),
          (this.edu = res.data.data.edu),
          (this.work_year = res.data.data.work_year),
           (this.fileList.push({"content":res.data.data.head_icon}))
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    submit() {
      var obj={
        sex:this.sex,
          username:this.username,
          sex:this.sex,
          birth:this.birth,
          place:this.place,
          work_name:this.work_name,
          month_pay:this.month_pay,
          edu:this.edu,
          work_year:this.work_year,
          head_icon:this.fileList[0]?this.fileList[0].content:"",
      }
      
      // 添加简历
      if (this.id == "new") {
        obj.id = new Date().getTime()
        obj.phone = this.$store.state.userinfo.phone;
        this.$axios.post("/api/app/resume/add", obj).then(res => {
          // console.log(res)
          if (res.data.code == 0) {
            console.log(res);
            Toast.success("添加简历成功");
          } else {
            Toast.fail("添加简历失败");
          }
          
        }).catch(
          err=>{
            if(err.request.status==413){
              Toast.fail("头像图片文件过大")
            }
          }
        );;
      } else {
        // 更新简历
        obj._id = this.id;
        obj.phone = localStorage.getItem("info");
        this.$axios.post("/api/app/resume/update", obj).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            Toast.success("更新简历成功");
          } else {
            Toast.fail("更新简历失败");
          }
        }).catch(
          err=>{
            if(err.request.status==413){
              Toast.fail("头像图片文件过大")
            }
          }
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#modify {
  position: absolute;
  z-index: 999;
  top: 0;
  background-color: #fafafa;
  width: 100%;
  // bottom: 0;
}
.head {
  position: relative;
  height: 105px;
  font-size: 16px;
  padding-top: 25px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: -70px;
  background: url(//img01.51jobcdn.com/im/m/bg_shead.png),
    -webkit-linear-gradient(left, #ff773e, #ffbb3e);
  > p {
    position: absolute;
    left: 20px;
  }
}
.body {
  > div {
    margin: 0 2%;
    position: relative;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 5px;
    height: 180px;
    width: 92%;
    padding: 10px 2%;
    > p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;
      padding-bottom: 10px;
      > span {
        display: block;
        .van-icon {
          top: 4px;
          color: #ff7e3e;
        }
      }
    }
    > div {
      padding: 20px 30px;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      > span {
        display: block;
        width: 100%;
        font-size: 14px;
        color: #444;
        margin: 10px 0;
      }
      .infos {
        position: absolute;
        right: -20%;
        top: 20px;
        width: 80%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        > span {
          display: block;
          width: 100%;
          font-size: 14px;
          color: #868686;
          margin: 5px 0;
        }
      }
    }
  }
}
div.education {
  height: 120px;
}
button {
  display: block;
  width: 90%;
  height: 40px;
  line-height: 40px;
  border: none;
  margin: 0 5% 0;
  color: #fff;
  letter-spacing: 3px;
  font-size: 16px;
  text-align: center;
  background: url(//img01.51jobcdn.com/im/m/bg_shead.png),
    -webkit-linear-gradient(left, #ff773e, #ffbb3e);
  border-radius: 8px;
}
input {
  border: none;
}
</style>