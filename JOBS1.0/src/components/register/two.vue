<template>
  <div id="two">

    <div class="title">求职意向</div>
    <div class="box">
     <van-cell-group>
  <van-field v-model="location" label="地点" placeholder="请输入地点" required input-align="right"/>
  <van-field v-model="posit" label="职位" placeholder="请输入职位名称" required input-align="right"/>
  <van-field v-model="type" label="薪资类型" placeholder="请输入类型" input-align="right"/>
  <van-field v-model="expect" label="期望薪资" placeholder="请输入期望薪资" input-align="right"/>
  <van-field v-model="more" label="更多"  input-align="right"/>

    </van-cell-group> 
<button @click="nextStep">下一步</button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      location: "",
      posit:'',
      type:'',
      expect:'',
      more:'',

    };
  },
  methods:{
    nextStep(){
      if(this.$store.state.num<3)
      this.$store.state.num++;
      this.$store.state.infoResume.push(
        {work_name:this.posit})
        console.log(this.$store.state.infoResume);
      this.$router.push({
        name:this.$store.state.num
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.box{
  padding: 10px
}
.title{
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

button{
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