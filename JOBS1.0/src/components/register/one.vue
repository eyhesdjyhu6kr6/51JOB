<template>
  <div id="one">
    <div class="title">基本信息</div>
    <div class="box">

    <van-cell-group>
  <van-field v-model="name" label="姓名" placeholder="请输入姓名" required input-align="right"/>
    </van-cell-group> 

    <div class="gender">
    <van-field  label="性别"  required input-align="right"/>
    <van-radio-group v-model="gender" direction="horizontal">
     <van-radio name="1" checked-color="#ff7e38">男</van-radio>
     <van-radio name="2" checked-color="#ff7e38">女</van-radio>
    </van-radio-group>
    </div>

     <van-cell-group>
  <van-field v-model="phone" label="手机号" placeholder="请输入手机号" required input-align="right"/>
  <van-field v-model="date" label="出生日期" placeholder="请输入日期" required input-align="right"/>
  <van-field v-model="email" label="邮箱" placeholder="请输入邮箱" input-align="right"/>
  <van-field v-model="place" label="居住地" placeholder="请输入居住地" input-align="right"/>
  <van-field v-model="year" label="工作年限" placeholder="请输入工作年限" input-align="right"/>
  <van-field v-model="income" label="目前月薪" placeholder="请输入月薪" input-align="right"/>
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
      name: "",
      gender: "",
      phone: this.$store.state.phonenumber,
      date: "",

      email: this.$store.state.mailbox,
      place: "",
      year: "",
      income: ""
    };
  },
  methods: {
    nextStep() {
      // 验证手机号格式
      if (!/^\d{11}$/.test(this.phone)) {
        Toast.fail("手机号必须是11位数字");
        return;
      }
      // 如果是邮箱注册
      if (this.$store.state.mailbox) {
        this.$axios
          .post("/api/app/register", {
            username: this.phone,
            password: this.$store.state.pass
          })
          .then(res => {
            if (res.data.code == 0) {
              Toast.success("手机号绑定成功");
              this.$store.state.phonenumber=this.phone;
              if (this.$store.state.num < 3) this.$store.state.num++;
              this.$store.state.infoResume.push(
                { name: this.name },
                { sex: this.gender },
                { birth: this.date },
                { phone: this.phone },
                { place: this.place },
                { email: this.email },
                
                { work_year: this.year },
                { month_pay: this.income }
              );
              // console.log(this.$store.state.infoResume);
              this.$router.push({
                name:this.$store.state.num
              })
            } else {
              Toast.fail("该手机已注册");
              return;
            }
          });
      } else {
        // 如果是手机注册，且需要绑定邮箱
        if (this.email) {
          if (
            !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g.test(
              this.email
            )
          ) {
            Toast.fail("邮箱格式错误");
            return;
          }
          // 判断是否有该邮箱
          this.$axios
            .post("/api/app/register", {
              username: this.email,
              password: this.$store.state.pass
            })
            .then(res => {
              if (res.data.code == 0) {
                Toast.success("邮箱绑定成功");
                if (this.$store.state.num < 3) this.$store.state.num++;
                this.$store.state.infoResume.push(
                { username: this.name },
                { sex: this.gender==1?'男':'女' },
                { birth: this.date },
                { phone: this.phone },
                { place: this.place },
                { email: this.email },
                
                { work_year: this.year },
                { month_pay: this.income }
                );
                // console.log(this.$store.state.infoResume);
                this.$router.push({
                  name:this.$store.state.num
                })
              } else {
                Toast.fail("该邮箱已绑定");
                return;
              }
            });
        }else{
          Toast.fail("请输入邮箱号");
        }
      }
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
.gender {
  position: relative;
  .van-radio-group--horizontal {
    position: absolute;
    right: 0;
    top: 10px;
    font-size: 14px;
    .van-radio__icon{
      font-size: 12px;
    }
  }
  
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