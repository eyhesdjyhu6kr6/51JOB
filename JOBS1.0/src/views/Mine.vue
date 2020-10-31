 <template>
  <div id="mine" class="page">
      <div class="user">
        <div class="user_bg">
          <div class="head_icon">
            <img :src="imgurl" alt="head_icon">
          </div>
          <div class="user_info">
            <h3>{{name}}</h3>
            <!-- <p>湖南省 | 20岁 | 1年工作经验</p> -->
          </div>
        </div>
      </div>
      <div class="list">
        <div class="box">
          <router-link  to="/mine" class="box_item">
            <span class="iconfont iconlist--copy"></span>
            <h5>我的简历</h5>
            <i class="arrow"></i>
          </router-link>
        </div>
        <div class="box">
          <router-link v-for="item in list" :key="item.id" :to="item.path" class="box_item">
            <span :class="item.icon"></span>
            <h5>{{item.name}}</h5>
            <p v-show="item.count !== ''" class="txt">共<em class="c_orange">{{item.count}}</em>条</p>
            <i class="arrow"></i>
          </router-link>
        </div>
        <div class="box">
          <router-link  to="/mine/account" class="box_item">
            <span class="iconfont iconsuo"></span>
            <h5>我的账号</h5>
            <i class="arrow"></i>
          </router-link>
        </div>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 'apply', path: '/mine/apply', icon: 'iconfont icontoudi', name: '我的申请', count: 0, },
        { id: 'collect', path: '/mine/favorite', icon: 'iconfont iconshoucang', name: '我的收藏', count: 0, },
        { id: 'carefree', path: '/mine', icon: 'iconfont iconbook', name: '我的无忧学院', count: '', },
        { id: 'letter', path: '/mine', icon: 'iconfont iconxinfeng', name: '人事来信', count: 0, },
        { id: 'test', path: '/mine', icon: 'iconfont iconjianlibianwei', name: '简历检测', count: '', }
      ],
      // 收藏
      collect: [],
      // 申请
      apply: [],
      // 个人信息
      name: '',
      imgurl:'../../public/images/mine/woman.png',

    }
  },
  created() {
    var phone = this.$store.state.userinfo.phone;
    this.$axios.get('/api/app/collectAll?phone='+phone).then((res)=>{
      if(res.data.code == 0){
        this.collect = res.data.data;
        this.list.map((item)=>{
          if(item.id == 'collect'){
            item.count = this.collect.length;
          }
        })
        // console.log(res.data.data);
      }
    });
    this.$axios.get('/api/app/apply_all?phone='+phone).then((res)=>{
      if(res.data.code == 0){
        this.apply = res.data.data;
        this.list.map((item)=>{
          if(item.id == 'apply'){
            item.count = this.apply.length;
          }
        })
      }
    });
    this.$axios.get('/api/app/resume/all?username='+phone).then((res)=>{
      console.log(res);
      if(res.data.code == 0){
        var data = res.data.data[0];
        if(data.head_icon != '') this.imgurl = data.head_icon;
        this.name = data.username;
      }
    })
  },
}
</script>

<style lang="scss" scoped>
#mine{
  width: 100%;
  height: 100%;
}
.user{
  height: 160px;
  width: 100%;
  background: linear-gradient(to right,#ff773e,#ffbb3e);
  box-sizing: border-box;
  // padding-top: 30px;
  .user_bg{
    height: 130px;
    width: 100%;
    box-sizing: border-box;
    padding-top: 40px;
    // padding-bottom: 10px;
    background-image: url(../../public/images/mine/user_bg.png);
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .head_icon{
      width: 62px;
      height: 62px;
      border-radius: 50%;
      overflow: hidden;
      background: url(../../public/images/mine/header_bor.png) no-repeat #fff;
      background-size: 100% 100%;
      box-sizing: border-box;
      text-align: center;
      margin-bottom: 6px;
      img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
    .user_info{
      flex: 1;
      line-height: 22px;
      color: #fff;
      text-align: center;
      font-size: 12px;
    }
  }
}
.list{
  width: 100%;
  .box{
    width: 100%;
    margin-bottom: 6px;
    background-color: #fff;
    .box_item{
      height: 48px;
      display: flex;
      align-items: center;
      padding-left: 24px;
      position: relative;
      span{
        font-size: 24px;
        color: #FFA611;
      }
      h5{
        padding-left: 12px;
        font-size: 14px;
        color: #444;
      }
      .arrow{
        position: absolute;
        width: 8px;
        height: 14px;
        right: 22px;
        background: url(../../public/images/mine/arrow_gray.png) no-repeat center center;
        background-size: cover;
      }
      .txt{
        position: absolute;
        right: 42px;
        color: #444;
        font-size: 14px;
      }
    }
  }
  .box:first-of-type{
    margin-top: 6px;
  }
}


/* 
ts\webpack、什么是工程化\node.js 自己写后台
8~9背面试题、敲、总结整理面试题
认真听课
写项目、写到自己满意、有始有终、完整
技术、表达
*/
</style>


