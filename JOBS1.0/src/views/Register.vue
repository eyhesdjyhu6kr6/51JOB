<template>
  <div id="register" class="page subpage">
   <div class="title">
     <van-icon name="arrow-left" @click="back" />
     <p>51Job帐号注册</p>
     <router-link to="/login" class="login">登录</router-link>
   </div>

   <div class="head">
    <p v-for="item in meth" :key="item.id"
    @click="changeMeth(item)"
    :class="{active:id==item.id}">
      {{item.name}}注册
    </p>
   </div>


  <van-form @submit="onSubmit">
  
    <van-field
      v-model="username"
      :name="name"
      :label="name"
      :placeholder="'请输入'+name"
      :rules="[{ required: true, message: '请填写'+name }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="请输入密码，6-16位字母加数字"
      :rules="[{ required: true, message: '请填写密码' }]"
    />

    <div class="checkbox">
      <van-checkbox v-model="checked" checked-color="#ff7e3e">
        我已阅读并同意服务声明和隐私条款
      </van-checkbox>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>

   <div class="bottom">
     <p>关于我们-帮助-意见</p>
     <p>51Job.com(沪ICP备12015550)</p>
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
      id: "phone",
      name: "手机号",
      username: "",
      password: "",
      checked: false,
      meth: [{ name: "手机号", id: "phone" }, { name: "邮箱", id: "email" }]
    };
  },
  methods: {
    onSubmit(values) {
      // console.log(values);
      // 密码格式验证
      if (
        !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(values["密码"])
      ) {
        Toast.fail("密码格式错误");
        return;
      }
      if (!this.checked) {
        Toast.fail("你还未勾选服务声明");
        return;
      }
      // 手机号注册
      if (values["手机号"]) {
        if (!/^\d{11}$/.test(values["手机号"])) {
          Toast.fail("手机号必须是11位数字");
          return;
        }
        // 发送注册信息
        this.$axios
          .post("/api/app/register", {
            username: this.username,
            password: this.password
          })
          .then(res => {
            console.log(res)
            if (res.data.code == 0) {
              Toast.success("注册成功");
              this.$store.state.phonenumber=this.username;
              this.$store.state.pass=this.password
              this.$router.push({
                name: 1
              });
            } else {
              Toast.fail("注册失败");
            }
          });
      }
      // 邮箱注册
      if (values["邮箱"]) {
        if (
          !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g.test(
            values["邮箱"]
          )
        ) {
          Toast.fail("邮箱格式错误");
          return;
        }
        // 验证有无该邮箱
        this.$axios
          .post("/api/app/login", {
            username: this.username,
            password: this.password
          })
          .then(res => {
            // console.log(res);
            //如果该邮箱不存在
            if (res.data.code == -2) {
              // 储存注册账号
              this.$store.state.mailbox = values["邮箱"];
              this.$store.state.pass = this.password;
              console.log(this.$store.state.mailbox, this.$store.state.pass);
              this.$router.push({
                      name: 1
                    });
            }else {
              Toast.fail("该邮箱已存在");
            }
          });
      }
    },
    back() {
      this.$router.back();
    },
    changeMeth(item) {
      (this.username = ""),
        (this.password = ""),
        (this.checked = false),
        (this.id = item.id);
      this.name = item.name;
    }
  }
};
</script>

<style lang="scss" scoped>
#register {
  box-sizing: border-box;
  padding: 18px 15px 0;
  // margin-bottom: 52px;
  font-size: 14px;
  background-color: #eee;
}
.title {
  width: 100%;
  height: 33px;
  line-height: 33px;
  font-size: 18px;
  color: #3e3e3e;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .login{
    color: #ff7e3e;
  }
}
.head {
  height: 40px;
  margin: 16px;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  p {
    color: #fff;
    width: 50%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #c1c1c1;
  }
  .active {
    background-color: #ff7e3e;
  }
}
.van-button--info {
  color: #fff;
  background-color: #ff7e3e;
  border: 1px solid #ff7e3e;
}
.van-button--round {
  border-radius: 0;
}
.van-cell {
  margin: 0 16px;
  width: 91%;
  padding: 10px 10px;
}
.checkbox {
  margin: 16px;
}
.bottom {
  text-align: center;
  line-height: 24px;
  font-size: 14px;
  color: #777;
  font-size: 12px;
  margin-top: 55px;
  padding-top: 10px;
  border-top: 1px dashed #ccc;
}
</style>