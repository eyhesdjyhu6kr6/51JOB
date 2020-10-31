<template>
  <div class="account subpage">
    <header class="header">
      <span class="iconfont iconjiantou-copy-copy" @click="back"></span>
      <h3>我的账号</h3>
    </header>

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        :placeholder="username"
        input-align='right'
        readonly
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="修改"
        input-align='right'
      />
      <van-field
        v-model="phone"
        name="手机号"
        label="手机号"
        placeholder=""
        :rules="[{ required: true, message: '请填写手机号' }]"
        input-align='right'
        readonly
      />
      <van-field
        v-model="email"
        name="邮箱"
        label="邮箱"
        placeholder="1728461818@qq.com"
        :rules="[{ required: true, message: '请填写邮箱' }]"
        input-align='right'
        readonly
      />
      <router-link to="/mine" class="logout">
        <label for="">账号注销</label>
        <span class="iconfont iconjiantou-copy"></span>
      </router-link>
      <div style="margin: 8px;" class="btn">
          <van-button  block type="info" @click="save">
            保存
          </van-button>
          <van-button  block type="info" native-type="submit">
            退出
          </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      username: this.$store.state.userinfo.user,
      password: '',
      phone: this.$store.state.userinfo.phone,
      email: '1728461818@qq.com',
      pattern: /\d{6}/,
    };
  },
  methods: {
    onSubmit(values) {
      localStorage.clear();
      this.$store.dispatch('requestLogin', {});
      this.$store.commit('setLogin', false);      
      this.$router.push({name:'home',path:'/home'});
    },
    back(){
      this.$router.back();
    },
    // 保存密码
    save(){
      
    }
  }
};
</script>

<style lang="scss" scoped>
.account{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
}
.header{
  position: relative;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 16px;
  background-color: #fff;
  color: #444;
  box-shadow: 0 0 3px 2px #ccc;
  z-index: 10;
  span{
    position: absolute;
    top: 0;
    left: 0;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ccc;
    font-size: 18px;
  }
}
.logout{
  position: relative;
  display: block;
  background-color: #fff;
  label{
    display: flex;
    box-sizing: border-box;
    width: 60%;
    padding: 0px 26px;
    color: #323233;
    font-size: 14px;
    line-height: 48px;
  }
  span{
    position: absolute;
    top: 50%;
    right: 6%;
    transform: translateY(-50%);
    color: #ccc;
  }
}
.van-cell{
  height: 48px;
  line-height: 30px;
  padding: 10px 26px;
}
.van-cell::after{
  border-bottom: 2px solid #ccc;
}
.van-button--info {
  margin-top: 47px;
  color: #fff;
  background-color:#ff7e3e;
  border: 1px solid #ff7e3e;
  border-radius: 8px;
}
.btn{
  display: flex;
  justify-content: space-around;
  .van-button{
    width: 40%;
  }
}
input:-internal-autofill-selected {
   
    background-color: #fff !important;
    
}
// .submit{
//   width: ;
// }
</style>